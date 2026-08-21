"use client";

import { useState } from "react";

import { Button } from "@/components/common/Button";
import { WheelPicker } from "@/components/common/WheelPicker";

export interface CapacityPickerModalProps {
  value: number | null;
  min?: number;
  max?: number;
  onConfirm: (value: number) => void;
  onClose: () => void;
}

export const CapacityPickerModal = ({
  value,
  min = 1,
  max = 12,
  onConfirm,
  onClose,
}: CapacityPickerModalProps) => {
  const handleClose = onClose;

  const items = Array.from({ length: max - min + 1 }, (_, index) =>
    String(min + index)
  );

  const initialValue = value ?? min;
  const [pendingValue, setPendingValue] = useState(
    Math.min(Math.max(initialValue, min), max)
  );

  return (
    <div
      data-testid="capacity-picker-modal"
      aria-label="참여 인원 선택"
      className="fixed inset-0 z-60 mx-auto w-full max-w-md"
    >
      <button
        data-testid="capacity-picker-backdrop"
        type="button"
        aria-label="닫기"
        onClick={handleClose}
        className="absolute inset-0 bg-black/63 backdrop-blur-[2px]"
      />

      <div className="rounded-tl-20 rounded-tr-20 absolute inset-x-0 bottom-0 flex flex-col gap-6 bg-white pt-3 pb-8">
        <div className="bg-border-1 rounded-pill mx-auto h-1 w-18" />

        <div className="h3 text-primary text-center font-semibold">
          참여 인원
        </div>

        <div className="relative flex items-center justify-center">
          <div className="bg-primary-light-hover rounded-16 pointer-events-none absolute inset-x-0 top-1/2 h-11 -translate-y-1/2" />
          <WheelPicker
            items={items}
            initialIndex={pendingValue - min}
            onChange={(index) => setPendingValue(min + index)}
          />
        </div>

        <div className="px-4">
          <Button
            type="button"
            size="cta"
            className="bg-sub2-normal hover:bg-sub2-normal-hover"
            onClick={() => onConfirm(pendingValue)}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};
