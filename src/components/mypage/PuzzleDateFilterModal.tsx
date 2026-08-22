"use client";

import { useState } from "react";

import { BottomSheet } from "@/components/common/BottomSheet";
import { MonthCalendar } from "@/components/common/MonthCalendar";
import { isSameDay } from "@/utils/date";
import type { CollectedPuzzle } from "@/types/user";

export interface PuzzleDateFilterModalProps {
  initialDate?: Date | null;
  puzzles: CollectedPuzzle[];
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

export const PuzzleDateFilterModal = ({
  initialDate,
  puzzles,
  onSelectDate,
  onClose,
}: PuzzleDateFilterModalProps) => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate ?? today);
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  const goToPrevMonth = () => {
    const prev = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(prev.getFullYear());
    setViewMonth(prev.getMonth());
  };

  const goToNextMonth = () => {
    const next = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
    onClose();
  };

  return (
    <BottomSheet
      open
      onOpenChange={(open) => !open && onClose()}
      modal
      backdropClassName="bg-black/63 backdrop-blur-[2px] z-10"
    >
      <div className="flex w-full flex-col px-4 pb-8">
        <MonthCalendar
          viewYear={viewYear}
          viewMonth={viewMonth}
          selectedDate={selectedDate}
          today={today}
          onSelectDate={handleSelectDate}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          hasEventOnDate={(date) =>
            puzzles.some((puzzle) =>
              isSameDay(new Date(puzzle.meetingAt), date)
            )
          }
        />
      </div>
    </BottomSheet>
  );
};
