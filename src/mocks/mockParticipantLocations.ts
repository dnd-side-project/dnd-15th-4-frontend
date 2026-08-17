import type { UserLocation } from "@/types/meeting";

interface MockParticipantLocation {
  currentLocation: UserLocation;
  totalDistance: number;
}

// meetingId별 목적지 기준 좌표에 맞춰 참여자 위치를 스코핑합니다.
export const MOCK_PARTICIPANT_LOCATIONS: Record<
  number,
  Record<number, MockParticipantLocation>
> = {
  // meetingId 1 - 목적지: 서울 여의도 한강공원 (37.5283, 126.932)
  1: {
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
  },
  // meetingId 2 - 목적지: 강남역 카페 알베르 (37.5008, 127.0279)
  2: {
    1: {
      currentLocation: { latitude: 37.5008, longitude: 127.0279 },
      totalDistance: 1000,
    }, // 소정 - 도착
    5: {
      currentLocation: { latitude: 37.4978, longitude: 127.0279 },
      totalDistance: 1000,
    }, // 준혁 - 약 333m 남음
  },
  // meetingId 3 - 목적지: 성수동 히어로보드게임카페 (37.5445, 127.0557)
  3: {
    2: {
      currentLocation: { latitude: 37.5445, longitude: 127.0557 },
      totalDistance: 1000,
    }, // 민지 - 도착
    3: {
      currentLocation: { latitude: 37.5415, longitude: 127.0557 },
      totalDistance: 1000,
    }, // 현우 - 약 333m 남음
    6: {
      currentLocation: { latitude: 37.5385, longitude: 127.0557 },
      totalDistance: 1000,
    }, // 지현 - 약 667m 남음
  },
};
