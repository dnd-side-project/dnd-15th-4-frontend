import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TravelRouteList } from "./TravelRouteList";
import { TravelRouteSummaryCard } from "./TravelRouteSummaryCard";
import type { TravelRouteOption } from "@/types/meeting";

const MOCK_ROUTES: TravelRouteOption[] = [
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
];

const Preview = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = MOCK_ROUTES.find((route) => route.routeId === selectedId);

  return (
    <div className="mx-auto flex w-full max-w-90 flex-col gap-4 bg-white p-4">
      <TravelRouteList
        routes={MOCK_ROUTES}
        selectedRouteId={selectedId}
        onSelect={(route) => setSelectedId(route.routeId)}
      />
      {selected && <TravelRouteSummaryCard route={selected} />}
    </div>
  );
};

const meta = {
  title: "Meeting/Departure/TravelRouteList",
  component: Preview,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
