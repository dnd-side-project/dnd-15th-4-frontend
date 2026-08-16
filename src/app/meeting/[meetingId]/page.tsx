"use client";

import { useEffect, useRef, useState } from "react";

import { BottomSheet } from "@/components/common/BottomSheet";
import { ChatFloatingButton } from "@/components/meeting/ChatFloatingButton";
import { MeetingMap } from "@/components/meeting/MeetingMap";
import type { MeetingMapFocusLocation } from "@/components/meeting/MeetingMap";
import { MeetingProgressSheet } from "@/components/meeting/MeetingProgressSheet";
import { MeetingSummaryCard } from "@/components/meeting/MeetingSummaryCard";
import { ParticipantMarker } from "@/components/meeting/ParticipantMarker";
import { CURRENT_PARTICIPANT_ID } from "@/constants/message";
import { getRemainingTimeLabel, getTimeLabel } from "@/lib/date";
import {
  mockMeetingParticipants,
  mockMeetingSummary,
} from "@/mocks/mockMeetings";
import type { MeetingParticipant } from "@/types/meeting";

const MEETING_PLACE_CENTER = { lat: 37.534, lng: 127.058 };

const SHEET_COLLAPSED_HEIGHT = 170;
const SHEET_EXPANDED_HEIGHT = 9999;

const MAP_FOCUS_TOP_PADDING = 16;

const MeetingDetailPage = () => {
  const { participants } = mockMeetingParticipants;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetSnapPoint, setSheetSnapPoint] = useState<number>(
    SHEET_EXPANDED_HEIGHT
  );
  const [focusedLocation, setFocusedLocation] =
    useState<MeetingMapFocusLocation | null>(null);
  const [isBubblePickerOpen, setIsBubblePickerOpen] = useState(false);
  const [myMessage, setMyMessage] = useState<string | null>(null);
  const sheetPopupRef = useRef<HTMLDivElement>(null);
  const summaryCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSheetOpen(true);
  }, []);

  const handleParticipantFocus = (participant: MeetingParticipant) => {
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
      lat: participant.currentLocation.latitude,
      lng: participant.currentLocation.longitude,
      offsetY: (bottomInset - topInset) / 2,
    });
  };

  const participantsWithBubbles = participants.map((participant) =>
    participant.id === CURRENT_PARTICIPANT_ID
      ? { ...participant, speechBubbleMessage: myMessage ?? undefined }
      : participant
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-x-0 top-0 h-full">
        <MeetingMap
          center={MEETING_PLACE_CENTER}
          zoom={12}
          focusLocation={focusedLocation}
        >
          {participantsWithBubbles.map((participant) => (
            <ParticipantMarker key={participant.id} participant={participant} />
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
        title={mockMeetingSummary.title}
        location={mockMeetingSummary.place}
        time={getTimeLabel(mockMeetingSummary.dateTime)}
        remainingTime={getRemainingTimeLabel(mockMeetingSummary.dateTime)}
        className="absolute inset-x-4 top-3"
      />
      <ChatFloatingButton
        isOpen={isBubblePickerOpen}
        onOpenChange={setIsBubblePickerOpen}
        onSelectMessage={(message) => {
          setMyMessage(message);
          setIsBubblePickerOpen(false);
        }}
        className="absolute right-4 bottom-45 cursor-pointer"
      />
      <BottomSheet
        ref={sheetPopupRef}
        open={isSheetOpen}
        onOpenChange={() => {}}
        modal={false}
        shouldShowBackdrop={false}
        disablePointerDismissal
        snapPoints={[SHEET_COLLAPSED_HEIGHT, SHEET_EXPANDED_HEIGHT]}
        snapPoint={sheetSnapPoint}
        onSnapPointChange={(point) => {
          if (typeof point !== "number") return;
          setSheetSnapPoint(point);
          setIsBubblePickerOpen(false);
        }}
      >
        <MeetingProgressSheet
          participants={participants}
          onParticipantFocus={handleParticipantFocus}
        />
      </BottomSheet>
    </div>
  );
};

export default MeetingDetailPage;
