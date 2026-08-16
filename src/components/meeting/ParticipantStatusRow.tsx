import { Fragment } from "react";

import { ParticipantStatusAvatar } from "./ParticipantStatusAvatar";
import { getProfileImageUrl } from "@/constants/profileImages";
import { cn } from "@/lib/utils";
import type { MeetingParticipant } from "@/types/meeting";

export interface ParticipantStatusRowProps {
  participants: MeetingParticipant[];
  onParticipantFocus?: (participant: MeetingParticipant) => void;
  className?: string;
}

const getMinutesAgoLabel = (participant: MeetingParticipant) => {
  if (participant.arrivalStatus) return undefined;

  const elapsedMinutes = Math.max(
    1,
    Math.round(
      (Date.now() - new Date(participant.departureTime).getTime()) / 60_000
    )
  );

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
        <Fragment key={participant.id}>
          {index === 1 && (
            <span className="bg-border-1 h-9 w-px shrink-0" aria-hidden />
          )}
          <ParticipantStatusAvatar
            image={getProfileImageUrl(participant.profileImageNumber)}
            nickname={participant.nickname}
            minutesAgoLabel={getMinutesAgoLabel(participant)}
            onClick={() => onParticipantFocus?.(participant)}
          />
        </Fragment>
      ))}
    </div>
  );
};
