"use client";

import { useState } from "react";

import { Drawer } from "@base-ui/react/drawer";

import { AlertModal } from "@/components/common/AlertModal";
import { BottomSheet } from "@/components/common/BottomSheet";
import { Button } from "@/components/common/Button";
import { WheelPicker } from "@/components/common/WheelPicker";
import type { MeetingData } from "@/types/meeting";
import {
  formatMeetingDateTime,
  hasTimeConflict,
  MIN_LEAD_TIME_MINUTES,
  to12Hour,
  to24Hour,
  validateSelectedDateTime,
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
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleConfirm = () => {
    const hour24 = to24Hour(period, hour12);

    const validation = validateSelectedDateTime(date, hour24, minute);
    if (validation === "past") {
      setAlertMessage("이미 지난 날짜와 시간이에요.\n다시 선택해주세요.");
      return;
    }
    if (validation === "too-soon") {
      setAlertMessage(
        `지금으로부터 최소 ${MIN_LEAD_TIME_MINUTES}분 이후로\n선택해주세요.`
      );
      return;
    }

    if (hasTimeConflict(meetings, date, hour24, minute)) {
      setAlertMessage(
        `이미 같은 시간에 등록된 약속이 있어요.\n${formatMeetingDateTime(date.toISOString()).dateFormatted} ${
          to12Hour(to24Hour(period, hour12)).period
        } ${hour12}:${String(minute).padStart(2, "0")}`
      );
      return;
    }

    onConfirm(hour24, minute);
  };

  return (
    <>
      <BottomSheet
        open
        onOpenChange={(open) => !open && onClose()}
        className="px-5 pb-3"
      >
        <Drawer.Title className="sr-only">약속 시간 선택</Drawer.Title>

        <h2 className="h3 text-primary mb-3 text-center">약속 시간</h2>

        <div className="relative my-3 flex items-center justify-center">
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

        <Button type="button" className="mt-6" onClick={handleConfirm}>
          확인
        </Button>
      </BottomSheet>

      {alertMessage && (
        <AlertModal
          message={alertMessage}
          onConfirm={() => setAlertMessage(null)}
        />
      )}
    </>
  );
};
