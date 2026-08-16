import { MOCK_PARTICIPANT_LOCATIONS } from "@/mocks/mockParticipantLocations";
import type { UserLocation } from "@/types/meeting";

export interface ParticipantLocationDto extends UserLocation {
  userId: number;
}

/**
 * 참여자 위치 조회 API가 아직 배포되지 않아서 임시로 mock 데이터를 반환합니다.
 * 실제 엔드포인트가 배포되면 이 함수 내부만 http-client 요청으로 교체하면 됩니다.
 */

export const fetchParticipantLocations = async (
  participantIds: number[]
): Promise<ParticipantLocationDto[]> =>
  participantIds.flatMap((userId) => {
    const location = MOCK_PARTICIPANT_LOCATIONS[userId];
    return location ? [{ userId, ...location.currentLocation }] : [];
  });
