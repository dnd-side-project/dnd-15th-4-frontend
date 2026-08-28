"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { DotIndicator } from "@/components/meeting/progress/PuzzleSetIndicator";
import { useCarouselPage } from "@/hooks/common/useCarouselPage";

export interface OnboardingSlide {
  title: ReactNode;
  image: StaticImageData;
}

interface OnboardingCarouselProps {
  slides: OnboardingSlide[];
}

export const OnboardingCarousel = ({ slides }: OnboardingCarouselProps) => {
  const { containerRef, currentPage, handleScroll } = useCarouselPage(
    slides.length
  );

  return (
    <div className="flex flex-col overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory scrollbar-none overflow-x-auto"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex w-full shrink-0 snap-center flex-col items-center overflow-hidden"
          >
            <p className="px-4 text-center text-[22px] font-semibold">
              {slide.title}
            </p>
            <Image
              src={slide.image}
              alt=""
              className="rounded-20 mx-auto mt-6 h-auto w-full max-w-98.25 object-cover"
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
