"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const ITEM_HEIGHT = 44;
const VISIBLE_ROWS = 5;
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
  const initialIndexRef = useRef(initialIndex);

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: initialIndexRef.current * ITEM_HEIGHT,
    });
  }, []);

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
    <div
      ref={containerRef}
      className={cn(
        "relative h-55 snap-y snap-mandatory overflow-y-scroll overscroll-contain scrollbar-none [&::-webkit-scrollbar]:hidden",
        className
      )}
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
              "h1 text-primary flex w-full snap-center items-center justify-center transition-opacity",
              distance === 0 && "font-semibold opacity-100",
              distance === 1 && "opacity-40",
              distance >= 2 && "opacity-15"
            )}
          >
            {item}
          </button>
        );
      })}
      <div style={{ height: PADDING_Y }} aria-hidden />
    </div>
  );
};
