"use client";

import { useSyncExternalStore } from "react";

import type { MeetingDepartureInfo } from "@/types/meeting";

const STORAGE_KEY = "meetingDepartureInfo";

type DepartureStore = Record<number, MeetingDepartureInfo>;

const isDepartureInfo = (value: unknown): value is MeetingDepartureInfo => {
  if (typeof value !== "object" || value === null) return false;
  const info = value as Record<string, unknown>;

  return (
    typeof info.meetingId === "number" &&
    typeof info.departedAt === "string" &&
    typeof info.origin === "object" &&
    info.origin !== null &&
    typeof info.route === "object" &&
    info.route !== null
  );
};

const isDepartureStore = (value: unknown): value is DepartureStore =>
  typeof value === "object" &&
  value !== null &&
  Object.values(value as Record<string, unknown>).every(isDepartureInfo);

const readStoredDepartures = (): DepartureStore => {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};

  try {
    const parsed: unknown = JSON.parse(stored);
    if (isDepartureStore(parsed)) return parsed;
  } catch {
    // 손상된 데이터는 무시하고 아래에서 초기화
  }

  localStorage.removeItem(STORAGE_KEY);
  return {};
};

let departures: DepartureStore = readStoredDepartures();
const listeners = new Set<() => void>();

const persist = (next: DepartureStore) => {
  departures = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => departures;

const EMPTY_DEPARTURES: DepartureStore = {};
const getServerSnapshot = (): DepartureStore => EMPTY_DEPARTURES;

export const useMeetingDeparture = () => {
  const departures = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const getDeparture = (meetingId: number): MeetingDepartureInfo | null =>
    departures[meetingId] ?? null;

  const setDeparture = (info: MeetingDepartureInfo) => {
    persist({ ...departures, [info.meetingId]: info });
  };

  const clearDeparture = (meetingId: number) => {
    const { [meetingId]: _removed, ...rest } = departures;
    persist(rest);
  };

  return { getDeparture, setDeparture, clearDeparture };
};
