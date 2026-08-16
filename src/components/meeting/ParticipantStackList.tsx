import { ParticipantStackItem } from "./ParticipantStackItem";
import { getProfileImageUrl } from "@/constants/profileImages";
import type { MeetingParticipant } from "@/types/meeting";

export interface ParticipantStackListProps {
  participants: MeetingParticipant[];
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
        <div key={participant.id} className="flex w-full flex-col items-start">
          <ParticipantStackItem
            image={getProfileImageUrl(participant.profileImageNumber)}
            nickname={participant.nickname}
            remainingMinutes={participant.estimatedArrivalTime}
            isHighlighted={index === 0}
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
