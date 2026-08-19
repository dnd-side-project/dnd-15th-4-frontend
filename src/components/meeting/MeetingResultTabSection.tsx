"use client";

import { useState } from "react";

import { MeetingArrivalPanel } from "./MeetingArrivalPanel";
import { MeetingPuzzleFeedPanel } from "./MeetingPuzzleFeedPanel";
import { TabMenu } from "@/components/common/TabMenu";
import type {
  CompletedPuzzleFeedItem,
  MeetingRankingItem,
} from "@/types/meeting";

interface MeetingResultTabSectionProps {
  rankings: MeetingRankingItem[];
  myDepartedAt: string | null;
  puzzleFeed: CompletedPuzzleFeedItem[];
}

type ResultTab = "left" | "right";

export const MeetingResultTabSection = ({
  rankings,
  myDepartedAt,
  puzzleFeed,
}: MeetingResultTabSectionProps) => {
  const [selectedTab, setSelectedTab] = useState<ResultTab>("left");

  return (
    <div className="flex w-full flex-col pt-6">
      <TabMenu
        leftLabel="도착정보"
        rightLabel="퍼즐 피드"
        selectedTab={selectedTab}
        onLeftClick={() => setSelectedTab("left")}
        onRightClick={() => setSelectedTab("right")}
      />
      <div className="pt-6">
        {selectedTab === "left" ? (
          <MeetingArrivalPanel
            rankings={rankings}
            myDepartedAt={myDepartedAt}
          />
        ) : (
          <MeetingPuzzleFeedPanel puzzleFeed={puzzleFeed} />
        )}
      </div>
    </div>
  );
};
