import type { UserLocation } from "@/types/meeting";

interface MockParticipantLocation {
  currentLocation: UserLocation;
  totalDistance: number;
}

// 목적지 예시: 서울 여의도 한강공원 (37.5283, 126.932) 기준 좌표
export const MOCK_PARTICIPANT_LOCATIONS: Record<
  number,
  MockParticipantLocation
> = {
  1: {
    currentLocation: { latitude: 37.5283, longitude: 126.932 },
    totalDistance: 1000,
  }, // 소정 - 도착
  2: {
    currentLocation: { latitude: 37.5253, longitude: 126.932 },
    totalDistance: 1000,
  }, // 민지 - 약 333m 남음
  3: {
    currentLocation: { latitude: 37.5223, longitude: 126.932 },
    totalDistance: 1000,
  }, // 현우 - 약 667m 남음
  4: {
    currentLocation: { latitude: 37.5193, longitude: 126.932 },
    totalDistance: 1000,
  }, // 예린 - 출발 직후

  // 출발 전
  // 5: {
  //   currentLocation: { latitude: 37.5193, longitude: 126.932 },
  //   totalDistance: 1000,
  // },
};
