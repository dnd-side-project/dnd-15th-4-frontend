"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { ErrorScreen } from "@/components/common/ErrorScreen";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { ImageDetailModal } from "@/components/meeting/completed/ImageDetailModal";
import { MeetingResultTabSection } from "@/components/meeting/completed/MeetingResultTabSection";
import { PuzzleResultSection } from "@/components/meeting/completed/PuzzleResultSection";
import { useMeetingDetailQuery } from "@/hooks/meeting/detail/useMeetingDetail";
import { useMeetingResultQuery } from "@/hooks/meeting/completed/useMeetingResult";
import { formatDotDate } from "@/utils/date";
import type { MeetingResultPuzzlePage } from "@/types/meeting";

const MeetingCompletedPage = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const numericMeetingId = Number(meetingId);
  const isHistoryView = searchParams.get("view") === "history";

  const {
    data: result,
    isPending: isResultPending,
    isError: isResultError,
    refetch: refetchResult,
  } = useMeetingResultQuery(numericMeetingId);
  const { data: meetingDetail } = useMeetingDetailQuery(
    numericMeetingId,
    isHistoryView
  );

  const [selectedPuzzlePage, setSelectedPuzzlePage] =
    useState<MeetingResultPuzzlePage | null>(null);

  if (isResultPending) {
    return <LoadingScreen />;
  }

  if (isResultError && !result) {
    return (
      <ErrorScreen
        title={"약속 결과를\n불러오지 못했어요"}
        onRetry={() => refetchResult()}
      />
    );
  }

  const puzzleFeed = result?.puzzleFeed ?? [];
  const unselectedImages = result?.unselectedImages ?? [];
  const rankings = result?.rankings ?? [];
  const myDepartedAt = result?.myDepartedAt ?? null;

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <PuzzleResultSection
        puzzleFeed={puzzleFeed}
        onIconClick={
          isHistoryView
            ? () => router.back()
            : () => window.location.replace("/")
        }
        onViewDetail={setSelectedPuzzlePage}
        meetingDateLabel={
          isHistoryView && meetingDetail
            ? formatDotDate(meetingDetail.dateTime)
            : undefined
        }
        isHistoryView={isHistoryView}
      />
      <MeetingResultTabSection
        rankings={rankings}
        myDepartedAt={myDepartedAt}
        unselectedImages={unselectedImages}
        meeting={isHistoryView ? meetingDetail : undefined}
        className="min-h-0 flex-1"
      />

      {selectedPuzzlePage && (
        <ImageDetailModal
          open
          onOpenChange={(open) => !open && setSelectedPuzzlePage(null)}
          images={[
            {
              imageUrl: selectedPuzzlePage.imageUrl,
              alt: `퍼즐 세트 ${selectedPuzzlePage.puzzlePageId}`,
            },
          ]}
        />
      )}
    </div>
  );
};

export default MeetingCompletedPage;
