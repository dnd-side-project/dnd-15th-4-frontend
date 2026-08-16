import { PuzzleEtaCard } from "./PuzzleEtaCard";
import type { PuzzleEtaCardPosition } from "./PuzzleEtaCard";
import { PuzzleEtaEmptyCard } from "./PuzzleEtaEmptyCard";
import { getProfileImageUrl } from "@/constants/profileImages";
import {
  ARRIVAL_DISTANCE_THRESHOLD_METERS,
  getDistanceInMeters,
} from "@/lib/geo";
import type { MeetingLocation, MeetingParticipant } from "@/types/meeting";

interface PuzzleCardStyle {
  position: PuzzleEtaCardPosition;
  backgroundClassName: string;
  textClassName?: string;
}

const GRID_STYLES: PuzzleCardStyle[] = [
  {
    position: "top-left",
    backgroundClassName: "bg-primary-light-active",
  },
  {
    position: "top-right",
    backgroundClassName: "bg-sub1-light-active",
  },
  {
    position: "bottom-left",
    backgroundClassName: "bg-sub2-normal",
    textClassName: "text-white",
  },
  {
    position: "bottom-right",
    backgroundClassName: "bg-point-normal",
  },
];

export const PUZZLE_GRID_SIZE = GRID_STYLES.length;

export interface PuzzleEtaGridProps {
  participants: MeetingParticipant[];
  meetingPlaceLocation: MeetingLocation;
}

export const PuzzleEtaGrid = ({
  participants,
  meetingPlaceLocation,
}: PuzzleEtaGridProps) => {
  return (
    <div className="grid aspect-square w-full grid-cols-2 grid-rows-2">
      {GRID_STYLES.map((style, index) => {
        const participant = participants[index];

        if (!participant) {
          return (
            <PuzzleEtaEmptyCard
              key={style.position}
              position={style.position}
              backgroundClassName={style.backgroundClassName}
            />
          );
        }

        const isArrived =
          getDistanceInMeters(
            participant.currentLocation,
            meetingPlaceLocation
          ) <= ARRIVAL_DISTANCE_THRESHOLD_METERS;

        return (
          <PuzzleEtaCard
            key={participant.id}
            position={style.position}
            backgroundClassName={style.backgroundClassName}
            textClassName={style.textClassName}
            image={getProfileImageUrl(participant.profileImageNumber)}
            nickname={participant.nickname}
            remainingMinutes={participant.estimatedArrivalTime}
            isArrived={isArrived}
          />
        );
      })}
    </div>
  );
};
