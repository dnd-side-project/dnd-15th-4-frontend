import { Fragment } from "react";

import { ParticipantStatusAvatar } from "./ParticipantStatusAvatar";
import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import { cn } from "@/lib/utils";
import { getElapsedMinutes } from "@/utils/date";
import type { PuzzleGroupParticipant } from "@/types/meeting";

export interface ParticipantStatusRowProps {
  participants: PuzzleGroupParticipant[];
  onParticipantFocus?: (participant: PuzzleGroupParticipant) => void;
  className?: string;
}

const getMinutesAgoLabel = (participant: PuzzleGroupParticipant) => {
  if (participant.arrived || !participant.departedAt) return undefined;

  const elapsedMinutes = Math.max(1, getElapsedMinutes(participant.departedAt));

  return `${elapsedMinutes}분전`;
};

export const ParticipantStatusRow = ({
  participants,
  onParticipantFocus,
  className,
}: ParticipantStatusRowProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 overflow-x-auto pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {participants.map((participant, index) => (
        <Fragment key={participant.userId}>
          {index === 1 && (
            <span className="bg-border-1 h-9 w-px shrink-0" aria-hidden />
          )}
          <ParticipantStatusAvatar
            image={
              participant.profileImageUrl?.trim() || CHARACTER_FALLBACK_IMAGE
            }
            nickname={participant.nickname ?? ""}
            minutesAgoLabel={getMinutesAgoLabel(participant)}
            onClick={() => onParticipantFocus?.(participant)}
          />
        </Fragment>
      ))}
    </div>
  );
};
