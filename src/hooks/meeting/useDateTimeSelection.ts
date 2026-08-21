"use client";

import { useState } from "react";

export type DateTimeSelectionStep = "closed" | "date" | "time";

export interface UseDateTimeSelectionResult {
  step: DateTimeSelectionStep;
  dateTime: Date | null;
  pendingDate: Date | null;
  open: () => void;
  close: () => void;
  handleDateConfirm: (date: Date) => void;
  handleTimeConfirm: (hour: number, minute: number) => void;
  backToDate: () => void;
}

export const useDateTimeSelection = (): UseDateTimeSelectionResult => {
  const [step, setStep] = useState<DateTimeSelectionStep>("closed");
  const [pendingDate, setPendingDate] = useState<Date | null>(null);
  const [dateTime, setDateTime] = useState<Date | null>(null);

  const open = () => setStep("date");
  const close = () => setStep("closed");
  const backToDate = () => setStep("date");

  const handleDateConfirm = (date: Date) => {
    setPendingDate(date);
    setStep("time");
  };

  const handleTimeConfirm = (hour: number, minute: number) => {
    if (!pendingDate) return;
    const combined = new Date(pendingDate);
    combined.setHours(hour, minute, 0, 0);
    setDateTime(combined);
    setStep("closed");
  };

  return {
    step,
    dateTime,
    pendingDate,
    open,
    close,
    handleDateConfirm,
    handleTimeConfirm,
    backToDate,
  };
};
