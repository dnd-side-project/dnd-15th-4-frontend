"use client";

import Image from "next/image";
import { useEffect } from "react";

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
  const { containerRef, currentPage, handleScroll } = useCarouselPage(
    images.length,
    initialIndex
  );

  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  return (
    <div className={cn("flex w-full flex-col items-center gap-3", className)}>
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
      <PuzzleSetIndicator
        pageCount={Math.max(images.length, 1)}
        currentPage={currentPage}
        className={cn(images.length <= 1 && "invisible")}
      />
    </div>
  );
};
