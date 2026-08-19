"use client";

import { useState } from "react";

import { Header } from "./Header";
import { PuzzleResultCarousel } from "./PuzzleResultCarousel";
import { PuzzleSetIndicator } from "./PuzzleSetIndicator";
import { IcHome } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { MeetingPuzzleGroup } from "@/types/meeting";

export interface PuzzleResultSectionProps {
  puzzleGroups: MeetingPuzzleGroup[];
  onGoHome: () => void;
  onViewDetail?: (puzzleGroup: MeetingPuzzleGroup) => void;
}

const isGroupCompleted = (group: MeetingPuzzleGroup) =>
  group.members.length > 0 && group.members.every((member) => member.revealed);

export const PuzzleResultSection = ({
  puzzleGroups,
  onGoHome,
  onViewDetail,
}: PuzzleResultSectionProps) => {
  const [centeredIndex, setCenteredIndex] = useState(0);
  const completedCount = puzzleGroups.filter(isGroupCompleted).length;
  const isAllFailed = completedCount === 0;
  const centeredGroup = puzzleGroups[centeredIndex];
  const isCenteredGroupCompleted = centeredGroup
    ? isGroupCompleted(centeredGroup)
    : false;

  return (
    <div
      className={cn(
        "flex flex-col pb-5.75",
        isAllFailed ? "bg-sub2-normal" : "bg-point-normal"
      )}
    >
      <Header
        icon={
          <IcHome
            size={24}
            className={isAllFailed ? "text-white" : undefined}
          />
        }
        iconAriaLabel="홈으로 이동"
        onIconClick={onGoHome}
        detailText={isCenteredGroupCompleted ? "자세히 보기" : undefined}
        onDetailClick={() => centeredGroup && onViewDetail?.(centeredGroup)}
        className="mb-3"
      />
      <PuzzleResultCarousel
        puzzleGroups={puzzleGroups}
        onCenteredIndexChange={setCenteredIndex}
        isAllFailed={isAllFailed}
      />
      <p
        className={cn(
          "h1 mt-3.75 text-center tracking-[-0.02em]",
          isAllFailed ? "text-white" : "text-primary"
        )}
      >
        {isAllFailed ? (
          <>
            약속퍼즐을 완성에 <span className="text-red">실패</span>했어요
          </>
        ) : (
          <>
            약속퍼즐{" "}
            <span className="text-primary-normal">{completedCount}개</span>가
            완성됐어요!
          </>
        )}
      </p>
      <PuzzleSetIndicator
        pageCount={Math.max(puzzleGroups.length, 1)}
        currentPage={centeredIndex}
        className={cn("mt-6", puzzleGroups.length <= 1 && "invisible")}
        activeDotClassName={
          isAllFailed ? "bg-surface-0 w-2.75" : "bg-point-dark-active w-2.75"
        }
        inactiveDotClassName={
          isAllFailed ? "bg-sub2-light-active" : "bg-point-normal-active"
        }
      />
    </div>
  );
};
