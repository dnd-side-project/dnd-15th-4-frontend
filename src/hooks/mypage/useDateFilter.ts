"use client";

import { useMemo, useState } from "react";

import type { SortOrder } from "@/components/mypage/SortToggleButton";
import { isSameDay } from "@/utils/date";

export const useDateFilter = <T>(items: T[], getDate: (item: T) => string) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

  const handleToggleSortOrder = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };

  const filteredItems = useMemo(() => {
    const direction = sortOrder === "latest" ? -1 : 1;
    return items
      .filter(
        (item) => !filterDate || isSameDay(new Date(getDate(item)), filterDate)
      )
      .sort(
        (a, b) =>
          direction *
          (new Date(getDate(a)).getTime() - new Date(getDate(b)).getTime())
      );
  }, [items, getDate, sortOrder, filterDate]);

  return {
    sortOrder,
    handleToggleSortOrder,
    filterDate,
    setFilterDate,
    isDateFilterOpen,
    setIsDateFilterOpen,
    filteredItems,
  };
};
