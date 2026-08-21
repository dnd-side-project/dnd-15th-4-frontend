import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KakaoLoginButton } from "@/components/common/KakaoLoginButton";

const meta = {
  title: "Common/KakaoLoginButton",
  component: KakaoLoginButton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KakaoLoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
