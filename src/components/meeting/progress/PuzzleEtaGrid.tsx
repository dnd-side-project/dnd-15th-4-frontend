import { PuzzleEtaCard } from "./PuzzleEtaCard";
import type { PuzzleEtaCardPosition } from "./PuzzleEtaCard";
import { PuzzleEtaEmptyCard } from "./PuzzleEtaEmptyCard";
import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import { getElapsedMinutes } from "@/utils/date";
import type { PuzzleGroupParticipant } from "@/types/meeting";

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

export interface PuzzleEtaGridProps {
  members: PuzzleGroupParticipant[];
}

export const PuzzleEtaGrid = ({ members }: PuzzleEtaGridProps) => {
  return (
    <div className="grid aspect-square w-full grid-cols-2 grid-rows-2">
      {GRID_STYLES.map((style, index) => {
        const pieceIndex = index + 1;
        const member = members.find(
          (candidate) => candidate.pieceIndex === pieceIndex
        );

        if (!member || member.userId === null) {
          return (
            <PuzzleEtaEmptyCard
              key={style.position}
              position={style.position}
              backgroundClassName={style.backgroundClassName}
            />
          );
        }

        return (
          <PuzzleEtaCard
            key={member.userId}
            position={style.position}
            backgroundClassName={style.backgroundClassName}
            textClassName={style.textClassName}
            image={member.profileImageUrl?.trim() || CHARACTER_FALLBACK_IMAGE}
            nickname={member.nickname ?? ""}
            hasDeparted={member.departed}
            elapsedMinutes={
              member.departedAt ? getElapsedMinutes(member.departedAt) : 0
            }
            isArrived={member.arrived}
          />
        );
      })}
    </div>
  );
};
