"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { DotIndicator } from "@/components/meeting/progress/PuzzleSetIndicator";
import { useCarouselPage } from "@/hooks/common/useCarouselPage";
import { useMouseDragScroll } from "@/hooks/common/useMouseDragScroll";
import { cn } from "@/lib/utils";

export interface OnboardingSlide {
  title: ReactNode;
  image: StaticImageData;
}

interface OnboardingCarouselProps {
  slides: OnboardingSlide[];
}

export const OnboardingCarousel = ({ slides }: OnboardingCarouselProps) => {
  const { containerRef, currentPage, handleScroll, goToPage } = useCarouselPage(
    slides.length
  );
  const { isDragging, isSnapDisabled, dragHandlers } = useMouseDragScroll({
    containerRef,
    goToPage,
  });

  return (
    <div className="flex min-h-0 flex-col overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        {...dragHandlers}
        className={cn(
          "flex min-h-0 scrollbar-none cursor-grab overflow-x-auto",
          isSnapDisabled ? "snap-none" : "snap-x snap-mandatory",
          isDragging && "cursor-grabbing select-none"
        )}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex w-full shrink-0 snap-center flex-col items-center overflow-hidden"
          >
            <p className="mt-15 shrink-0 px-4 text-center text-[22px] font-semibold">
              {slide.title}
            </p>
            <Image
              src={slide.image}
              alt=""
              draggable={false}
              className="rounded-20 mt-6 aspect-[590/644] h-auto min-h-0 w-auto max-w-full [contain:size] [contain-intrinsic-size:28rem_30.5625rem]"
            />
          </div>
        ))}
      </div>
      <DotIndicator
        pageCount={slides.length}
        currentPage={currentPage}
        className="mt-7.5 pb-7.25"
      />
    </div>
  );
};
