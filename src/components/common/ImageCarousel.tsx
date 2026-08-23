"use client";

import Image from "next/image";
import { useEffect } from "react";

import { IcArrowBack } from "@/components/icons";
import { PuzzleSetIndicator } from "@/components/meeting/progress/PuzzleSetIndicator";
import { useCarouselPage } from "@/hooks/common/useCarouselPage";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  imageUrl: string;
  alt?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  initialIndex?: number;
  onPageChange?: (index: number) => void;
  className?: string;
}

export const ImageCarousel = ({
  images,
  initialIndex = 0,
  onPageChange,
  className,
}: ImageCarouselProps) => {
  const { containerRef, currentPage, handleScroll, goToPage } = useCarouselPage(
    images.length,
    initialIndex
  );
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  return (
    <div className={cn("flex w-full flex-col items-center gap-3", className)}>
      <div className="relative w-full">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="rounded-20 bg-surface-1 flex w-full snap-x snap-mandatory scrollbar-none overflow-x-auto"
        >
          {images.map((image, index) => (
            <div
              key={`${image.imageUrl}-${index}`}
              className="relative aspect-square w-full shrink-0 snap-center overflow-hidden"
            >
              <Image
                src={image.imageUrl}
                alt={image.alt ?? ""}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              aria-label="이전 이미지"
              className="rounded-pill bg-title/40 text-surface-1 absolute top-1/2 left-2 flex size-8 -translate-y-1/2 items-center justify-center disabled:opacity-40"
            >
              <IcArrowBack size={20} />
            </button>
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === images.length - 1}
              aria-label="다음 이미지"
              className="rounded-pill bg-title/40 text-surface-1 absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center disabled:opacity-40"
            >
              <IcArrowBack size={20} className="rotate-180" />
            </button>
          </>
        )}
      </div>
      <PuzzleSetIndicator
        pageCount={Math.max(images.length, 1)}
        currentPage={currentPage}
        className={cn(images.length <= 1 && "invisible")}
      />
    </div>
  );
};
