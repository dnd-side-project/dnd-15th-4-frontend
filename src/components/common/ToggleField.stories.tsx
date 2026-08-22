import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ToggleField } from "./ToggleField";

const meta = {
  title: "Common/ToggleField",
  component: ToggleField,
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
} satisfies Meta<typeof ToggleField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: {
    label: "위치권한",
    defaultChecked: false,
  },
};

export const On: Story = {
  args: {
    label: "친구도착",
    defaultChecked: true,
  },
};
