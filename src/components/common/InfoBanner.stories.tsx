import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InfoBanner } from "./InfoBanner";

const meta = {
  title: "Common/InfoBanner",
  component: InfoBanner,
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
} satisfies Meta<typeof InfoBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "출발하면 설정된 내 도착 상황을 친구들에게 공유할게요",
  },
};

export const LongText: Story = {
  args: {
    text: "닉네임 비활성시에 카카오 계정에 등록된 이름으로 참여합니다: 텍스트가 길 겨우의 컴포넌트입니다.",
  },
};
