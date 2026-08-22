import type { User, CollectedPuzzle } from "@/types/user";

export const MOCK_USER: User = {
  id: 1,
  nickname: "윤나경",
  previousAppointmentCount: 5,
  profileImageNumber: 3,
  collectedPuzzleCount: 12,
  favoritePlaceCount: 8,
  kakaoId: "puzzlemeet@kakao.com",
  notificationSettings: {
    locationPermission: true,
    friendArrival: true,
    chatBubble: false,
  },
};

export const MOCK_PUZZLES: CollectedPuzzle[] = [
  {
    meetingId: 12,
    title: "한강 피크닉",
    meetingAt: "2026-08-15T14:00:00",
    destination: "서울 여의도 한강공원",
    puzzleImageUrls: ["/artwork-1.png", "/artwork-2.png"],
    rankings: [
      {
        userId: 1,
        nickname: "김나나",
        profileImageUrl: "/character-1.png",
        arrived: true,
        arrivedAt: "2026-08-15T13:50:00",
        earlyArrivalMinutes: 10,
        late: false,
      },
      {
        userId: 2,
        nickname: "김다다",
        profileImageUrl: "/character-2.png",
        arrived: true,
        arrivedAt: "2026-08-15T14:03:00",
        earlyArrivalMinutes: null,
        late: true,
      },
    ],
  },
  {
    meetingId: 10,
    title: "홍대 방탈출",
    meetingAt: "2026-08-10T18:00:00",
    destination: "서울 마포구 홍대입구역",
    puzzleImageUrls: ["/artwork-3.png"],
    rankings: [
      {
        userId: 1,
        nickname: "김나나",
        profileImageUrl: "/character-3.png",
        arrived: true,
        arrivedAt: "2026-08-10T17:55:00",
        earlyArrivalMinutes: 5,
        late: false,
      },
    ],
  },
];
