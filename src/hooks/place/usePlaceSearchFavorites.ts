"use client";

import { useSyncExternalStore } from "react";

import type { PlaceDto } from "@/types/place";

const STORAGE_KEY = "placeSearchFavorites";
export const MAX_FAVORITE_PLACE_COUNT = 5;

const isPlaceDtoArray = (value: unknown): value is PlaceDto[] =>
  Array.isArray(value) &&
  value.every((item) => typeof item?.placeId === "string");

const readStoredFavorites = (): PlaceDto[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed: unknown = JSON.parse(stored);
    if (isPlaceDtoArray(parsed)) return parsed;
  } catch {
    // 손상된 데이터는 무시하고 아래에서 초기화
  }

  localStorage.removeItem(STORAGE_KEY);
  return [];
};

let favorites: PlaceDto[] = readStoredFavorites();
const listeners = new Set<() => void>();

const persist = (next: PlaceDto[]) => {
  favorites = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => favorites;
const getServerSnapshot = (): PlaceDto[] => [];

export const usePlaceSearchFavorites = () => {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const isFavorite = (placeId: string) =>
    favorites.some((item) => item.placeId === placeId);

  const addFavorite = (place: PlaceDto) => {
    if (favorites.some((item) => item.placeId === place.placeId)) return;
    persist([place, ...favorites]);
  };

  const removeFavorite = (placeId: string) => {
    persist(favorites.filter((item) => item.placeId !== placeId));
  };

  return { favorites, isFavorite, addFavorite, removeFavorite };
};
