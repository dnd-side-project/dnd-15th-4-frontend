import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PlaceResultList } from "./PlaceResultList";
import type { PlaceDto } from "@/types/place";

const MOCK_RESULTS: PlaceDto[] = [
  {
    placeId: "1",
    placeName: "사당역 2번출구",
    addressName: "서울 동작구 동작대로",
    roadAddressName: "서울 동작구 동작대로",
    latitude: 37.4766,
    longitude: 126.9816,
  },
  {
    placeId: "2",
    placeName: "사당 사거리포차",
    addressName: "서울 동작대로 21번길 10",
    roadAddressName: "서울 동작대로 21번길 10",
    latitude: 37.4769,
    longitude: 126.9819,
  },
  {
    placeId: "3",
    placeName: "사당 투썸플레이스",
    addressName: "서울 동작구 동작대로",
    roadAddressName: "서울 동작구 동작대로",
    latitude: 37.4761,
    longitude: 126.9811,
  },
];

const meta = {
  title: "Components/Meeting/PlaceResultList",
  component: PlaceResultList,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="w-88">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof PlaceResultList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    status: "idle",
    results: [],
    keyword: "",
    onSelect: () => {},
  },
};

export const Loading: Story = {
  args: {
    status: "loading",
    results: [],
    keyword: "사당역",
    onSelect: () => {},
  },
};

export const Success: Story = {
  args: {
    status: "success",
    results: MOCK_RESULTS,
    keyword: "사당",
    onSelect: () => {},
  },
};

export const Empty: Story = {
  args: {
    status: "success",
    results: [],
    keyword: "존재하지않는장소",
    onSelect: () => {},
  },
};

export const Error: Story = {
  args: {
    status: "error",
    results: [],
    keyword: "사당역",
    onSelect: () => {},
  },
};
