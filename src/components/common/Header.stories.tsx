import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Header } from "./Header";

const meta = {
  title: "Common/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-88">
        <Story />
      </div>
    ),
  ],
  args: {
    title: "마이페이지",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithoutBackButton: Story = {};

export const WithBackButton: Story = {
  args: {
    onBack: () => alert("뒤로 가기"),
  },
};
