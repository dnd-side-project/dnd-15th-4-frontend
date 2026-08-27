"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DateFilterModal } from "@/components/common/DateFilterModal";
import { MyPageListHeader } from "@/components/mypage/MyPageListHeader";
import { PuzzleMeetingDetailModal } from "@/components/mypage/PuzzleMeetingDetailModal";
import { useDateFilter } from "@/hooks/mypage/useDateFilter";
import { usePuzzlesQuery } from "@/hooks/mypage/usePuzzles";
import { isSameDay } from "@/utils/date";
import type { CollectedPuzzle } from "@/types/user";

interface PuzzleImage {
  key: string;
  imageUrl: string;
  title: string;
  meetingId: number;
  indexInMeeting: number;
}

interface SelectedPuzzle {
  puzzle: CollectedPuzzle;
  initialIndex: number;
}

const PuzzlesPage = () => {
  const router = useRouter();
  const [selectedPuzzle, setSelectedPuzzle] = useState<SelectedPuzzle | null>(
    null
  );

  const { data } = usePuzzlesQuery();
  const puzzles = useMemo(() => data ?? [], [data]);

  const {
    sortOrder,
    handleToggleSortOrder,
    filterDate,
    setFilterDate,
    isDateFilterOpen,
    setIsDateFilterOpen,
    filteredItems: sortedPuzzles,
  } = useDateFilter(puzzles, (puzzle) => puzzle.meetingAt);

  const puzzleImages: PuzzleImage[] = useMemo(
    () =>
      sortedPuzzles.flatMap((puzzle) => {
        const images = puzzle.puzzleImageUrls.map((imageUrl, index) => ({
          key: `${puzzle.meetingId}-${index}`,
          imageUrl,
          title: puzzle.title,
          meetingId: puzzle.meetingId,
          indexInMeeting: index,
        }));

        return sortOrder === "latest" ? images.toReversed() : images;
      }),
    [sortedPuzzles, sortOrder]
  );

  const handleSelectImage = (puzzleImage: PuzzleImage) => {
    const puzzle = puzzles.find(
      (item) => item.meetingId === puzzleImage.meetingId
    );
    if (!puzzle) return;

    setSelectedPuzzle({ puzzle, initialIndex: puzzleImage.indexInMeeting });
  };

  return (
    <div className="h-screen scrollbar-none overflow-y-auto pb-12">
      <MyPageListHeader
        title="모은 퍼즐"
        onBack={() => router.back()}
        resultCount={puzzleImages.length}
        sortOrder={sortOrder}
        onToggleSort={handleToggleSortOrder}
        onCalendarClick={() => setIsDateFilterOpen(true)}
        isFiltered={filterDate !== null}
        onResetFilter={() => setFilterDate(null)}
      />
      <div className="grid grid-cols-3 gap-x-1 gap-y-2">
        {puzzleImages.map((puzzleImage) => (
          <button
            key={puzzleImage.key}
            type="button"
            onClick={() => handleSelectImage(puzzleImage)}
            className="relative aspect-square overflow-hidden bg-white"
          >
            <Image
              src={puzzleImage.imageUrl}
              alt={puzzleImage.title}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {selectedPuzzle && (
        <PuzzleMeetingDetailModal
          key={selectedPuzzle.puzzle.meetingId}
          open
          onOpenChange={(open) => !open && setSelectedPuzzle(null)}
          puzzle={selectedPuzzle.puzzle}
          initialIndex={selectedPuzzle.initialIndex}
        />
      )}

      {isDateFilterOpen && (
        <DateFilterModal
          initialDate={filterDate}
          hasEventOnDate={(date) =>
            puzzles.some((puzzle) =>
              isSameDay(new Date(puzzle.meetingAt), date)
            )
          }
          onSelectDate={setFilterDate}
          onClose={() => setIsDateFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default PuzzlesPage;
