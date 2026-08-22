"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/common/Header";
import {
  SortToggleButton,
  type SortOrder,
} from "@/components/mypage/SortToggleButton";
import { PuzzleMeetingDetailModal } from "@/components/mypage/PuzzleMeetingDetailModal";
import { MOCK_PUZZLES } from "@/mocks/mockUser";
import { IcCalendarMonth } from "@/components/icons";
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
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [selectedPuzzle, setSelectedPuzzle] = useState<SelectedPuzzle | null>(
    null
  );

  const handleToggleSortOrder = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };

  const sortedPuzzles = useMemo(() => {
    const direction = sortOrder === "latest" ? -1 : 1;
    return [...MOCK_PUZZLES].sort(
      (a, b) =>
        direction *
        (new Date(a.meetingAt).getTime() - new Date(b.meetingAt).getTime())
    );
  }, [sortOrder]);

  const puzzleImages: PuzzleImage[] = useMemo(
    () =>
      sortedPuzzles.flatMap((puzzle) =>
        puzzle.puzzleImageUrls.map((imageUrl, index) => ({
          key: `${puzzle.meetingId}-${index}`,
          imageUrl,
          title: puzzle.title,
          meetingId: puzzle.meetingId,
          indexInMeeting: index,
        }))
      ),
    [sortedPuzzles]
  );

  const handleSelectImage = (puzzleImage: PuzzleImage) => {
    const puzzle = MOCK_PUZZLES.find(
      (item) => item.meetingId === puzzleImage.meetingId
    );
    if (!puzzle) return;

    setSelectedPuzzle({ puzzle, initialIndex: puzzleImage.indexInMeeting });
  };

  return (
    <div className="h-screen scrollbar-none overflow-y-auto pb-12">
      <Header
        title="모은 퍼즐"
        onBack={() => router.back()}
        className="bg-bg-normal sticky top-0 z-10"
      />
      <div className="mt-5.5 mb-4 flex justify-between px-4">
        <div className="flex items-center gap-2">
          <p className="body8 text-disable">결과 {puzzleImages.length}개</p>
          <SortToggleButton
            sortOrder={sortOrder}
            onToggle={handleToggleSortOrder}
          />
        </div>
        <button type="button">
          <IcCalendarMonth size={24} />
        </button>
      </div>
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
    </div>
  );
};

export default PuzzlesPage;
