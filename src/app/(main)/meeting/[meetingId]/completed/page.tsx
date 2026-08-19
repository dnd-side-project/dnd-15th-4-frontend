"use client";

import { MeetingResultTabSection } from "@/components/meeting/MeetingResultTabSection";
import { PuzzleResultSection } from "@/components/meeting/PuzzleResultSection";
import { MOCK_MEETING_RESULT } from "@/mocks/mockMeetings";

const MeetingCompletedPage = () => {
  return (
    <div className="h-screen [scrollbar-width:none] overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <PuzzleResultSection
        puzzleGroups={MOCK_MEETING_RESULT.puzzleGroups ?? []}
        onGoHome={() => window.location.replace("/")}
      />
      <MeetingResultTabSection
        rankings={MOCK_MEETING_RESULT.rankings}
        myDepartedAt={MOCK_MEETING_RESULT.myDepartedAt}
        puzzleFeed={MOCK_MEETING_RESULT.puzzleFeed}
      />
    </div>
  );
};

export default MeetingCompletedPage;
