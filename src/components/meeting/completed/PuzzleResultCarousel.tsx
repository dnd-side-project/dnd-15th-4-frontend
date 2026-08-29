import Image from "next/image";
import { useEffect } from "react";

import { useCenteredCarouselIndex } from "@/hooks/common/useCenteredCarouselIndex";
import { cn } from "@/lib/utils";
import type { MeetingResultPuzzlePage } from "@/types/meeting";

export interface PuzzleResultCarouselProps {
  puzzleFeed: MeetingResultPuzzlePage[];
  onCenteredIndexChange?: (index: number) => void;
  isAllFailed?: boolean;
}

const PIECE_CORNER_CLASS: Record<number, string> = {
  1: "rounded-tl-20",
  2: "rounded-tr-20",
  3: "rounded-bl-20",
  4: "rounded-br-20",
};

const PIECE_BORDER_SIDE_CLASS: Record<number, string> = {
  1: "border-t-2 border-l-2",
  2: "border-t-2 border-r-2",
  3: "border-b-2 border-l-2",
  4: "border-b-2 border-r-2",
};

const PIECE_IMAGE_OFFSET_CLASS: Record<number, string> = {
  1: "top-0 left-0",
  2: "top-0 -left-full",
  3: "-top-full left-0",
  4: "-top-full -left-full",
};

export const PuzzleResultCarousel = ({
  puzzleFeed,
  onCenteredIndexChange,
  isAllFailed = false,
}: PuzzleResultCarouselProps) => {
  const { containerRef, setItemRef, centeredIndex } = useCenteredCarouselIndex(
    puzzleFeed.length
  );

  useEffect(() => {
    onCenteredIndexChange?.(centeredIndex);
  }, [centeredIndex, onCenteredIndexChange]);

  return (
    <div
      ref={containerRef}
      className="flex w-full snap-x snap-mandatory [scrollbar-width:none] items-center gap-2 overflow-x-auto px-[calc(50%-7.4375rem)] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {puzzleFeed.map((puzzlePage, index) => {
        const pieceByIndex = new Map(
          puzzlePage.pieces.map((piece) => [piece.pieceIndex, piece])
        );
        const isCentered = index === centeredIndex;

        return (
          <div
            key={puzzlePage.puzzlePageId}
            ref={setItemRef(index)}
            className={cn(
              "rounded-20 grid shrink-0 snap-center grid-cols-2 grid-rows-2 overflow-hidden",
              isCentered ? "size-59.5 opacity-100" : "size-48.25 opacity-[0.57]"
            )}
          >
            {[1, 2, 3, 4].map((pieceIndex) => {
              const isRevealed =
                puzzlePage.completed ||
                (pieceByIndex.get(pieceIndex)?.success ?? false);

              return (
                <div
                  key={pieceIndex}
                  className={cn(
                    "relative overflow-hidden",
                    PIECE_CORNER_CLASS[pieceIndex],
                    isRevealed
                      ? "bg-sub2-light-hover"
                      : isAllFailed
                        ? "bg-sub2-light-active/16"
                        : "bg-point-normal"
                  )}
                >
                  {isRevealed ? (
                    <div
                      className={cn(
                        "absolute size-[200%]",
                        PIECE_IMAGE_OFFSET_CLASS[pieceIndex]
                      )}
                    >
                      <Image
                        src={puzzlePage.imageUrl}
                        alt={`퍼즐 세트 ${puzzlePage.puzzlePageId} 조각 ${pieceIndex}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center border-dashed",
                        isAllFailed ? "border-white" : "border-point-dark",
                        PIECE_CORNER_CLASS[pieceIndex],
                        PIECE_BORDER_SIDE_CLASS[pieceIndex]
                      )}
                    >
                      <span
                        className={cn(
                          "h1",
                          isAllFailed ? "text-white/24" : "text-point-dark"
                        )}
                      >
                        ?
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
