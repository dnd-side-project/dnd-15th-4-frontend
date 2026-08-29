import Image from "next/image";

import { CORNER_ROUNDING, QUADRANT_OFFSET_CLASS } from "./PuzzleEtaCard";
import type { PuzzleEtaCardPosition } from "./PuzzleEtaCard";
import puzzle from "@/assets/images/puzzle.png";
import { cn } from "@/lib/utils";

const TEXT_COLOR_CLASS: Record<PuzzleEtaCardPosition, string> = {
  "top-left": "text-primary-normal",
  "top-right": "text-sub1-normal",
  "bottom-left": "text-point-darker",
  "bottom-right": "text-point-normal-active",
};

export interface PuzzleEtaEmptyCardProps {
  position: PuzzleEtaCardPosition;
  backgroundClassName: string;
  puzzleImageUrl?: string;
  isRevealed?: boolean;
}

export const PuzzleEtaEmptyCard = ({
  position,
  backgroundClassName,
  puzzleImageUrl,
  isRevealed = false,
}: PuzzleEtaEmptyCardProps) => {
  if (isRevealed && puzzleImageUrl) {
    return (
      <div
        className={cn(
          "relative size-full overflow-hidden bg-black",
          CORNER_ROUNDING[position]
        )}
      >
        <div
          className={cn(
            "absolute size-[200%]",
            QUADRANT_OFFSET_CLASS[position]
          )}
        >
          <Image
            src={puzzleImageUrl}
            alt=""
            fill
            className="bg-white object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex size-full flex-col items-center justify-center gap-2.5 overflow-hidden p-3",
        CORNER_ROUNDING[position],
        backgroundClassName
      )}
    >
      <div className="relative size-10.5 overflow-hidden">
        <Image
          src={puzzle}
          alt="퍼즐 아이콘"
          width={42}
          height={42}
          className={cn(
            "absolute max-w-none opacity-20",
            position === "bottom-left"
              ? "mix-blend-soft-light"
              : "mix-blend-hard-light"
          )}
        />
      </div>
      <p className={cn("body6 text-center", TEXT_COLOR_CLASS[position])}>
        도착하면
        <br />
        퍼즐이 공개돼요
      </p>
    </div>
  );
};
