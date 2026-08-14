import type { MeetingData } from "@/types/meeting";

export const MOCK_MEETINGS: MeetingData[] = [
  {
    meetingId: 1,
    title: "한강 피크닉 및 치맥 모임",
    dateTime: "2026-08-15T15:00:00",
    place: "서울 여의도 한강공원 이벤트 광장",
    latitude: 37.5283,
    longitude: 126.932,
    participants: [
      { id: 1, name: "소정", profileImageNumber: 3 },
      { id: 2, name: "민지", profileImageNumber: 5 },
      { id: 3, name: "현우", profileImageNumber: 1 },
      { id: 4, name: "예린", profileImageNumber: 2 },
    ],
  },
  {
    meetingId: 2,
    title: "퍼즐밋 4차 디자이너-개발자 커피챗",
    dateTime: "2026-08-20T19:00:00",
    place: "강남역 카페 알베르",
    latitude: 37.5008,
    longitude: 127.0279,
    participants: [
      { id: 1, name: "소정", profileImageNumber: 3 },
      { id: 5, name: "준혁", profileImageNumber: 4 },
    ],
  },
  {
    meetingId: 3,
    title: "주말 성수동 보드게임 모임",
    dateTime: "2026-08-23T14:30:00",
    place: "성수동 히어로보드게임카페",
    latitude: 37.5445,
    longitude: 127.0557,
    participants: [
      { id: 2, name: "민지", profileImageNumber: 5 },
      { id: 3, name: "현우", profileImageNumber: 1 },
      { id: 6, name: "지현", profileImageNumber: 6 },
    ],
  },
];
