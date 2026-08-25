"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/common/Button";
import { MonthCalendar } from "@/components/common/MonthCalendar";
import { ScheduleCard } from "@/components/common/ScheduleCard";
import { cn } from "@/lib/utils";
import type { MeetingData } from "@/types/meeting";
import { getMeetingsOnDate, isPastDay } from "@/utils/date";

export interface DateSelectModalProps {
  initialDate?: Date | null;
  meetings: MeetingData[];
  onConfirm: (date: Date) => void;
  onClose: () => void;
}

export const DateSelectModal = ({
  initialDate,
  meetings,
  onConfirm,
  onClose,
}: DateSelectModalProps) => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate ?? today);

  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const meetingsOnSelectedDate = getMeetingsOnDate(meetings, selectedDate);

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
    setActiveCardIndex(0);
  };

  const handleScheduleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    if (el.clientWidth === 0) return;
    setActiveCardIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleConfirm = () => {
    onConfirm(selectedDate);
  };

  return (
    <div
      data-testid="date-select-modal"
      aria-label="날짜 선택"
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col justify-end"
    >
      <button
        data-testid="data-select-backdrop"
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/63 backdrop-blur-[2px]"
      />

      <div className="relative flex flex-col">
        {meetingsOnSelectedDate.length > 0 && (
          <div className="relative z-10 mb-3 w-full min-w-0 px-4">
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-element-interactions */}
            <section
              ref={scrollRef}
              aria-label="일정 목록 카드"
              onScroll={handleScheduleScroll}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={cn(
                "flex scrollbar-none gap-3 overflow-x-auto select-none [webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden",
                !isDragging && "snap-x snap-mandatory",
                isDragging ? "cursor-grabbing" : "cursor-grab"
              )}
            >
              {meetingsOnSelectedDate.map((meeting) => (
                <div
                  key={meeting.meetingId}
                  className="w-full shrink-0 snap-center"
                >
                  <ScheduleCard meeting={meeting} />
                </div>
              ))}
            </section>

            {meetingsOnSelectedDate.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-1.5">
                {meetingsOnSelectedDate.map((meeting, index) => (
                  <span
                    key={meeting.meetingId}
                    className={cn(
                      "rounded-pill h-1.5 transition-all",
                      index === activeCardIndex
                        ? "w-3 bg-white"
                        : "bg-sub2-light-active w-1.5"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="rounded-t-20 relative z-10 flex flex-col bg-white px-4 pt-3 pb-3">
          <div className="rounded-pill bg-border-1 mx-auto mb-5 h-1 w-9" />

          <MonthCalendar
            viewYear={viewYear}
            viewMonth={viewMonth}
            selectedDate={selectedDate}
            today={today}
            onSelectDate={handleSelectDate}
            onPrevMonth={goToPrevMonth}
            onNextMonth={goToNextMonth}
            hasEventOnDate={(date) =>
              getMeetingsOnDate(meetings, date).length > 0
            }
            isDateDisabled={(date) => isPastDay(date, today)}
          />

          <Button
            type="button"
            className="bg-sub2-normal hover:bg-sub2-normal-hover mt-6"
            onClick={handleConfirm}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};
