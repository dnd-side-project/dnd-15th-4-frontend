import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TravelRouteList } from "./TravelRouteList";
import { TravelRouteSummaryCard } from "./TravelRouteSummaryCard";
import type { MeetingRoute } from "@/types/meeting";

const MOCK_ROUTES: MeetingRoute[] = [
  {
    totalTime: 3780,
    fare: 1850,
    transferCount: 2,
    pathType: 3,
    steps: [
      {
        type: "WALK",
        time: 480,
        distance: 420,
        description: "태릉입구역까지 이동",
      },
      {
        type: "SUBWAY",
        line: "6호선",
        station: {
          start: "태릉입구역",
          end: "성수역",
        },
        time: 1620,
        distance: 27000,
        color: "5D4EBD",
      },
      {
        type: "WALK",
        time: 120,
        distance: 100,
        description: "성수역 이동",
      },
    ],
  },
  {
    totalTime: 3780,
    fare: 1850,
    transferCount: 2,
    pathType: 3,
    steps: [
      {
        type: "WALK",
        time: 300,
        distance: 350,
        description: "태릉입구역까지 이동",
      },
      {
        type: "SUBWAY",
        time: 1620,
        distance: 27000,
        description: "성수역 이동",
        line: "수도권6호선",
        station: {
          start: "태릉입구",
          end: "성수역",
        },
      },
      {
        type: "WALK",
        time: 180,
        distance: 150,
        description: "성수역 이동",
      },
    ],
  },
  {
    totalTime: 3300,
    fare: 1500,
    transferCount: 0,
    pathType: 2,
    steps: [
      {
        type: "WALK",
        time: 300,
        distance: 350,
        description: "드림타워1203호 이동",
      },
      {
        type: "BUS",
        time: 2400,
        distance: 9500,
        line: "302",
        station: {
          start: "논현역.신논현역",
          end: "강남역",
        },
      },
      {
        type: "WALK",
        time: 600,
        distance: 500,
        description: "성수역 이동",
      },
    ],
  },
  {
    totalTime: 4200,
    fare: 2100,
    transferCount: 2,
    pathType: 3,
    steps: [
      {
        type: "WALK",
        time: 300,
        distance: 300,
        description: "드림타워1203호 이동",
      },
      {
        type: "SUBWAY",
        time: 1500,
        distance: 9000,
        line: "2호선",
        station: {
          start: "강남역",
          end: "잠실역",
        },
      },
      {
        type: "WALK",
        time: 420,
        distance: 350,
        description: "잠실역 환승 이동",
      },
      {
        type: "BUS",
        time: 1800,
        distance: 7000,
        line: "350",
        station: {
          start: "잠실역.롯데월드",
          end: "성수사거리",
        },
      },
      {
        type: "WALK",
        time: 180,
        distance: 150,
        description: "성수역 이동",
      },
    ],
  },
];

const ORIGIN_NAME = "드림타워1203호";
const DESTINATION_NAME = "성수역 상상대로 야옹이 카페";

const Preview = () => {
  const [selectedRoute, setSelectedRoute] = useState<MeetingRoute | null>(null);

  return (
    <div className="mx-auto flex w-full max-w-90 flex-col gap-4 bg-white p-4">
      <TravelRouteList
        routes={MOCK_ROUTES}
        selectedRoute={selectedRoute}
        originName={ORIGIN_NAME}
        destinationName={DESTINATION_NAME}
        onSelect={setSelectedRoute}
      />

      {selectedRoute && (
        <TravelRouteSummaryCard
          route={selectedRoute}
          originName={ORIGIN_NAME}
          destinationName={DESTINATION_NAME}
        />
      )}
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
