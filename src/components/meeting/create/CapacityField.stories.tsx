import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { CapacityField } from "./CapacityField";

const meta = {
  title: "Meeting/Create/CapacityField",
  component: CapacityField,
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
    label: "참여 인원",
    value: null,
    placeholder: "참여 인원을 설정하세요",
    onClick: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CapacityField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ValueSelected: Story = {
  args: {
    value: 4,
  },
};

export const ClickOpensPicker: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const trigger = await canvas.findByRole("button", {
      name: /참여 인원을 설정하세요/i,
    });

    await userEvent.click(trigger);

    await expect(args.onClick).toHaveBeenCalled();
  },
};
