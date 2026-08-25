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
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col justify-end"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/63 backdrop-blur-[2px]"
      />

      <div className="rounded-t-20 relative z-10 flex min-h-[60dvh] flex-col justify-between bg-white px-5 pt-3 pb-3 shadow-xl">
        <div className="rounded-pill bg-border-1 mx-auto mb-5 h-1 w-9" />

        <h2 className="h3 text-primary mb-6 text-center">참여 인원</h2>

        <div className="relative my-6 flex items-center justify-center">
          <div className="bg-primary-light-hover rounded-16 pointer-events-none absolute inset-x-0 top-1/2 h-11 -translate-y-1/2" />

          <WheelPicker
            items={items}
            initialIndex={pendingValue - min}
            onChange={(index) => setPendingValue(min + index)}
          />
        </div>

        <Button type="button" onClick={() => onConfirm(pendingValue)}>
          확인
        </Button>
      </div>
    </div>
  );
};
