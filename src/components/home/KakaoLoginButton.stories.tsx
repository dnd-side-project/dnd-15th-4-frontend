import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { KakaoLoginButton } from "./KakaoLoginButton";

const meta = {
  title: "Home/KakaoLoginButton",
  component: KakaoLoginButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof KakaoLoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
