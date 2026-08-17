import { MOCK_MEETINGS } from "@/mocks/mockMeetings";
import type { MeetingData } from "@/types/meeting";

/**
 * 약속 목록 조회 API가 아직 배포되지 않아서 임시 mock 데이터를 반환합니다.
 * 실제 엔드포인트가 배포되면 이 함수 내부만 http-client 요청으로 교체하면 됩니다.
 */

export const fetchMeetings = async (): Promise<MeetingData[]> => MOCK_MEETINGS;
