import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, waitFor, within } from "storybook/test";

import { WheelPicker } from "./WheelPicker";

const HOUR_ITEMS = Array.from({ length: 12 }, (_, index) => String(index + 1));

const meta = {
  title: "Common/WheelPicker",
  component: WheelPicker,
  parameters: {
    layout: "centered",
  },
  args: {
    items: HOUR_ITEMS,
    initialIndex: 0,
    onChange: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WheelPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ClickToSelect: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const targetItem = await canvas.findByText("5");

    await targetItem.click();

    await waitFor(() => expect(args.onChange).toHaveBeenCalledWith(4));
  },
};
