import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { PlaceDto } from "@/types/place";

import { PlaceConfirmSheet } from "./PlaceConfirmSheet";

const MOCK_PLACE: PlaceDto = {
  placeId: "1",
  placeName: "강남역 2호선",
  roadAddressName: "서울 강남구 강남대로 396",
  addressName: "서울 강남구 역삼동 825",
  latitude: 37.497952,
  longitude: 127.027619,
};

const meta = {
  title: "Meeting/Create/PlaceConfirmSheet",
  component: PlaceConfirmSheet,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative mx-auto flex h-176 w-full max-w-md flex-col border border-gray-200">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof PlaceConfirmSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    place: MOCK_PLACE,
    onClose: () => {},
    onConfirm: () => {},
  },
};
