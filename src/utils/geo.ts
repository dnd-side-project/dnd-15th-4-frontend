import type { MeetingLocation, UserLocation } from "@/types/meeting";

const EARTH_RADIUS_METERS = 6371000;

export const ARRIVAL_DISTANCE_THRESHOLD_METERS = 20;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export const getDistanceInMeters = (
  from: UserLocation,
  to: UserLocation
): number => {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }

  const dLat = toRadians(to.latitude - from.latitude);
  const dLng = toRadians(to.longitude - from.longitude);
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);

  const a = Math.min(
    1,
    Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  );

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(EARTH_RADIUS_METERS * c);
};

// 두 좌표 사이의 거리를 하버사인 공식으로 계산해 미터 단위로 반환
export const getMeetingDistanceInMeters = (
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
