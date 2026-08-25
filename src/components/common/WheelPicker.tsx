"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const ITEM_HEIGHT = 44;
const VISIBLE_ROWS = 7;
const PADDING_Y = (ITEM_HEIGHT * (VISIBLE_ROWS - 1)) / 2;
const SCROLL_SETTLE_MS = 120;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export interface WheelPickerProps {
  items: string[];
  initialIndex?: number;
  onChange: (index: number) => void;
  className?: string;
}

export const WheelPicker = ({
  items,
  initialIndex = 0,
  onChange,
  className,
}: WheelPickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const lastCommittedIndexRef = useRef(initialIndex);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = initialIndex * ITEM_HEIGHT;
    setSelectedIndex(initialIndex);
    lastCommittedIndexRef.current = initialIndex;
  }, [initialIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const nearestIndex = clamp(
        Math.round(container.scrollTop / ITEM_HEIGHT),
        0,
        items.length - 1
      );
      setSelectedIndex(nearestIndex);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (lastCommittedIndexRef.current !== nearestIndex) {
          lastCommittedIndexRef.current = nearestIndex;
          onChangeRef.current(nearestIndex);
        }
      }, SCROLL_SETTLE_MS);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [items.length]);

  const handleItemClick = (itemIndex: number) => {
    containerRef.current?.scrollTo({
      top: itemIndex * ITEM_HEIGHT,
      behavior: "smooth",
    });
    setSelectedIndex(itemIndex);
    lastCommittedIndexRef.current = itemIndex;
    onChangeRef.current(itemIndex);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className="bg-primary-light-hover rounded-16 pointer-events-none absolute top-1/2 right-0 left-0 z-0 -translate-y-1/2"
        style={{ height: ITEM_HEIGHT }}
      />

      <div
        ref={containerRef}
        className="relative z-10 h-77 snap-y snap-mandatory scrollbar-none overflow-y-scroll overscroll-contain [&::-webkit-scrollbar]:hidden"
      >
        <div style={{ height: PADDING_Y }} aria-hidden />
        {items.map((item, itemIndex) => {
          const distance = Math.abs(itemIndex - selectedIndex);
          return (
            <button
              key={`${item}-${itemIndex}`}
              type="button"
              onClick={() => handleItemClick(itemIndex)}
              style={{ height: ITEM_HEIGHT }}
              className={cn(
                "h1 text-primary flex w-full snap-center items-center justify-center transition-all duration-150",
                distance === 0 && "font-semibold opacity-100 scale-100",
                distance === 1 && "opacity-40 scale-95",
                distance >= 2 && "opacity-15 scale-90"
              )}
            >
              {item}
            </button>
          );
        })}
        <div style={{ height: PADDING_Y }} aria-hidden />
      </div>
    </div>
  );
};
