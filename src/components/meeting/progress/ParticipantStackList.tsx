import { ParticipantStackItem } from "./ParticipantStackItem";
import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import { getElapsedMinutes } from "@/utils/date";
import type { PuzzleGroupParticipant } from "@/types/meeting";

export interface ParticipantStackListProps {
  participants: PuzzleGroupParticipant[];
  height?: number;
}

export const ParticipantStackList = ({
  participants,
  height,
}: ParticipantStackListProps) => {
  return (
    <div
      className="flex w-full [scrollbar-width:none] flex-col items-start overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={height ? { height } : undefined}
    >
      {participants.map((participant, index) => (
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
          {index > 0 && index < participants.length - 1 && (
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
