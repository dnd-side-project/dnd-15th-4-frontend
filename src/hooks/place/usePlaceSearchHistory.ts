"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "recentPlaceSearches";
const MAX_ITEMS = 8;

export const usePlaceSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const addHistory = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    setHistory((prev) => {
      const next = [trimmed, ...prev.filter((item) => item !== trimmed)].slice(
        0,
        MAX_ITEMS
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, addHistory, clearHistory };
};
