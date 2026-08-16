import type { UserLocation } from "@/types/meeting";
import { getDistanceInMeters } from "@/utils/geo";

const DEFAULT_OVERLAP_THRESHOLD_PERCENT = 7;
const ARRIVAL_RADIUS_METERS = 50;

export interface ParticipantProgressResult {
  percent: number;
  isArrived: boolean;
}

export const calculateParticipantProgress = (
  currentLocation: UserLocation,
  destination: UserLocation,
  totalDistance: number
): ParticipantProgressResult => {
  const remainingDistance = getDistanceInMeters(currentLocation, destination);

  const isArrived = remainingDistance <= ARRIVAL_RADIUS_METERS;

  if (isArrived) {
    return { percent: 100, isArrived: true };
  }

  const rawPercent =
    totalDistance > 0
      ? ((totalDistance - remainingDistance) / totalDistance) * 100
      : 100;

  const percent = Math.min(100, Math.max(0, rawPercent));

  return { percent, isArrived: false };
};

export interface ProgressMarker<T> {
  item: T;
  percent: number;
}

export interface ProgressMarkerGroup<T> {
  percent: number;
  items: T[];
}

export const groupOverlappingMarkers = <T>(
  markers: ProgressMarker<T>[],
  thresholdPercent = DEFAULT_OVERLAP_THRESHOLD_PERCENT
): ProgressMarkerGroup<T>[] => {
  if (markers.length === 0) return [];

  const sorted = [...markers].sort((a, b) => a.percent - b.percent);
  const groups: ProgressMarker<T>[][] = [];

  for (const marker of sorted) {
    const lastGroup = groups[groups.length - 1];
    const firstInGroup = lastGroup?.[0];

    if (
      firstInGroup &&
      marker.percent - firstInGroup.percent <= thresholdPercent
    ) {
      lastGroup.push(marker);
    } else {
      groups.push([marker]);
    }
  }

  return groups.map((group) => ({
    percent:
      group.reduce((sum, marker) => sum + marker.percent, 0) / group.length,
    items: group.map((marker) => marker.item),
  }));
};
