"use client";

import { IcArrowBack } from "@/components/icons";
import { cn } from "@/lib/utils";
import { getMonthWeeks, isSameDay } from "@/utils/date";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

interface MonthCalendarProps {
  viewYear: number;
  viewMonth: number;
  selectedDate: Date;
  today?: Date;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  hasEventOnDate?: (date: Date) => boolean;
  isDateDisabled?: (date: Date) => boolean;
  className?: string;
}

export const MonthCalendar = ({
  viewYear,
  viewMonth,
  selectedDate,
  today = new Date(),
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  hasEventOnDate,
  isDateDisabled,
  className,
}: MonthCalendarProps) => {
  const weeks = getMonthWeeks(viewYear, viewMonth);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="mb-6 flex items-center justify-between px-4">
        <button type="button" onClick={onPrevMonth} aria-label="이전 달">
          <IcArrowBack size={24} className="text-primary" />
        </button>
        <div className="h3 text-primary font-semibold">
          {viewYear}년 {viewMonth + 1}월
        </div>
        <button type="button" onClick={onNextMonth} aria-label="다음 달">
          <IcArrowBack size={24} className="text-primary rotate-180" />
        </button>
      </div>

      <div className="grid grid-cols-7 pb-2">
        {WEEKDAY_LABELS.map((label, index) => (
          <span
            key={label}
            className={cn(
              "body7 text-center",
              index === 0 && "text-red-500",
              index === 6 && "text-primary-normal",
              index !== 0 && index !== 6 && "text-primary"
            )}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((date, dayIndex) => {
              if (!date) return <div key={dayIndex} />;

              const hasEvent = hasEventOnDate?.(date) ?? false;
              const isSelected = isSameDay(date, selectedDate);
              const isToday = isSameDay(date, today);
              const disabled = isDateDisabled?.(date) ?? false;

              return (
                <button
                  key={dayIndex}
                  type="button"
                  disabled={disabled}
                  aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일${isSelected ? ", 선택됨" : ""}`}
                  onClick={() => onSelectDate(date)}
                  className="flex flex-col items-center gap-1 py-1.5 disabled:opacity-30"
                >
                  <span
                    className={cn(
                      "body2 rounded-4 flex size-8 items-center justify-center transition-colors",
                      isSelected && "bg-primary-normal-hover text-white p-2",
                      !isSelected && isToday && "text-primary font-bold",
                      !isSelected &&
                        !isToday &&
                        dayIndex === 0 &&
                        "text-red-500",
                      !isSelected &&
                        !isToday &&
                        dayIndex === 6 &&
                        "text-primary-normal",
                      !isSelected &&
                        !isToday &&
                        dayIndex !== 0 &&
                        dayIndex !== 6 &&
                        "text-primary"
                    )}
                  >
                    {date.getDate()}
                  </span>
                  <span
                    className={cn(
                      "rounded-pill size-1",
                      hasEvent ? "bg-surface-5" : "bg-transparent"
                    )}
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
