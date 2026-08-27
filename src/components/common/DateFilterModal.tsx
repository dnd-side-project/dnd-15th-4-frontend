"use client";

import { useState } from "react";

import { BottomSheet } from "@/components/common/BottomSheet";
import { MonthCalendar } from "@/components/common/MonthCalendar";

export interface DateFilterModalProps {
  initialDate?: Date | null;
  hasEventOnDate?: (date: Date) => boolean;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

export const DateFilterModal = ({
  initialDate,
  hasEventOnDate,
  onSelectDate,
  onClose,
}: DateFilterModalProps) => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate ?? null
  );
  const [viewYear, setViewYear] = useState(
    (selectedDate ?? today).getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    (selectedDate ?? today).getMonth()
  );

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
      backdropClassName="bg-black/63 backdrop-blur-[2px]"
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
          hasEventOnDate={hasEventOnDate}
        />
      </div>
    </BottomSheet>
  );
};
