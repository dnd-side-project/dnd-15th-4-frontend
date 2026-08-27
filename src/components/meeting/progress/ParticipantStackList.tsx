import { ParticipantStackItem } from "./ParticipantStackItem";
import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import type { ArrivalConfirmationStep } from "@/hooks/meeting/progress/useArrivalConfirmation";
import { useAuthStore } from "@/stores/useAuthStore";
import { getRemainingMinutes } from "@/utils/date";
import { sortParticipantsByProgress } from "@/utils/participant-order";
import type { PuzzleGroupParticipant } from "@/types/meeting";

interface ParticipantStackListProps {
  participants: PuzzleGroupParticipant[];
  height?: number;
  canConfirmArrival?: boolean;
  confirmationStep?: ArrivalConfirmationStep;
  remainingSeconds?: number;
  isConfirmed?: boolean;
  onStartConfirmation?: () => void;
  onCancelConfirmation?: () => void;
}

export const ParticipantStackList = ({
  participants,
  height,
  canConfirmArrival = false,
  confirmationStep = "pending",
  remainingSeconds = 0,
  isConfirmed = false,
  onStartConfirmation,
  onCancelConfirmation,
}: ParticipantStackListProps) => {
  const currentUserId = useAuthStore((state) => state.user?.id);
  const sortedParticipants = sortParticipantsByProgress(
    participants,
    currentUserId
  );

  return (
    <div
      className="flex w-full [scrollbar-width:none] flex-col items-start overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={height ? { height } : undefined}
    >
      {sortedParticipants.map((participant, index) => {
        const isMe = participant.userId === currentUserId;

        return (
          <div
            key={participant.userId}
            className="flex w-full flex-col items-start"
          >
            <ParticipantStackItem
              image={
                participant.profileImageUrl?.trim() || CHARACTER_FALLBACK_IMAGE
              }
              nickname={participant.nickname ?? ""}
              hasDeparted={participant.departed}
              remainingMinutes={
                participant.estimatedArrivalTime
                  ? getRemainingMinutes(participant.estimatedArrivalTime)
                  : 0
              }
              isHighlighted={index === 0}
              isArrived={participant.arrived}
              showConfirmButton={isMe && canConfirmArrival && !isConfirmed}
              confirmationStep={isMe ? confirmationStep : "pending"}
              remainingSeconds={remainingSeconds}
              isConfirmed={isMe && isConfirmed}
              onStartConfirmation={onStartConfirmation}
              onCancelConfirmation={onCancelConfirmation}
            />
            {index > 0 && index < sortedParticipants.length - 1 && (
              <span
                className="bg-divider mx-4 h-px w-[calc(100%-2rem)]"
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
