"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { AlertModal } from "@/components/common/AlertModal";
import { Button } from "@/components/common/Button";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { Header } from "@/components/common/Header";
import { InfoBanner } from "@/components/common/InfoBanner";
import { Input } from "@/components/common/Input";
import { ErrorScreen } from "@/components/common/ErrorScreen";
import { InputLayout } from "@/components/common/InputLayout";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { PlaceMarker } from "@/components/common/PlaceMarker";
import { PlaceSearchTrigger } from "@/components/common/PlaceSearchTrigger";
import { TabMenu } from "@/components/common/TabMenu";
import { Toast } from "@/components/common/Toast";
import { ToggleField } from "@/components/common/ToggleField";
import { PlaceSearchModal } from "@/components/meeting/create/PlaceSearchModal";
import { TimeSelectModal } from "@/components/meeting/create/TimeSelectModal";
import { RouteSelectTrigger } from "@/components/meeting/departure/RouteSelectTrigger";
import { getRouteSummary } from "@/components/meeting/departure/TravelRouteSegmentList";
import { TravelRouteList } from "@/components/meeting/departure/TravelRouteList";
import { TravelRouteSummaryCard } from "@/components/meeting/departure/TravelRouteSummaryCard";
import { MeetingMap } from "@/components/meeting/progress/MeetingMap";
import { ParticipantAvatar } from "@/components/meeting/shared/ParticipantAvatar";
import {
  useMemberDepartureQuery,
  useUpdateMemberDepartureMutation,
} from "@/hooks/meeting/departure/useMemberDeparture";
import { useSearchMeetingRoutesMutation } from "@/hooks/meeting/departure/useMeetingRoutes";
import {
  useMeetingDetailQuery,
  useUpdateMeetingMutation,
} from "@/hooks/meeting/detail/useMeetingDetail";
import { useMeetingsQuery } from "@/hooks/meeting/shared/useMeetings";
import { useToast } from "@/hooks/common/useToast";
import { useAuthStore } from "@/stores/useAuthStore";
import type {
  DepartureOrigin,
  MeetingDepartureRouteSegment,
  MeetingDetailResponse,
  MeetingMemberDepartureResponse,
  MeetingMemberDepartureUpdateRequest,
  MeetingRoute,
  MeetingRouteStep,
  MeetingUpdateRequest,
} from "@/types/meeting";
import type { SelectedPlace } from "@/types/place";
import { formatDateTimeForApi, formatMeetingDateTime } from "@/utils/date";
import { checkIsHost } from "@/utils/participant";
import { cn } from "@/lib/utils";

const INFO_SEEN_KEY_PREFIX = "meeting-settings-info-seen:";

const extractLineFromContent = (
  content: string | null,
  stationStart: string | undefined
): string | null => {
  if (!content || !stationStart) return null;
  const escaped = stationStart.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = content.match(new RegExp(`^${escaped}\\s+(.+?)\\s*승차$`));
  return match?.[1]?.trim() || null;
};

const toMeetingRouteStep = (
  segment: MeetingDepartureRouteSegment
): MeetingRouteStep => ({
  type: segment.transportType,
  time: segment.estimatedTime * 60,
  distance: 0,
  description: null,
  line: extractLineFromContent(segment.content, segment.station?.start),
  color: null,
  station: segment.station,
  stations: null,
});

const toMeetingRoute = (
  departure: MeetingMemberDepartureResponse
): MeetingRoute => ({
  totalTime: departure.totalEstimatedTime * 60,
  fare: 0,
  transferCount: 0,
  pathType: null,
  steps: departure.routes.map(toMeetingRouteStep),
});

type SettingsTab = "left" | "right";

const MeetingSettingsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { meetingId } = useParams<{ meetingId: string }>();
  const numericMeetingId = Number(meetingId);
  const currentUserId = useAuthStore((state) => state.user?.id);

  const [selectedTab, setSelectedTab] = useState<SettingsTab>("left");

  const { data: meeting, isLoading } = useMeetingDetailQuery(numericMeetingId);
  const { data: allMeetings = [] } = useMeetingsQuery();
  const { data: myDeparture, refetch: refetchDeparture } =
    useMemberDepartureQuery(numericMeetingId);

  const updateMeetingMutation = useUpdateMeetingMutation(numericMeetingId);
  const updateDepartureMutation =
    useUpdateMemberDepartureMutation(numericMeetingId);
  const searchRoutesMutation = useSearchMeetingRoutesMutation(numericMeetingId);

  // 약속정보 탭
  const [hasSyncedMemo, setHasSyncedMemo] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [place, setPlace] = useState<SelectedPlace | null>(null);
  const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);
  const [memo, setMemo] = useState("");
  const [hasUnseenInfoChange, setHasUnseenInfoChange] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isMeetingSaveConfirmOpen, setIsMeetingSaveConfirmOpen] =
    useState(false);
  const [isArrivalNoticeOpen, setIsArrivalNoticeOpen] = useState(false);
  const [isInfoChangeNoticeOpen, setIsInfoChangeNoticeOpen] = useState(false);
  const { toastMessage, showToast } = useToast();

  // 내 경로 탭
  const [isOriginSearchOpen, setIsOriginSearchOpen] = useState(false);
  const [origin, setOrigin] = useState<DepartureOrigin | null>(null);
  const [isRouteListOpen, setIsRouteListOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<MeetingRoute | null>(null);
  const [notifyLocation, setNotifyLocation] = useState(false);
  const [notifyFriendArrival, setNotifyFriendArrival] = useState(false);
  const [notifySpeechBubble, setNotifySpeechBubble] = useState(false);

  const applyDeparture = useCallback(
    (departure: MeetingMemberDepartureResponse) => {
      setOrigin({
        placeName: departure.departure.placeName,
        addressName: departure.departure.placeName,
        latitude: departure.departure.latitude,
        longitude: departure.departure.longitude,
      });
      setSelectedRoute(null);
      setNotifyLocation(departure.notificationSettings.locationPermission);
      setNotifyFriendArrival(departure.notificationSettings.friendArrival);
      setNotifySpeechBubble(departure.notificationSettings.chatBubble);
    },
    []
  );

  useEffect(() => {
    if (hasSyncedMemo || !meeting) return;
    setMemo(meeting.memo ?? "");
    setHasSyncedMemo(true);
  }, [hasSyncedMemo, meeting]);

  useEffect(() => {
    refetchDeparture().then((result) => {
      if (result.data) applyDeparture(result.data);
    });
  }, [refetchDeparture, applyDeparture]);

  useEffect(() => {
    if (!meeting) return;
    const stored = localStorage.getItem(
      `${INFO_SEEN_KEY_PREFIX}${numericMeetingId}`
    );
    if (!stored) return;
    try {
      const seen = JSON.parse(stored) as {
        dateTime: string;
        place: string;
        memo: string | null;
      };
      const changed =
        seen.dateTime !== meeting.dateTime ||
        seen.place !== meeting.place ||
        seen.memo !== meeting.memo;
      setHasUnseenInfoChange(changed);

      if (seen.place !== meeting.place) setIsInfoChangeNoticeOpen(true);
    } catch {
      setHasUnseenInfoChange(false);
    }
  }, [meeting, numericMeetingId, currentUserId]);

  useEffect(() => {
    if (!meeting || selectedTab !== "left") return;
    localStorage.setItem(
      `${INFO_SEEN_KEY_PREFIX}${numericMeetingId}`,
      JSON.stringify({
        dateTime: meeting.dateTime,
        place: meeting.place,
        memo: meeting.memo,
      })
    );
    setHasUnseenInfoChange(false);
  }, [meeting, numericMeetingId, selectedTab]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!meeting) {
    return <ErrorScreen title={"약속 정보를\n찾을 수 없어요"} />;
  }

  const hostId = meeting.participants[0]?.id;
  const isHost = checkIsHost(hostId, currentUserId);

  const displayDateTime = selectedDateTime ?? new Date(meeting.dateTime);

  const { timeFormatted } = formatMeetingDateTime(
    displayDateTime.toISOString()
  );

  const sortedParticipants = [...meeting.participants].sort((a, b) => {
    if (a.id === currentUserId) return -1;
    if (b.id === currentUserId) return 1;
    return 0;
  });

  const otherMeetings = allMeetings.filter(
    (item) => item.meetingId !== numericMeetingId
  );

  const displayPlace: SelectedPlace = place ?? {
    placeName: meeting.place,
    addressName: meeting.place,
    latitude: meeting.latitude,
    longitude: meeting.longitude,
  };

  const isDateTimeChanged =
    selectedDateTime !== null &&
    selectedDateTime.getTime() !== new Date(meeting.dateTime).getTime();

  const isPlaceChanged =
    place !== null &&
    (place.placeName !== meeting.place ||
      place.latitude !== meeting.latitude ||
      place.longitude !== meeting.longitude);
  const isMemoChanged = hasSyncedMemo && memo !== (meeting.memo ?? "");
  const isMeetingFieldsChanged =
    isDateTimeChanged || isPlaceChanged || isMemoChanged;
  const isMeetingSaving = updateMeetingMutation.isPending;

  const originName = origin?.placeName ?? "";
  const destinationName = meeting.place;
  const persistedRoute = myDeparture ? toMeetingRoute(myDeparture) : null;

  const isOriginChanged =
    origin !== null &&
    Boolean(myDeparture) &&
    (origin.placeName !== myDeparture?.departure.placeName ||
      origin.latitude !== myDeparture?.departure.latitude ||
      origin.longitude !== myDeparture?.departure.longitude);
  const displayedRoute =
    selectedRoute ?? (isOriginChanged ? null : persistedRoute);

  const isRouteChanged = selectedRoute !== null;
  const isNotificationChanged =
    Boolean(myDeparture) &&
    (notifyLocation !== myDeparture?.notificationSettings.locationPermission ||
      notifyFriendArrival !== myDeparture?.notificationSettings.friendArrival ||
      notifySpeechBubble !== myDeparture?.notificationSettings.chatBubble);
  const isDepartureFieldsChanged = isRouteChanged || isNotificationChanged;
  const isDepartureSaving = updateDepartureMutation.isPending;

  const handleTimeConfirm = (hour: number, minute: number) => {
    const baseDate = new Date(meeting.dateTime);
    baseDate.setHours(hour, minute, 0, 0);
    setSelectedDateTime(baseDate);
    setIsTimeModalOpen(false);
  };

  const handleSelectOrigin = (selected: DepartureOrigin) => {
    setOrigin(selected);
    setSelectedRoute(null);
    setIsOriginSearchOpen(false);
    searchRoutesMutation.mutate({
      start: { latitude: selected.latitude, longitude: selected.longitude },
    });
  };

  const handleRouteFieldClick = () => {
    if (!origin) return;
    if (!searchRoutesMutation.data && !searchRoutesMutation.isPending) {
      searchRoutesMutation.mutate({
        start: { latitude: origin.latitude, longitude: origin.longitude },
      });
    }
    setIsRouteListOpen((prev) => !prev);
  };

  const handleSelectRoute = (route: MeetingRoute) => {
    setSelectedRoute(route);
    setIsRouteListOpen(false);
  };

  const handleSaveMeetingInfoPress = () => {
    if (!isHost || !isMeetingFieldsChanged) return;
    if (isPlaceChanged) {
      setIsMeetingSaveConfirmOpen(true);
      return;
    }
    handleSaveMeetingInfo();
  };

  const handleSaveMeetingInfo = async () => {
    setIsMeetingSaveConfirmOpen(false);
    if (!isHost || !isMeetingFieldsChanged) return;

    try {
      const request: MeetingUpdateRequest = {};
      if (isDateTimeChanged) {
        request.dateTime = formatDateTimeForApi(displayDateTime);
      }
      if (isPlaceChanged) {
        request.destination = displayPlace.placeName;
        request.latitude = displayPlace.latitude;
        request.longitude = displayPlace.longitude;
      }
      if (isMemoChanged) request.memo = memo;

      await updateMeetingMutation.mutateAsync(request);

      queryClient.setQueryData<MeetingDetailResponse>(
        meetingKeys.fullDetail(numericMeetingId),
        (old) => {
          if (!old) return old;
          const next: MeetingDetailResponse = { ...old };
          if (isDateTimeChanged) {
            next.dateTime = formatDateTimeForApi(displayDateTime);
          }
          if (isPlaceChanged) {
            next.place = displayPlace.placeName;
            next.latitude = displayPlace.latitude;
            next.longitude = displayPlace.longitude;
          }
          if (isMemoChanged) next.memo = memo;
          return next;
        }
      );

      showToast("수정이 완료되었습니다");
    } catch {
      setActionError("약속 정보 저장에 실패했어요. 다시 시도해주세요.");
    }
  };

  const handleSaveDeparture = async () => {
    if (!isDepartureFieldsChanged) return;
    if (isRouteChanged && !origin) return;

    try {
      const request: MeetingMemberDepartureUpdateRequest = {};
      if (isRouteChanged) {
        request.departure = {
          placeName: origin!.placeName,
          latitude: origin!.latitude,
          longitude: origin!.longitude,
        };
        request.route = {
          totalTime: selectedRoute!.totalTime,
          steps: selectedRoute!.steps,
        };
      }
      if (isNotificationChanged) {
        request.notificationSettings = {
          locationPermission: notifyLocation,
          friendArrival: notifyFriendArrival,
          chatBubble: notifySpeechBubble,
        };
      }

      await updateDepartureMutation.mutateAsync(request);
      const refreshed = await refetchDeparture();
      if (refreshed.data) applyDeparture(refreshed.data);

      if (isRouteChanged) {
        setIsArrivalNoticeOpen(true);
      } else {
        showToast("수정이 완료되었습니다");
      }
    } catch {
      setActionError("경로 정보 저장에 실패했어요. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-dvh bg-white pb-32">
      <div className="sticky top-0 z-10 bg-white">
        <Header title="약속 설정" onBack={() => router.back()} />

        <div className="px-4">
          <TabMenu
            leftLabel="약속정보"
            rightLabel="내 경로"
            selectedTab={selectedTab}
            onLeftClick={() => setSelectedTab("left")}
            onRightClick={() => setSelectedTab("right")}
            leftBadge={hasUnseenInfoChange}
          />
        </div>
      </div>

      {selectedTab === "left" ? (
        <main className="flex flex-col items-center gap-7 px-4 pt-6">
          <div className="flex w-full flex-col gap-6">
            {isHost ? (
              <InputLayout label="시간" hasValue>
                <button
                  type="button"
                  onClick={() => setIsTimeModalOpen(true)}
                  className="body3 text-primary w-full cursor-pointer text-left"
                >
                  {timeFormatted}
                </button>
              </InputLayout>
            ) : (
              <InputLayout label="시간">
                <span className="body3 text-primary">{timeFormatted}</span>
              </InputLayout>
            )}

            <div className="flex w-full flex-col gap-3">
              {isHost ? (
                <PlaceSearchTrigger
                  label="장소"
                  place={displayPlace}
                  placeholder="장소, 지역, 주소를 검색하세요"
                  onClick={() => setIsPlaceSearchOpen(true)}
                />
              ) : (
                <InputLayout label="장소">
                  <span className="body3 text-primary break-all">
                    {meeting.place}
                  </span>
                </InputLayout>
              )}
              <div className="rounded-16 h-32 w-full overflow-hidden">
                <MeetingMap
                  key={`${displayPlace.latitude}:${displayPlace.longitude}`}
                  center={{
                    lat: displayPlace.latitude,
                    lng: displayPlace.longitude,
                  }}
                  zoom={16}
                  className="size-full"
                >
                  <PlaceMarker
                    position={{
                      lat: displayPlace.latitude,
                      lng: displayPlace.longitude,
                    }}
                    placeName={displayPlace.placeName}
                  />
                </MeetingMap>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3">
              <h2 className="h4 text-primary font-bold">
                참여자 목록 ({meeting.currentParticipantCount}/
                {meeting.capacity})
              </h2>
              <div className="flex flex-wrap gap-4">
                {sortedParticipants.map((participant) => (
                  <ParticipantAvatar
                    key={participant.id}
                    participant={participant}
                    hostId={hostId}
                    myId={currentUserId}
                  />
                ))}
              </div>
            </div>

            {isHost ? (
              <Input
                label="메모"
                value={memo}
                onChange={(event) => setMemo(event.target.value)}
                placeholder="메모를 남겨보세요"
              />
            ) : (
              <InputLayout label="메모">
                <span
                  className={cn(
                    "body3",
                    meeting.memo ? "text-primary" : "text-disable"
                  )}
                >
                  {meeting.memo || "등록된 메모가 없어요"}
                </span>
              </InputLayout>
            )}
          </div>
        </main>
      ) : (
        <main className="flex flex-col pt-6">
          {!myDeparture ? (
            <p className="body3 text-disable px-4 py-10 text-center">
              출발 정보를 불러오고 있어요
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-6 px-4">
                <PlaceSearchTrigger
                  label="출발지 재설정"
                  place={origin}
                  placeholder="출발지를 선택해주세요"
                  disabled={isDepartureSaving}
                  onClick={() => setIsOriginSearchOpen(true)}
                />

                <RouteSelectTrigger
                  label="이동 경로"
                  value={
                    displayedRoute
                      ? getRouteSummary(
                          displayedRoute.steps,
                          originName,
                          destinationName
                        )
                      : null
                  }
                  placeholder={
                    origin
                      ? "이동 경로를 선택해주세요"
                      : "출발지를 먼저 선택해주세요"
                  }
                  disabled={!origin || isDepartureSaving}
                  onClick={handleRouteFieldClick}
                />

                {isRouteListOpen &&
                  (searchRoutesMutation.isPending ? (
                    <p className="body6 text-disable px-2 py-6 text-center">
                      이동 경로를 조회하고 있어요
                    </p>
                  ) : searchRoutesMutation.isError ? (
                    <p className="body6 text-disable px-2 py-6 text-center">
                      이동 경로를 불러오지 못했어요
                    </p>
                  ) : (
                    <TravelRouteList
                      routes={searchRoutesMutation.data ?? []}
                      selectedRoute={selectedRoute}
                      originName={originName}
                      destinationName={destinationName}
                      onSelect={handleSelectRoute}
                    />
                  ))}
              </div>

              <div className="bg-divider-2 my-6 h-2 w-full" />

              <div className="flex flex-col gap-5 px-4">
                <h3 className="h4 text-primary font-bold">알림 설정</h3>
                <InfoBanner text="출발하면 설정된 내 도착 상황을 친구들에게 공유할게요" />

                <div className="flex flex-col gap-6">
                  <ToggleField
                    label="위치권한"
                    checked={notifyLocation}
                    disabled={isDepartureSaving}
                    onCheckedChange={setNotifyLocation}
                  />
                  <ToggleField
                    label="친구도착"
                    checked={notifyFriendArrival}
                    disabled={isDepartureSaving}
                    onCheckedChange={setNotifyFriendArrival}
                  />
                  <ToggleField
                    label="말풍선"
                    checked={notifySpeechBubble}
                    disabled={isDepartureSaving}
                    onCheckedChange={setNotifySpeechBubble}
                  />
                </div>
              </div>

              {displayedRoute && (
                <>
                  <div className="bg-divider-2 my-6 h-2 w-full" />
                  <TravelRouteSummaryCard
                    route={displayedRoute}
                    originName={originName}
                    destinationName={destinationName}
                  />
                </>
              )}
            </>
          )}
        </main>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-md bg-white px-4 pt-4 pb-3">
        {selectedTab === "left"
          ? isHost && (
              <Button
                type="button"
                disabled={!isMeetingFieldsChanged || isMeetingSaving}
                onClick={handleSaveMeetingInfoPress}
                className={
                  isMeetingFieldsChanged
                    ? "bg-sub2-normal hover:bg-sub2-normal-hover"
                    : "bg-disable"
                }
              >
                {isMeetingSaving ? "저장 중..." : "저장하기"}
              </Button>
            )
          : myDeparture && (
              <Button
                type="button"
                disabled={!isDepartureFieldsChanged || isDepartureSaving}
                onClick={handleSaveDeparture}
                className={
                  isDepartureFieldsChanged
                    ? "bg-sub2-normal hover:bg-sub2-normal-hover"
                    : "bg-disable"
                }
              >
                {isDepartureSaving ? "저장 중..." : "저장하기"}
              </Button>
            )}
      </div>

      {isPlaceSearchOpen && (
        <PlaceSearchModal
          onClose={() => setIsPlaceSearchOpen(false)}
          onSelect={(selected) => {
            setPlace(selected);
            setIsPlaceSearchOpen(false);
          }}
        />
      )}

      {isTimeModalOpen && (
        <TimeSelectModal
          date={displayDateTime}
          meetings={otherMeetings}
          initialHour={displayDateTime.getHours()}
          initialMinute={displayDateTime.getMinutes()}
          onConfirm={handleTimeConfirm}
          onClose={() => setIsTimeModalOpen(false)}
        />
      )}

      {isOriginSearchOpen && (
        <PlaceSearchModal
          onClose={() => setIsOriginSearchOpen(false)}
          onSelect={handleSelectOrigin}
        />
      )}

      {isMeetingSaveConfirmOpen && (
        <ConfirmModal
          title="약속 장소를 변경합니다"
          description={"초대된 다른 참여자들에게도\n변경된 장소가 적용됩니다"}
          cancelLabel="취소"
          confirmLabel="완료"
          onCancel={() => setIsMeetingSaveConfirmOpen(false)}
          onConfirm={handleSaveMeetingInfo}
        />
      )}

      {isArrivalNoticeOpen && (
        <ConfirmModal
          title="도착예정시간 변경"
          description={
            "변경한 경로에 따라 도착예정시간이\n수정 및 약속화면에 저장 되었습니다"
          }
          confirmLabel="확인"
          onCancel={() => setIsArrivalNoticeOpen(false)}
          onConfirm={() => setIsArrivalNoticeOpen(false)}
        />
      )}

      {isInfoChangeNoticeOpen && (
        <ConfirmModal
          title="약속장소 변경"
          description={"약속장소가 변경되었습니다\n이동경로를 재설정하세요"}
          confirmLabel="확인"
          onCancel={() => setIsInfoChangeNoticeOpen(false)}
          onConfirm={() => setIsInfoChangeNoticeOpen(false)}
        />
      )}

      {actionError && (
        <AlertModal
          message={actionError}
          onConfirm={() => setActionError(null)}
        />
      )}

      {toastMessage && <Toast message={toastMessage} position="top" />}
    </div>
  );
};

export default MeetingSettingsPage;
