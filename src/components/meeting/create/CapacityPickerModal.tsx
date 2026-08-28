"use client";

import { useState } from "react";

import { Drawer } from "@base-ui/react/drawer";

import { BottomSheet } from "@/components/common/BottomSheet";
import { Button } from "@/components/common/Button";
import { WheelPicker } from "@/components/common/WheelPicker";
import { MIN_MEETING_CAPACITY } from "@/constants/validation";

export interface CapacityPickerModalProps {
  value: number | null;
  min?: number;
  max?: number;
  onConfirm: (value: number) => void;
  onClose: () => void;
}

export const CapacityPickerModal = ({
  value,
  min = MIN_MEETING_CAPACITY,
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
    <BottomSheet
      open
      onOpenChange={(open) => !open && onClose()}
      backdropTestId="capacity-picker-backdrop"
      className="px-5 pb-3"
    >
      <Drawer.Title className="sr-only">참여 인원 선택</Drawer.Title>

      <h2 className="h3 text-primary mb-6 text-center">참여 인원</h2>

      <div className="relative my-6 flex items-center justify-center">
        <div className="bg-primary-light-hover rounded-16 pointer-events-none absolute inset-x-0 top-1/2 h-11 -translate-y-1/2" />

        <WheelPicker
          items={items}
          initialIndex={pendingValue - min}
          onChange={(index) => setPendingValue(min + index)}
        />
      </div>

      <Button
        type="button"
        className="mt-6"
        onClick={() => onConfirm(pendingValue)}
      >
        확인
      </Button>
    </BottomSheet>
  );
};
