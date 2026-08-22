"use client";

import { useState } from "react";

import { ImageDetailModal } from "@/components/meeting/completed/ImageDetailModal";
import { MeetingResultTabSection } from "@/components/meeting/completed/MeetingResultTabSection";
import { PuzzleResultSection } from "@/components/meeting/completed/PuzzleResultSection";
import { MOCK_MEETING_RESULT } from "@/mocks/mockMeetings";
import type { MeetingPuzzleGroup } from "@/types/meeting";

const MeetingCompletedPage = () => {
  const [selectedPuzzleGroup, setSelectedPuzzleGroup] =
    useState<MeetingPuzzleGroup | null>(null);

  return (
    <div className="h-screen [scrollbar-width:none] overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <PuzzleResultSection
        puzzleGroups={MOCK_MEETING_RESULT.puzzleGroups ?? []}
        onGoHome={() => window.location.replace("/")}
        onViewDetail={setSelectedPuzzleGroup}
      />
      <MeetingResultTabSection
        rankings={MOCK_MEETING_RESULT.rankings}
        myDepartedAt={MOCK_MEETING_RESULT.myDepartedAt}
        puzzleFeed={MOCK_MEETING_RESULT.puzzleFeed}
      />

      {selectedPuzzleGroup && (
        <ImageDetailModal
          open
          onOpenChange={(open) => !open && setSelectedPuzzleGroup(null)}
          images={[
            {
              imageUrl: selectedPuzzleGroup.puzzleImageUrl,
              alt: `퍼즐 세트 ${selectedPuzzleGroup.pageNumber}`,
            },
          ]}
        />
      )}
    </div>
  );
};

export default MeetingCompletedPage;
