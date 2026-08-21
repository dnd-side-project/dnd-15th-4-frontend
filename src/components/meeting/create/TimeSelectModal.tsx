"use client";

import { useState } from "react";

import { AlertModal } from "@/components/common/AlertModal";
import { Button } from "@/components/common/Button";
import { WheelPicker } from "@/components/common/WheelPicker";
import type { MeetingData } from "@/types/meeting";
import {
  formatMeetingDateTime,
  hasTimeConflict,
  to12Hour,
  to24Hour,
  type MeridiemPeriod,
} from "@/utils/date";

export interface TimeSelectModalProps {
  date: Date;
  meetings: MeetingData[];
  initialHour?: number;
  initialMinute?: number;
  onConfirm: (hour: number, minute: number) => void;
  onClose: () => void;
}

const PERIOD_ITEMS: MeridiemPeriod[] = ["오전", "오후"];
const HOUR_ITEMS = Array.from({ length: 12 }, (_, index) => String(index + 1));
const MINUTE_ITEMS = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, "0")
);

export const TimeSelectModal = ({
  date,
  meetings,
  initialHour,
  initialMinute,
  onConfirm,
  onClose,
}: TimeSelectModalProps) => {
  const initial = to12Hour(initialHour ?? new Date().getHours());

  const [period, setPeriod] = useState<MeridiemPeriod>(initial.period);
  const [hour12, setHour12] = useState(initial.hour12);
  const [minute, setMinute] = useState(initialMinute ?? 0);
  const [showConflictWarning, setShowConflictWarning] = useState(false);

  const handleConfirm = () => {
    const hour24 = to24Hour(period, hour12);

    if (hasTimeConflict(meetings, date, hour24, minute)) {
      setShowConflictWarning(true);
      return;
    }

    onConfirm(hour24, minute);
  };

  return (
    <div
      data-testid="time-select-modal"
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col justify-end"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/63 backdrop-blur-[2px]"
      />

      <div className="rounded-t-20 relative z-10 flex flex-col bg-white px-4 pt-3 pb-8">
        <div className="rounded-pill bg-border-1 mx-auto mb-5 h-1 w-9" />

        <h2 className="h3 text-primary mb-6 text-center">약속 시간</h2>

        <div className="relative flex items-center justify-center">
          <div className="bg-primary-light-hover rounded-16 pointer-events-none absolute inset-x-0 top-1/2 h-11 -translate-y-1/2" />

          <WheelPicker
            items={PERIOD_ITEMS}
            initialIndex={PERIOD_ITEMS.indexOf(period)}
            onChange={(index) => setPeriod(PERIOD_ITEMS[index])}
            className="flex-1"
          />
          <WheelPicker
            items={HOUR_ITEMS}
            initialIndex={hour12 - 1}
            onChange={(index) => setHour12(index + 1)}
            className="flex-1"
          />
          <WheelPicker
            items={MINUTE_ITEMS}
            initialIndex={minute}
            onChange={setMinute}
            className="flex-1"
          />
        </div>

        <Button
          type="button"
          size="cta"
          className="bg-sub2-normal hover:bg-sub2-normal-hover mt-6"
          onClick={handleConfirm}
        >
          확인
        </Button>
      </div>

      {showConflictWarning && (
        <AlertModal
          message={`이미 같은 시간에 등록된 약속이 있어요.\n${formatMeetingDateTime(date.toISOString()).dateFormatted} ${
            to12Hour(to24Hour(period, hour12)).period
          } ${hour12}:${String(minute).padStart(2, "0")}`}
          onConfirm={() => setShowConflictWarning(false)}
        />
      )}
    </div>
  );
};
