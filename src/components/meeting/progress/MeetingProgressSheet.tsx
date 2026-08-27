import { useEffect, useRef, useState } from "react";

import { MeetingProgressHeader } from "./MeetingProgressHeader";
import { ParticipantStackList } from "./ParticipantStackList";
import { ParticipantStatusRow } from "./ParticipantStatusRow";
import { PuzzleEtaCarousel } from "./PuzzleEtaCarousel";
import { Toast } from "@/components/common/Toast";
import { useMeasuredHeight } from "@/hooks/common/useMeasuredHeight";
import { useArrivalConfirmation } from "@/hooks/meeting/progress/useArrivalConfirmation";
import { useConfirmArrivalMutation } from "@/hooks/meeting/progress/useConfirmArrival";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import type {
  MeetingPuzzleGroup,
  PuzzleGroupParticipant,
} from "@/types/meeting";

const ARRIVAL_ERROR_TOAST_VISIBLE_MS = 2500;

export interface MeetingProgressSheetProps {
  meetingId: number;
  puzzleGroups: MeetingPuzzleGroup[];
  participants: PuzzleGroupParticipant[];
  onParticipantFocus?: (participant: PuzzleGroupParticipant) => void;
  isNearDestination?: boolean;
}

export const MeetingProgressSheet = ({
  meetingId,
  puzzleGroups,
  participants,
  onParticipantFocus,
  isNearDestination = false,
}: MeetingProgressSheetProps) => {
  const [isStackView, setIsStackView] = useState(false);
  const [isArrivalErrorToastVisible, setIsArrivalErrorToastVisible] =
    useState(false);

  useEffect(() => {
    if (!isArrivalErrorToastVisible) return;

    const timer = setTimeout(
      () => setIsArrivalErrorToastVisible(false),
      ARRIVAL_ERROR_TOAST_VISIBLE_MS
    );
    return () => clearTimeout(timer);
  }, [isArrivalErrorToastVisible]);

  const currentUserId = useAuthStore((state) => state.user?.id);
  const myParticipant = participants.find(
    (participant) => participant.userId === currentUserId
  );
  const canConfirmArrival =
    isNearDestination && !!myParticipant && !myParticipant.arrived;

  const confirmArrivalMutation = useConfirmArrivalMutation(meetingId);
  const handleConfirmArrival = () => confirmArrivalMutation.mutateAsync();
  const handleConfirmArrivalError = () => setIsArrivalErrorToastVisible(true);

  const {
    confirmationStep,
    remainingSeconds,
    isConfirmed,
    handleStartConfirmation,
    handleCancelConfirmation,
  } = useArrivalConfirmation(
    canConfirmArrival,
    handleConfirmArrival,
    handleConfirmArrivalError
  );

  const isMyArrivalPending =
    !!myParticipant && !myParticipant.arrived && isConfirmed;
  const completedCount =
    participants.filter((participant) => participant.arrived).length +
    (isMyArrivalPending ? 1 : 0);

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
          height={gridViewHeight}
          canConfirmArrival={canConfirmArrival}
          confirmationStep={confirmationStep}
          remainingSeconds={remainingSeconds}
          isConfirmed={isConfirmed}
          onStartConfirmation={handleStartConfirmation}
          onCancelConfirmation={handleCancelConfirmation}
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
          puzzleGroups={puzzleGroups}
          canConfirmArrival={canConfirmArrival}
          confirmationStep={confirmationStep}
          remainingSeconds={remainingSeconds}
          isConfirmed={isConfirmed}
          onStartConfirmation={handleStartConfirmation}
          onCancelConfirmation={handleCancelConfirmation}
        />
      </div>

      {isArrivalErrorToastVisible && (
        <Toast message="도착 확인에 실패했어요. 다시 시도해주세요." />
      )}
    </div>
  );
};
