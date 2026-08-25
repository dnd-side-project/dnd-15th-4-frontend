"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { AlertModal } from "@/components/common/AlertModal";
import { Header } from "@/components/common/Header";
import { InfoBanner } from "@/components/common/InfoBanner";
import { PlaceSearchTrigger } from "@/components/common/PlaceSearchTrigger";
import { ToggleField } from "@/components/common/ToggleField";
import { DepartureOriginSearchOverlay } from "@/components/meeting/departure/DepartureOriginSearchOverlay";
import { RouteSelectTrigger } from "@/components/meeting/departure/RouteSelectTrigger";
import { TravelRouteList } from "@/components/meeting/departure/TravelRouteList";
import { TravelRouteSummaryCard } from "@/components/meeting/departure/TravelRouteSummaryCard";
import { getRouteSummary } from "@/components/meeting/departure/TravelRouteSegmentList";
import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import { useMeetingQuery } from "@/hooks/meeting/create/useCreateMeeting";
import { useCreateMemberDepartureMutation } from "@/hooks/meeting/departure/useMemberDeparture";
import { useSearchMeetingRoutesMutation } from "@/hooks/meeting/departure/useMeetingRoutes";
import { useAuthStore } from "@/stores/useAuthStore";
import type {
  DepartureOrigin,
  MeetingRoute,
  Participant,
} from "@/types/meeting";
import { formatMeetingDateTime } from "@/utils/date";
import { DoubleButton } from "@/components/common/DoubleButton";

interface ParticipantAvatarProps {
  participant: Participant;
  isMe: boolean;
}

const ParticipantAvatar = ({ participant, isMe }: ParticipantAvatarProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="border-border-4 rounded-16 size-13.5 overflow-hidden border-2 bg-white">
        <Image
          src={
            hasError || !participant.profileImageUrl?.trim()
              ? CHARACTER_FALLBACK_IMAGE
              : participant.profileImageUrl
          }
          alt={participant.name}
          width={54}
          height={54}
          className="size-full object-cover"
          onError={() => setHasError(true)}
        />
      </div>
      <span className="body6 text-primary">
        {isMe ? `${participant.name}(나)` : participant.name}
      </span>
    </div>
  );
};

const DepartureSetupPage = () => {
  const router = useRouter();
  const { meetingId } = useParams<{ meetingId: string }>();
  const currentUserId = useAuthStore((state) => state.user?.id);

  const { data: meeting, isLoading: isMeetingLoading } = useMeetingQuery(
    Number(meetingId)
  );
  const createDepartureMutation = useCreateMemberDepartureMutation(
    Number(meetingId)
  );

  const [isOriginSearchOpen, setIsOriginSearchOpen] = useState(false);
  const [origin, setOrigin] = useState<DepartureOrigin | null>(null);
  const [isRouteListOpen, setIsRouteListOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<MeetingRoute | null>(null);
  const [notifyLocation, setNotifyLocation] = useState(false);
  const [notifyFriendArrival, setNotifyFriendArrival] = useState(false);
  const [notifySpeechBubble, setNotifySpeechBubble] = useState(false);
  const [departureError, setDepartureError] = useState<string | null>(null);

  const searchRoutesMutation = useSearchMeetingRoutesMutation(
    Number(meetingId)
  );

  const canDepart = Boolean(origin && selectedRoute);

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
    setIsRouteListOpen((prev) => !prev);
  };

  const handleSelectRoute = (route: MeetingRoute) => {
    setSelectedRoute(route);
    setIsRouteListOpen(false);
  };

  const handleReset = () => {
    setOrigin(null);
    setSelectedRoute(null);
    setIsRouteListOpen(false);
    setNotifyLocation(false);
    setNotifyFriendArrival(false);
    setNotifySpeechBubble(false);
    searchRoutesMutation.reset();
  };

  const handleDepart = () => {
    if (!origin || !selectedRoute || !meeting) return;

    createDepartureMutation.mutate(
      {
        departure: {
          placeName: origin.placeName,
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        notificationSettings: {
          locationPermission: notifyLocation,
          friendArrival: notifyFriendArrival,
          chatBubble: notifySpeechBubble,
        },
        nicknameSetting: { enabled: false },
        route: {
          totalTime: selectedRoute.totalTime,
          steps: selectedRoute.steps,
        },
      },
      {
        onSuccess: () => router.push(`/meeting/${meeting.meetingId}`),
        onError: () =>
          setDepartureError("출발 설정에 실패했어요. 다시 시도해주세요."),
      }
    );
  };

  if (!meeting) {
    return (
      <div className="flex min-h-dvh flex-col">
        <Header
          title="출발 설정"
          onBack={() => router.back()}
          className="bg-primary-light-active sticky top-0 z-10"
        />
        <p className="body3 text-disable flex flex-1 items-center justify-center">
          {isMeetingLoading
            ? "약속 정보를 불러오고 있어요"
            : "약속 정보를 찾을 수 없어요"}
        </p>
      </div>
    );
  }

  const { timeFormatted } = formatMeetingDateTime(meeting.dateTime);
  const originName = origin?.placeName ?? "";
  const destinationName = meeting.place;
  const sortedParticipants = [...meeting.participants].sort((a, b) => {
    if (a.id === currentUserId) return -1;
    if (b.id === currentUserId) return 1;
    return 0;
  });

  return (
    <div className="h-screen scrollbar-none overflow-y-auto pb-12">
      <div className="bg-primary-light-active">
        <Header
          title="출발 설정"
          onBack={() => router.back()}
          className="bg-primary-light-active sticky top-0 z-10"
        />
        <div className="flex flex-col gap-6 px-4 pt-2 pb-7">
          <div className="flex flex-col gap-2">
            <h2 className="h1 text-primary wrap-break-word">
              {meeting.title} 약속으로
              <br />
              출발해볼까요?
            </h2>
            <p className="body3 text-primary-darker opacity-71">
              {meeting.place} | {timeFormatted}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-12">
            {sortedParticipants.map((participant) => (
              <ParticipantAvatar
                key={participant.id}
                participant={participant}
                isMe={participant.id === currentUserId}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4 pt-6">
        <PlaceSearchTrigger
          label="출발지"
          place={origin}
          placeholder="출발지를 선택해주세요"
          onClick={() => setIsOriginSearchOpen(true)}
        />

        <RouteSelectTrigger
          label={selectedRoute ? "이동경로 요약" : "이동 경로"}
          value={
            selectedRoute
              ? getRouteSummary(
                  selectedRoute.steps,
                  originName,
                  destinationName
                )
              : null
          }
          placeholder={
            origin ? "이동 경로를 선택해주세요" : "출발지를 먼저 선택해주세요"
          }
          disabled={!origin}
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
            onCheckedChange={setNotifyLocation}
          />
          <ToggleField
            label="친구도착"
            checked={notifyFriendArrival}
            onCheckedChange={setNotifyFriendArrival}
          />
          <ToggleField
            label="말풍선"
            checked={notifySpeechBubble}
            onCheckedChange={setNotifySpeechBubble}
          />
        </div>
      </div>

      {selectedRoute && (
        <>
          <div className="bg-divider-2 my-6 h-2 w-full" />
          <TravelRouteSummaryCard
            route={selectedRoute}
            originName={originName}
            destinationName={destinationName}
          />
        </>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-md gap-3 bg-white px-4 pt-4 pb-3">
        <DoubleButton
          secondaryLabel="초기화"
          onSecondaryClick={handleReset}
          primaryLabel={
            createDepartureMutation.isPending ? "출발 설정 중..." : "출발하기"
          }
          onPrimaryClick={handleDepart}
          isPrimaryDisabled={!canDepart || createDepartureMutation.isPending}
        />
      </div>

      {isOriginSearchOpen && (
        <DepartureOriginSearchOverlay
          onClose={() => setIsOriginSearchOpen(false)}
          onSelect={handleSelectOrigin}
        />
      )}

      {departureError && (
        <AlertModal
          message={departureError}
          onConfirm={() => setDepartureError(null)}
        />
      )}
    </div>
  );
};

export default DepartureSetupPage;
