import { useRef, useState } from "react";

import { MeetingProgressHeader } from "./MeetingProgressHeader";
import { ParticipantStackList } from "./ParticipantStackList";
import { ParticipantStatusRow } from "./ParticipantStatusRow";
import { PuzzleEtaCarousel } from "./PuzzleEtaCarousel";
import { useMeasuredHeight } from "@/hooks/common/useMeasuredHeight";
import { cn } from "@/lib/utils";
import type { MeetingLocation, MeetingParticipant } from "@/types/meeting";

export interface MeetingProgressSheetProps {
  participants: MeetingParticipant[];
  meetingPlaceLocation: MeetingLocation;
  onParticipantFocus?: (participant: MeetingParticipant) => void;
}

export const MeetingProgressSheet = ({
  participants,
  meetingPlaceLocation,
  onParticipantFocus,
}: MeetingProgressSheetProps) => {
  const [isStackView, setIsStackView] = useState(false);
  const completedCount = participants.filter((p) => p.arrivalStatus).length;

  const gridViewRef = useRef<HTMLDivElement>(null);
  const gridViewHeight = useMeasuredHeight(gridViewRef);

  return (
    <div className="relative flex w-full flex-col items-start gap-5">
      <div className="flex w-full flex-col gap-5 px-4">
        <MeetingProgressHeader
          completedCount={completedCount}
          totalCount={participants.length}
          isStackView={isStackView}
          onStackViewChange={setIsStackView}
        />
      </div>

      <ParticipantStatusRow
        participants={participants}
        onParticipantFocus={onParticipantFocus}
        className="pl-4"
      />

      {isStackView && (
        <ParticipantStackList
          participants={participants}
          meetingPlaceLocation={meetingPlaceLocation}
          height={gridViewHeight}
        />
      )}

      <div
        ref={gridViewRef}
        className={cn(
          "w-full px-4",
          isStackView && "invisible absolute inset-x-0 pointer-events-none"
        )}
      >
        <PuzzleEtaCarousel
          participants={participants}
          meetingPlaceLocation={meetingPlaceLocation}
        />
      </div>
    </div>
  );
};
