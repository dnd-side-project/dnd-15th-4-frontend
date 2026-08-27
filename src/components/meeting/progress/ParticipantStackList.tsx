import { ParticipantStackItem } from "./ParticipantStackItem";
import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import { useAuthStore } from "@/stores/useAuthStore";
import { getElapsedMinutes } from "@/utils/date";
import { sortParticipantsByProgress } from "@/utils/participant-order";
import type { PuzzleGroupParticipant } from "@/types/meeting";

interface ParticipantStackListProps {
  participants: PuzzleGroupParticipant[];
  height?: number;
}

export const ParticipantStackList = ({
  participants,
  height,
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
      {sortedParticipants.map((participant, index) => (
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
            elapsedMinutes={
              participant.departedAt
                ? getElapsedMinutes(participant.departedAt)
                : 0
            }
            isHighlighted={index === 0}
            isArrived={participant.arrived}
          />
          {index > 0 && index < sortedParticipants.length - 1 && (
            <span
              className="bg-divider mx-4 h-px w-[calc(100%-2rem)]"
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  );
};
