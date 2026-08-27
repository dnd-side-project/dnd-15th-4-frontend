"use client";

import { useState } from "react";

import { MeetingArrivalPanel } from "./MeetingArrivalPanel";
import { MeetingPuzzleFeedPanel } from "./MeetingPuzzleFeedPanel";
import { TabMenu } from "@/components/common/TabMenu";
import { cn } from "@/lib/utils";
import type {
  MeetingData,
  MeetingRankingItem,
  MeetingUnselectedImage,
} from "@/types/meeting";

interface MeetingResultTabSectionProps {
  rankings: MeetingRankingItem[];
  myDepartedAt: string | null;
  unselectedImages: MeetingUnselectedImage[];
  meeting?: MeetingData;
  className?: string;
}

type ResultTab = "left" | "right";

export const MeetingResultTabSection = ({
  rankings,
  myDepartedAt,
  unselectedImages,
  meeting,
  className,
}: MeetingResultTabSectionProps) => {
  const [selectedTab, setSelectedTab] = useState<ResultTab>("left");

  return (
    <div className={cn("flex w-full flex-col overflow-hidden", className)}>
      <TabMenu
        leftLabel="도착정보"
        rightLabel="퍼즐 피드"
        selectedTab={selectedTab}
        onLeftClick={() => setSelectedTab("left")}
        onRightClick={() => setSelectedTab("right")}
        className="shrink-0 pt-6"
      />
      <div className="min-h-0 flex-1 scrollbar-none overflow-y-auto pt-6">
        {selectedTab === "left" ? (
          <MeetingArrivalPanel
            rankings={rankings}
            myDepartedAt={myDepartedAt}
            meeting={meeting}
          />
        ) : (
          <MeetingPuzzleFeedPanel unselectedImages={unselectedImages} />
        )}
      </div>
    </div>
  );
};
