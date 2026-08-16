import { getIsoStringMinutesAgo } from "@/lib/date";
import type {
  MeetingData,
  MeetingParticipantsDto,
  MeetingSummary,
} from "@/types/meeting";

export const MOCK_MEETINGS: MeetingData[] = [
  {
    meetingId: 1,
    title: "한강 피크닉 및 치맥 모임",
    dateTime: "2026-08-15T15:00:00+09:00",
    place: "서울 여의도 한강공원 이벤트 광장",
    latitude: 37.5283,
    longitude: 126.932,
    participants: [
      { id: 1, name: "소정", profileImageNumber: 3 },
      { id: 2, name: "민지", profileImageNumber: 5 },
      { id: 3, name: "현우", profileImageNumber: 1 },
      { id: 4, name: "예린", profileImageNumber: 2 },
    ],
    status: "IN_PROGRESS",
  },
  {
    meetingId: 2,
    title: "퍼즐밋 4차 디자이너-개발자 커피챗",
    dateTime: "2026-08-20T19:00:00+09:00",
    place: "강남역 카페 알베르",
    latitude: 37.5008,
    longitude: 127.0279,
    participants: [
      { id: 1, name: "소정", profileImageNumber: 3 },
      { id: 5, name: "준혁", profileImageNumber: 4 },
    ],
    status: "WAITING",
  },
  {
    meetingId: 3,
    title: "주말 성수동 보드게임 모임",
    dateTime: "2026-08-23T14:30:00+09:00",
    place: "성수동 히어로보드게임카페",
    latitude: 37.5445,
    longitude: 127.0557,
    participants: [
      { id: 2, name: "민지", profileImageNumber: 5 },
      { id: 3, name: "현우", profileImageNumber: 1 },
      { id: 6, name: "지현", profileImageNumber: 6 },
    ],
    status: "WAITING",
  },
];

export const mockMeetingSummary: MeetingSummary = {
  meetingId: 1,
  title: "한강 피크닉",
  dateTime: "2026-08-17T00:00:00",
  place: "서울 여의도 한강공원",
  latitude: 37.5283,
  longitude: 126.932,
  status: "IN_PROGRESS",
  participants: [
    {
      id: 1,
      name: "이주빈",
      profileImageUrl: "",
    },
  ],
};

export const mockMeetingParticipants: MeetingParticipantsDto = {
  meetingId: 1,
  participants: [
    {
      id: 1,
      nickname: "이주빈",
      profileImageNumber: 1,
      currentLocation: {
        latitude: 37.5445,
        longitude: 127.0559,
      },
      estimatedArrivalTime: 20,
      departureTime: getIsoStringMinutesAgo(1),
      arrivalStatus: false,
      puzzlePosition: {
        set: 1,
        number: 1,
        puzzleImageUrl: "",
      },
    },
    {
      id: 2,
      nickname: "조희우",
      profileImageNumber: 2,
      currentLocation: {
        latitude: 37.5172,
        longitude: 127.0473,
      },
      estimatedArrivalTime: 118,
      departureTime: getIsoStringMinutesAgo(1),
      arrivalStatus: false,
      puzzlePosition: {
        set: 1,
        number: 2,
        puzzleImageUrl: "",
      },
    },
    {
      id: 3,
      nickname: "윤나경",
      profileImageNumber: 3,
      currentLocation: {
        latitude: 37.2635,
        longitude: 127.0447,
      },
      estimatedArrivalTime: 118,
      departureTime: getIsoStringMinutesAgo(1),
      arrivalStatus: false,
      puzzlePosition: {
        set: 1,
        number: 3,
        puzzleImageUrl: "",
      },
    },
    {
      id: 4,
      nickname: "권소영",
      profileImageNumber: 4,
      currentLocation: {
        latitude: 37.5403,
        longitude: 127.07,
      },
      estimatedArrivalTime: 118,
      departureTime: getIsoStringMinutesAgo(30),
      arrivalStatus: true,
      puzzlePosition: {
        set: 1,
        number: 4,
        puzzleImageUrl: "",
      },
    },
    {
      id: 5,
      nickname: "이소정",
      profileImageNumber: 5,
      currentLocation: {
        latitude: 37.6,
        longitude: 127.2,
      },
      estimatedArrivalTime: 120,
      departureTime: getIsoStringMinutesAgo(30),
      arrivalStatus: false,
      puzzlePosition: {
        set: 2,
        number: 1,
        puzzleImageUrl: "",
      },
    },
    {
      id: 6,
      nickname: "진효창",
      profileImageNumber: 6,
      currentLocation: {
        latitude: 37.7,
        longitude: 127.25,
      },
      estimatedArrivalTime: 120,
      departureTime: getIsoStringMinutesAgo(30),
      arrivalStatus: false,
      puzzlePosition: {
        set: 2,
        number: 2,
        puzzleImageUrl: "",
      },
    },
    {
      id: 7,
      nickname: "김지각",
      profileImageNumber: 7,
      currentLocation: {
        latitude: 36.7,
        longitude: 126.25,
      },
      estimatedArrivalTime: 120,
      departureTime: getIsoStringMinutesAgo(30),
      arrivalStatus: false,
      puzzlePosition: {
        set: 2,
        number: 3,
        puzzleImageUrl: "",
      },
    },
  ],
};
