"use client";

import { PuzzleResultSection } from "@/components/meeting/PuzzleResultSection";
import { MOCK_MEETING_RESULT } from "@/mocks/mockMeetings";

const MeetingCompletedPage = () => {
  return (
    <PuzzleResultSection
      puzzleGroups={MOCK_MEETING_RESULT.puzzleGroups ?? []}
      onGoHome={() => window.location.replace("/")}
    />
  );
};

export default MeetingCompletedPage;
