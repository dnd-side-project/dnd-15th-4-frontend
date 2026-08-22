"use client";

import { PuzzleEtaGrid } from "./PuzzleEtaGrid";
import { DotIndicator } from "@/components/common/DotIndicator";
import { useCarouselPage } from "@/hooks/common/useCarouselPage";
import { groupBy } from "@/utils/array";
import type { MeetingLocation, MeetingParticipant } from "@/types/meeting";

export interface PuzzleEtaCarouselProps {
  participants: MeetingParticipant[];
  meetingPlaceLocation: MeetingLocation;
}

export const PuzzleEtaCarousel = ({
  participants,
  meetingPlaceLocation,
}: PuzzleEtaCarouselProps) => {
  const pages = groupBy(
    participants,
    (participant) => participant.puzzlePosition.set
  );
  const { containerRef, currentPage, handleScroll } = useCarouselPage(
    pages.length
  );

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="mb-12 flex w-full snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((pageParticipants, index) => (
          <div key={index} className="w-full shrink-0 snap-center">
            <PuzzleEtaGrid
              participants={pageParticipants}
              meetingPlaceLocation={meetingPlaceLocation}
            />
          </div>
        ))}
      </div>

      {pages.length > 1 && (
        <DotIndicator
          pageCount={pages.length}
          currentPage={currentPage}
          className="absolute inset-x-0 top-full mt-4"
        />
      )}
    </div>
  );
};
