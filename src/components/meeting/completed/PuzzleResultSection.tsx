"use client";

import { useState } from "react";

import { IconActionHeader } from "@/components/common/IconActionHeader";
import { PuzzleResultCarousel } from "./PuzzleResultCarousel";
import { DotIndicator } from "@/components/common/DotIndicator";
import { IcArrowBack, IcHome } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { MeetingResultPuzzlePage } from "@/types/meeting";

export interface PuzzleResultSectionProps {
  puzzleFeed: MeetingResultPuzzlePage[];
  onIconClick: () => void;
  onViewDetail?: (puzzlePage: MeetingResultPuzzlePage) => void;
  meetingDateLabel?: string;
  isHistoryView?: boolean;
}

export const PuzzleResultSection = ({
  puzzleFeed,
  onIconClick,
  onViewDetail,
  meetingDateLabel,
  isHistoryView = false,
}: PuzzleResultSectionProps) => {
  const [centeredIndex, setCenteredIndex] = useState(0);
  const completedCount = puzzleFeed.filter((page) => page.completed).length;
  const isAllFailed = completedCount === 0;
  const centeredPage = puzzleFeed[centeredIndex];
  const isCenteredPageCompleted = centeredPage?.completed ?? false;

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col pb-5.75",
        isAllFailed ? "bg-sub2-normal" : "bg-point-normal"
      )}
    >
      <IconActionHeader
        icon={
          isHistoryView ? (
            <IcArrowBack
              size={24}
              className={isAllFailed ? "text-white" : undefined}
            />
          ) : (
            <IcHome
              size={24}
              className={isAllFailed ? "text-white" : undefined}
            />
          )
        }
        iconAriaLabel={isHistoryView ? "뒤로 가기" : "홈으로 이동"}
        onIconClick={onIconClick}
        detailText={isCenteredPageCompleted ? "자세히 보기" : undefined}
        onDetailClick={() => centeredPage && onViewDetail?.(centeredPage)}
        className="mb-3"
      />
      <PuzzleResultCarousel
        puzzleFeed={puzzleFeed}
        onCenteredIndexChange={setCenteredIndex}
        isAllFailed={isAllFailed}
      />
      <p
        className={cn(
          "h1 mt-3.75 text-center tracking-[-0.02em]",
          isAllFailed ? "text-white" : "text-primary"
        )}
      >
        {meetingDateLabel ? (
          <>
            <span className={isAllFailed ? "text-red" : "text-primary-normal"}>
              {meetingDateLabel}
            </span>
            에 맞춘 퍼즐
          </>
        ) : isAllFailed ? (
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
      <DotIndicator
        pageCount={Math.max(puzzleFeed.length, 1)}
        currentPage={centeredIndex}
        className={cn("mt-6", puzzleFeed.length <= 1 && "invisible")}
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
