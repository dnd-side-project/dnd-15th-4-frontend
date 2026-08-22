import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { ConfirmModal } from "./ConfirmModal";

const meta = {
  title: "Common/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onCancel: fn(),
    onConfirm: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Logout: Story = {
  args: {
    title: "로그아웃 할까요?",
    description: "로그인한 카카오계정을 로그아웃 합니다",
    cancelLabel: "취소",
  },
};

export const ConfirmOnly: Story = {
  args: {
    title: "저장되었습니다",
  },
};
