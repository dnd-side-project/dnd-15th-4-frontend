"use client";

import { useState } from "react";

export interface UseCapacitySelectionResult {
  capacity: number | null;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  handleConfirm: (value: number) => void;
}

export const useCapacitySelection = (): UseCapacitySelectionResult => {
  const [capacity, setCapacity] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleConfirm = (value: number) => {
    setCapacity(value);
    setIsOpen(false);
  };

  return { capacity, isOpen, open, close, handleConfirm };
};
