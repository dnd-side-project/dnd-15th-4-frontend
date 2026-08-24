"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { InfoBanner } from "@/components/common/InfoBanner";
import { InputLayout } from "@/components/common/InputLayout";
import { ToggleField } from "@/components/common/ToggleField";
import { DepartureOriginSearchOverlay } from "@/components/meeting/departure/DepartureOriginSearchOverlay";
import { TravelRouteList } from "@/components/meeting/departure/TravelRouteList";
import { TravelRouteSummaryCard } from "@/components/meeting/departure/TravelRouteSummaryCard";
import { CURRENT_PARTICIPANT_ID } from "@/constants/message";
import { getCharacterImage } from "@/constants/character-images";
import { useMeetingDeparture } from "@/hooks/meeting/departure/useMeetingDeparture";
import { MOCK_TRAVEL_ROUTES } from "@/mocks/mockDeparture";
import { MOCK_MEETINGS, mockMeetingParticipants } from "@/mocks/mockMeetings";
import type { DepartureOrigin, TravelRouteOption } from "@/types/meeting";
import { formatMeetingDateTime } from "@/utils/date";

const DepartureSetupPage = () => {
  const router = useRouter();
  const { meetingId } = useParams<{ meetingId: string }>();
  const { setDeparture } = useMeetingDeparture();

  const meeting =
    MOCK_MEETINGS.find((item) => item.meetingId === Number(meetingId)) ??
    MOCK_MEETINGS[0];

  const [isOriginSearchOpen, setIsOriginSearchOpen] = useState(false);
  const [origin, setOrigin] = useState<DepartureOrigin | null>(null);
  const [isRouteListOpen, setIsRouteListOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<TravelRouteOption | null>(
    null
  );
  const [notifyLocation, setNotifyLocation] = useState(false);
  const [notifyFriendArrival, setNotifyFriendArrival] = useState(false);
  const [notifySpeechBubble, setNotifySpeechBubble] = useState(false);

  const { timeFormatted } = formatMeetingDateTime(meeting.dateTime);
  const canDepart = Boolean(origin && selectedRoute);

  const handleSelectOrigin = (selected: DepartureOrigin) => {
    setOrigin(selected);
    setSelectedRoute(null);
    setIsOriginSearchOpen(false);
  };

  const handleRouteFieldClick = () => {
    if (!origin) return;
    setIsRouteListOpen((prev) => !prev);
  };

  const handleSelectRoute = (route: TravelRouteOption) => {
    setSelectedRoute(route);
  };

  const handleReset = () => {
    setOrigin(null);
    setSelectedRoute(null);
    setIsRouteListOpen(false);
    setNotifyLocation(false);
    setNotifyFriendArrival(false);
    setNotifySpeechBubble(false);
  };

  const handleDepart = () => {
    if (!origin || !selectedRoute) return;

    setDeparture({
      meetingId: meeting.meetingId,
      origin,
      route: selectedRoute,
      notifyLocation,
      notifyFriendArrival,
      notifySpeechBubble,
      departedAt: new Date().toISOString(),
    });

    router.push(`/meeting/${meeting.meetingId}`);
  };

  return (
    <div className="relative min-h-dvh bg-white pb-40">
      <div className="bg-primary-light-active">
        <Header title="출발설정" onBack={() => router.back()} />

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
            {mockMeetingParticipants.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex flex-col items-center gap-1"
              >
                <div className="border-border-4 rounded-16 size-13.5 overflow-hidden border-2 bg-white">
                  <Image
                    src={getCharacterImage(participant.profileImageNumber)}
                    alt={participant.nickname}
                    width={54}
                    height={54}
                    className="size-full object-cover"
                  />
                </div>
                <span className="body6 text-primary">
                  {participant.id === CURRENT_PARTICIPANT_ID
                    ? `${participant.nickname}(나)`
                    : participant.nickname}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4 pt-6">
        <InputLayout label="출발지" hasValue={Boolean(origin)}>
          <button
            type="button"
            onClick={() => setIsOriginSearchOpen(true)}
            className="flex w-full items-center text-left outline-none"
          >
            {origin ? (
              <span className="body3 text-primary break-all">
                {origin.placeName}
              </span>
            ) : (
              <span className="body3 text-disable">출발지를 선택해주세요</span>
            )}
          </button>
        </InputLayout>

        <InputLayout
          label={selectedRoute ? "이동경로 요약" : "이동 경로"}
          hasValue={Boolean(selectedRoute)}
          disabled={!origin}
        >
          <button
            type="button"
            onClick={handleRouteFieldClick}
            disabled={!origin}
            className="flex w-full items-center text-left outline-none disabled:cursor-not-allowed"
          >
            {selectedRoute ? (
              <span className="body3 text-primary break-all">
                {selectedRoute.segments
                  .map((segment) => segment.label)
                  .join(" - ")}
              </span>
            ) : (
              <span className="body3 text-disable">
                {origin
                  ? "이동 경로를 선택해주세요"
                  : "출발지를 먼저 선택해주세요"}
              </span>
            )}
          </button>
        </InputLayout>

        {isRouteListOpen && (
          <TravelRouteList
            routes={MOCK_TRAVEL_ROUTES}
            selectedRouteId={selectedRoute?.routeId ?? null}
            onSelect={handleSelectRoute}
          />
        )}
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
          <TravelRouteSummaryCard route={selectedRoute} />
        </>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-md gap-3 bg-white px-4 pt-4 pb-8">
        <Button
          type="button"
          variant="outline"
          size="cta"
          onClick={handleReset}
          className="rounded-16 h-14 flex-1"
        >
          초기화
        </Button>
        <Button
          type="button"
          size="cta"
          disabled={!canDepart}
          onClick={handleDepart}
          className={
            canDepart
              ? "bg-sub2-normal hover:bg-sub2-normal-hover rounded-16 h-14 flex-1"
              : "bg-disable rounded-16 h-14 flex-1"
          }
        >
          출발하기
        </Button>
      </div>

      {isOriginSearchOpen && (
        <DepartureOriginSearchOverlay
          onClose={() => setIsOriginSearchOpen(false)}
          onSelect={handleSelectOrigin}
        />
      )}
    </div>
  );
};

export default DepartureSetupPage;
