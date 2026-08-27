import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DoubleButton } from "./DoubleButton";

const meta = {
  title: "Common/DoubleButton",
  component: DoubleButton,
  parameters: {
    layout: "centered",
  },
  args: {
    secondaryLabel: "취소",
    primaryLabel: "확인",
    isSecondaryDisabled: false,
    isPrimaryDisabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-88">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DoubleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PrimaryDisabled: Story = {
  args: {
    isPrimaryDisabled: true,
  },
};
