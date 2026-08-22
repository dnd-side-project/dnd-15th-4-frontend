"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "placeSearchFavorites";
const MAX_ITEMS = 8;

export const usePlaceSearchFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const addFavorite = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    setFavorites((prev) => {
      const next = [trimmed, ...prev.filter((item) => item !== trimmed)].slice(
        0,
        MAX_ITEMS
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const removeFavorite = (keyword: string) => {
    setFavorites((prev) => {
      const next = prev.filter((item) => item !== keyword);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { favorites, addFavorite, removeFavorite };
};
