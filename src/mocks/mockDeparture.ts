import type { TravelRouteOption } from "@/types/meeting";

export const MOCK_TRAVEL_ROUTES: TravelRouteOption[] = [
  {
    routeId: "route-1",
    durationMinutes: 63,
    isFastest: true,
    segments: [
      { type: "WALK", label: "서울 미래구 상상로 404, 드림타워1203호" },
      { type: "SUBWAY", label: "태릉입구역 6호선 승차" },
      { type: "SUBWAY", label: "성수역 하차" },
      { type: "WALK", label: "성수역 상상대로 아웅이 카페" },
    ],
  },
  {
    routeId: "route-2",
    durationMinutes: 68,
    isFastest: false,
    segments: [
      { type: "WALK", label: "서울 미래구 상상로 404, 드림타워1203호" },
      { type: "BUS", label: "상상초등학교 정류장 승차" },
      { type: "SUBWAY", label: "성수역 하차" },
      { type: "WALK", label: "성수역 상상대로 아웅이 카페" },
    ],
  },
  {
    routeId: "route-3",
    durationMinutes: 71,
    isFastest: false,
    segments: [
      { type: "WALK", label: "서울 미래구 상상로 404, 드림타워1203호" },
      { type: "SUBWAY", label: "태릉입구역 7호선 승차" },
      { type: "SUBWAY", label: "뚝섬역 하차" },
      { type: "WALK", label: "성수역 상상대로 아웅이 카페" },
    ],
  },
  {
    routeId: "route-4",
    durationMinutes: 74,
    isFastest: false,
    segments: [
      { type: "WALK", label: "서울 미래구 상상로 404, 드림타워1203호" },
      { type: "BUS", label: "상상사거리 정류장 승차" },
      { type: "BUS", label: "성수사거리 정류장 하차" },
      { type: "WALK", label: "성수역 상상대로 아웅이 카페" },
    ],
  },
  {
    routeId: "route-5",
    durationMinutes: 77,
    isFastest: false,
    segments: [
      { type: "WALK", label: "서울 미래구 상상로 404, 드림타워1203호" },
      { type: "SUBWAY", label: "태릉입구역 6호선 승차" },
      { type: "SUBWAY", label: "왕십리역 환승" },
      { type: "WALK", label: "성수역 상상대로 아웅이 카페" },
    ],
  },
  {
    routeId: "route-6",
    durationMinutes: 79,
    isFastest: false,
    segments: [
      { type: "WALK", label: "서울 미래구 상상로 404, 드림타워1203호" },
      { type: "BUS", label: "상상초등학교 정류장 승차" },
      { type: "BUS", label: "뚝섬유원지 정류장 하차" },
      { type: "WALK", label: "성수역 상상대로 아웅이 카페" },
    ],
  },
  {
    routeId: "route-7",
    durationMinutes: 82,
    isFastest: false,
    segments: [
      { type: "WALK", label: "서울 미래구 상상로 404, 드림타워1203호" },
      { type: "SUBWAY", label: "태릉입구역 6호선 승차" },
      { type: "SUBWAY", label: "건대입구역 환승" },
      { type: "WALK", label: "성수역 상상대로 아웅이 카페" },
    ],
  },
  {
    routeId: "route-8",
    durationMinutes: 85,
    isFastest: false,
    segments: [
      { type: "WALK", label: "서울 미래구 상상로 404, 드림타워1203호" },
      { type: "BUS", label: "상상사거리 정류장 승차" },
      { type: "SUBWAY", label: "성수역 하차" },
      { type: "WALK", label: "성수역 상상대로 아웅이 카페" },
    ],
  },
];
