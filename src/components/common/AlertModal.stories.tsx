import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { AlertModal } from "./AlertModal";

const meta = {
  title: "Common/AlertModal",
  component: AlertModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onConfirm: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AlertModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DuplicateTimeWarning: Story = {
  args: {
    message: "이미 같은 날짜, 같은 시간에\n등록된 약속이 있어요.",
  },
};
