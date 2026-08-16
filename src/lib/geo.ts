import type { MeetingLocation } from "@/types/meeting";

const EARTH_RADIUS_METERS = 6_371_000;

export const ARRIVAL_DISTANCE_THRESHOLD_METERS = 20;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

// 두 좌표 사이의 거리를 하버사인 공식으로 계산해 미터 단위로 반환
export const getDistanceInMeters = (
  from: MeetingLocation,
  to: MeetingLocation
): number => {
  const deltaLatitude = toRadians(to.latitude - from.latitude);
  const deltaLongitude = toRadians(to.longitude - from.longitude);

  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(deltaLongitude / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
};
