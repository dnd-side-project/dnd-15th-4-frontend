"use client";

import { PuzzleEtaGrid } from "./PuzzleEtaGrid";
import { DotIndicator } from "@/components/common/DotIndicator";
import { useCarouselPage } from "@/hooks/common/useCarouselPage";
import type { MeetingPuzzleGroup } from "@/types/meeting";

export interface PuzzleEtaCarouselProps {
  puzzleGroups: MeetingPuzzleGroup[];
}

export const PuzzleEtaCarousel = ({ puzzleGroups }: PuzzleEtaCarouselProps) => {
  const { containerRef, currentPage, handleScroll } = useCarouselPage(
    puzzleGroups.length
  );

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="mb-12 flex w-full snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {puzzleGroups.map((group) => (
          <div
            key={group.puzzleGroupId}
            className="w-full shrink-0 snap-center"
          >
            <PuzzleEtaGrid members={group.members} />
          </div>
        ))}
      </div>

      {puzzleGroups.length > 1 && (
        <DotIndicator
          pageCount={puzzleGroups.length}
          currentPage={currentPage}
          className="absolute inset-x-0 top-full mt-4"
        />
      )}
    </div>
  );
};
