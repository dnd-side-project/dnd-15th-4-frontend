import type { User, CollectedPuzzle } from "@/types/user";
import type { PlaceDto } from "@/types/place";

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

export const MOCK_FAVORITE_PLACES: PlaceDto[] = [
  {
    placeId: "27483921",
    placeName: "사당역 4번 출구",
    addressName: "서울 동작구 사당동",
    roadAddressName: "서울 동작구 동작대로 3",
    latitude: 37.476559,
    longitude: 126.981762,
  },
  {
    placeId: "17561621",
    placeName: "강남역 11번 출구",
    addressName: "서울 강남구 역삼동",
    roadAddressName: "서울 강남구 강남대로 396",
    latitude: 37.498004,
    longitude: 127.02761,
  },
  {
    placeId: "13457521",
    placeName: "여의도 한강공원",
    addressName: "서울 영등포구 여의동",
    roadAddressName: "서울 영등포구 여의동로 330",
    latitude: 37.528354,
    longitude: 126.933642,
  },
];
