"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BottomSheet } from "@/components/common/BottomSheet";
import { ChatFloatingButton } from "@/components/meeting/progress/ChatFloatingButton";
import { MeetingMap } from "@/components/meeting/progress/MeetingMap";
import type { MeetingMapFocusLocation } from "@/components/meeting/progress/MeetingMap";
import { MeetingProgressSheet } from "@/components/meeting/progress/MeetingProgressSheet";
import { MeetingSummaryCard } from "@/components/meeting/progress/MeetingSummaryCard";
import { ParticipantMarker } from "@/components/meeting/progress/ParticipantMarker";
import { SPEECH_BUBBLE_MESSAGES } from "@/constants/message";
import { useMeetingQuery } from "@/hooks/meeting/create/useCreateMeeting";
import { useMemberDepartureQuery } from "@/hooks/meeting/departure/useMemberDeparture";
import { useMeetingInProgressQuery } from "@/hooks/meeting/progress/useMeetingInProgress";
import { useReactionPresetsQuery } from "@/hooks/meeting/progress/useReactionPresets";
import { useArrivalProximityCheck } from "@/hooks/meeting/progress/useArrivalProximityCheck";
import { useSendReactionMessageMutation } from "@/hooks/meeting/progress/useSendReactionMessage";
import { usePushSubscription } from "@/hooks/notification/usePushSubscription";
import { useAuthStore } from "@/stores/useAuthStore";
import { getRemainingTimeLabel, getTimeLabel } from "@/utils/date";
import type {
  PuzzleGroupParticipant,
  QuickMessageOption,
} from "@/types/meeting";

const SHEET_COLLAPSED_HEIGHT = 100;
const SHEET_HALF_HEIGHT = 270;
const SHEET_EXPANDED_HEIGHT = 9999;

const MAP_FOCUS_TOP_PADDING = 16;

const MeetingDetailPage = () => {
  const router = useRouter();
  const { meetingId } = useParams<{ meetingId: string }>();
  const numericMeetingId = Number(meetingId);

  const {
    data: meeting,
    isError: isMeetingError,
    refetch: refetchMeeting,
  } = useMeetingQuery(numericMeetingId);
  const { data: inProgress, dataUpdatedAt: inProgressUpdatedAt } =
    useMeetingInProgressQuery(numericMeetingId);

  const { data: reactionPresets } = useReactionPresetsQuery();

  const { data: myDeparture } = useMemberDepartureQuery(numericMeetingId);
  const currentUserId = useAuthStore((state) => state.user?.id);

  const { isNearDestination } = useArrivalProximityCheck(
    numericMeetingId,
    Boolean(myDeparture),
    inProgress?.destinationLatitude ?? null,
    inProgress?.destinationLongitude ?? null,
    inProgressUpdatedAt
  );

  const sendReactionMessageMutation =
    useSendReactionMessageMutation(numericMeetingId);
  const { subscribe: subscribeToPush } = usePushSubscription();

  useEffect(() => {
    subscribeToPush();
  }, [subscribeToPush]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetSnapPoint, setSheetSnapPoint] =
    useState<number>(SHEET_HALF_HEIGHT);
  const [focusedLocation, setFocusedLocation] =
    useState<MeetingMapFocusLocation | null>(null);
  const [isBubblePickerOpen, setIsBubblePickerOpen] = useState(false);
  const [myMessage, setMyMessage] = useState<string | null>(null);
  const sheetPopupRef = useRef<HTMLDivElement>(null);
  const summaryCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSheetOpen(true);
  }, []);

  const puzzleGroups = inProgress?.puzzleGroups ?? [];
  const participants = puzzleGroups
    .flatMap((group) => group.members)
    .filter(
      (member): member is PuzzleGroupParticipant & { userId: number } =>
        member.userId !== null
    );
  const isEveryMemberArrived =
    puzzleGroups.length > 0 &&
    puzzleGroups.every((group) =>
      group.members.every((member) => member.arrived)
    );

  useEffect(() => {
    if (!inProgress?.completed && !isEveryMemberArrived) return;
    router.replace(`/meeting/${meetingId}/completed`);
  }, [inProgress?.completed, isEveryMemberArrived, meetingId, router]);
  const quickMessages: QuickMessageOption[] = reactionPresets?.length
    ? reactionPresets.map((preset) => ({
        id: preset.id,
        content: preset.content,
      }))
    : SPEECH_BUBBLE_MESSAGES.map((content) => ({ id: null, content }));

  const handleParticipantFocus = (participant: PuzzleGroupParticipant) => {
    if (participant.latitude === null || participant.longitude === null) {
      return;
    }

    const sheetTop = sheetPopupRef.current?.getBoundingClientRect().top;
    const summaryCardBottom =
      summaryCardRef.current?.getBoundingClientRect().bottom;

    const bottomInset =
      sheetTop !== undefined ? Math.max(0, window.innerHeight - sheetTop) : 0;
    const topInset =
      summaryCardBottom !== undefined
        ? Math.max(0, summaryCardBottom) + MAP_FOCUS_TOP_PADDING
        : 0;

    setFocusedLocation({
      lat: participant.latitude,
      lng: participant.longitude,
      offsetY: (bottomInset - topInset) / 2,
    });
  };

  if (isMeetingError && !meeting) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-black">
        <p className="body3 text-white/70">약속 정보를 불러오지 못했어요</p>
        <button
          type="button"
          onClick={() => refetchMeeting()}
          className="bg-sub2-normal rounded-16 px-4 py-2 text-white"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black">
        <p className="body3 text-white/70">약속 정보를 불러오고 있어요</p>
      </div>
    );
  }

  const locatedParticipants = participants.filter(
    (
      participant
    ): participant is PuzzleGroupParticipant & {
      userId: number;
      latitude: number;
      longitude: number;
    } => participant.latitude !== null && participant.longitude !== null
  );

  const myLocatedParticipant = locatedParticipants.find(
    (participant) => participant.userId === currentUserId
  );

  const mapCenter = myLocatedParticipant
    ? {
        lat: myLocatedParticipant.latitude,
        lng: myLocatedParticipant.longitude,
      }
    : { lat: meeting.latitude, lng: meeting.longitude };

  const locatedParticipantsWithBubbles = locatedParticipants.map(
    (participant) =>
      participant.userId === currentUserId
        ? { ...participant, speechBubbleMessage: myMessage ?? undefined }
        : participant
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-x-0 top-0 h-full">
        <MeetingMap
          center={mapCenter}
          zoom={12}
          focusLocation={focusedLocation}
        >
          {locatedParticipantsWithBubbles.map((participant) => (
            <ParticipantMarker
              key={participant.userId}
              participant={participant}
            />
          ))}
        </MeetingMap>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white from-[-3.01%] to-white/0 to-[20%]" />
        {isBubblePickerOpen && (
          <button
            type="button"
            aria-label="말풍선 목록 닫기"
            onClick={() => setIsBubblePickerOpen(false)}
            className="bg-sub2-normal/40 absolute inset-0"
          />
        )}
      </div>
      <MeetingSummaryCard
        ref={summaryCardRef}
        meetingId={meeting.meetingId}
        title={meeting.title}
        location={meeting.place}
        time={getTimeLabel(meeting.dateTime)}
        remainingTime={getRemainingTimeLabel(meeting.dateTime)}
        className="absolute inset-x-4 top-3"
      />
      <ChatFloatingButton
        isOpen={isBubblePickerOpen}
        onOpenChange={setIsBubblePickerOpen}
        onSelectMessage={(message) => {
          setMyMessage(message.content);
          setIsBubblePickerOpen(false);
          if (message.id !== null) {
            sendReactionMessageMutation.mutate(message.id);
          }
        }}
        messages={quickMessages}
        className="absolute right-4 bottom-45 cursor-pointer"
        style={
          sheetSnapPoint !== SHEET_EXPANDED_HEIGHT
            ? { bottom: sheetSnapPoint + 12 }
            : undefined
        }
      />
      <BottomSheet
        ref={sheetPopupRef}
        open={isSheetOpen}
        onOpenChange={() => {}}
        modal={false}
        shouldShowBackdrop={false}
        disablePointerDismissal
        snapPoints={[
          SHEET_COLLAPSED_HEIGHT,
          SHEET_HALF_HEIGHT,
          SHEET_EXPANDED_HEIGHT,
        ]}
        snapPoint={sheetSnapPoint}
        onSnapPointChange={(point) => {
          if (typeof point !== "number") return;
          setSheetSnapPoint(point);
        }}
      >
        <MeetingProgressSheet
          meetingId={numericMeetingId}
          puzzleGroups={puzzleGroups}
          participants={participants}
          onParticipantFocus={handleParticipantFocus}
          isNearDestination={isNearDestination}
        />
      </BottomSheet>
    </div>
  );
};

export default MeetingDetailPage;
