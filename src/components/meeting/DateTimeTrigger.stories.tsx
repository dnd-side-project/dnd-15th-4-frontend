import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { DateTimeTrigger } from "./DateTimeTrigger";

const meta = {
  title: "Common/DateTimeField",
  component: DateTimeTrigger,
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
  args: {
    onClick: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DateTimeTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    label: "날짜 / 시간",
    placeholder: "약속 날짜와 시간을 설정하세요",
    value: null,
  },
};

export const Filled: Story = {
  args: {
    label: "날짜 / 시간",
    placeholder: "약속 날짜와 시간을 설정하세요",
    value: new Date(2026, 7, 20, 13, 40),
  },
};
