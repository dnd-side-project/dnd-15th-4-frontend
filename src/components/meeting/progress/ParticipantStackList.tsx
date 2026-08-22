import { ParticipantStackItem } from "./ParticipantStackItem";
import { getCharacterImage } from "@/constants/character-images";
import {
  ARRIVAL_DISTANCE_THRESHOLD_METERS,
  getMeetingDistanceInMeters,
} from "@/utils/geo";
import type { MeetingLocation, MeetingParticipant } from "@/types/meeting";

export interface ParticipantStackListProps {
  participants: MeetingParticipant[];
  meetingPlaceLocation: MeetingLocation;
  height?: number;
}

export const ParticipantStackList = ({
  participants,
  meetingPlaceLocation,
  height,
}: ParticipantStackListProps) => {
  return (
    <div
      className="flex w-full [scrollbar-width:none] flex-col items-start overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={height ? { height } : undefined}
    >
      {participants.map((participant, index) => {
        const isArrived =
          getMeetingDistanceInMeters(
            participant.currentLocation,
            meetingPlaceLocation
          ) <= ARRIVAL_DISTANCE_THRESHOLD_METERS;

        return (
          <div
            key={participant.id}
            className="flex w-full flex-col items-start"
          >
            <ParticipantStackItem
              image={getCharacterImage(participant.profileImageNumber)}
              nickname={participant.nickname}
              remainingMinutes={participant.estimatedArrivalTime}
              isHighlighted={index === 0}
              isArrived={isArrived}
            />
            {index > 0 && index < participants.length - 1 && (
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
