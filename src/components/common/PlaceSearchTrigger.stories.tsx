import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PlaceSearchTrigger } from "./PlaceSearchTrigger";

const meta = {
  title: "Common/PlaceSearchTrigger",
  component: PlaceSearchTrigger,
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
} satisfies Meta<typeof PlaceSearchTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    label: "장소",
    place: null,
    placeholder: "장소, 지역, 주소를 검색하세요",
    onClick: () => {},
  },
};

export const Selected: Story = {
  args: {
    label: "장소",
    place: {
      placeName: "성수 상상 플래닛",
      addressName: "서울 성동구 성수이로 130",
      latitude: 37.5445,
      longitude: 127.0559,
    },
    placeholder: "장소, 지역, 주소를 검색하세요",
    onClick: () => {},
  },
};

export const SelectedLongPlace: Story = {
  args: {
    label: "장소",
    place: {
      placeName: "장소 이름이 아주 길 경우에 줄바꿈으로 표시됩니다",
      addressName: "서울 성동구 성수이로 130",
      latitude: 37.5445,
      longitude: 127.0559,
    },
    placeholder: "장소, 지역, 주소를 검색하세요",
    onClick: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: "장소",
    place: null,
    placeholder: "출발지를 먼저 선택해주세요",
    disabled: true,
    onClick: () => {},
  },
};
