"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { DotIndicator } from "@/components/meeting/progress/PuzzleSetIndicator";
import { useCarouselPage } from "@/hooks/common/useCarouselPage";

export interface OnboardingSlide {
  title: ReactNode;
  image: StaticImageData;
  imageWidth: number;
  imageHeight: number;
}

interface OnboardingCarouselProps {
  slides: OnboardingSlide[];
}

const IMAGE_TOP_OFFSET_PX = 62;

export const OnboardingCarousel = ({ slides }: OnboardingCarouselProps) => {
  const { containerRef, currentPage, handleScroll } = useCarouselPage(
    slides.length
  );

  const trackHeight = Math.max(
    ...slides.map((slide) => IMAGE_TOP_OFFSET_PX + slide.imageHeight)
  );

  return (
    <div className="flex flex-col overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: trackHeight }}
        className="flex snap-x snap-mandatory scrollbar-none overflow-x-auto"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full shrink-0 snap-center overflow-hidden"
          >
            <p className="h1 absolute inset-x-0 top-17.75 z-10 px-4 text-center">
              {slide.title}
            </p>
            <div
              className="rounded-20 absolute inset-x-0 -top-15.5 mx-auto overflow-hidden"
              style={{ width: slide.imageWidth, height: slide.imageHeight }}
            >
              <Image src={slide.image} alt="" fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>
      <DotIndicator
        pageCount={slides.length}
        currentPage={currentPage}
        className="pb-7.25"
      />
    </div>
  );
};
