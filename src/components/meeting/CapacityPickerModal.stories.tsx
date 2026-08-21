import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { CapacityPickerModal } from "./CapacityPickerModal";

const meta = {
  title: "Components/Meeting/CapacityPickerModal",
  component: CapacityPickerModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    value: null,
    min: 1,
    max: 12,
    onConfirm: fn(),
    onClose: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CapacityPickerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ValueSelected: Story = {
  args: {
    value: 4,
  },
};

export const MinBoundary: Story = {
  args: {
    value: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText("1");
    expect(canvas.queryByText("0")).not.toBeInTheDocument();
  },
};

export const MaxBoundary: Story = {
  args: {
    value: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText("12");
    expect(canvas.queryByText("13")).not.toBeInTheDocument();
  },
};

export const ConfirmSelection: Story = {
  args: {
    value: 4,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const confirmButton = await canvas.findByRole("button", { name: "확인" });

    await userEvent.click(confirmButton);

    await waitFor(() => expect(args.onConfirm).toHaveBeenCalledWith(4));
  },
};

export const CancelOnBackdropClick: Story = {
  play: async ({ canvasElement, args }) => {
    const backdrop = canvasElement.querySelector<HTMLElement>(
      '[data-testid="capacity-picker-backdrop"]'
    );
    if (!backdrop) throw new Error("Backdrop element not found");

    await userEvent.click(backdrop);

    await waitFor(() => expect(args.onClose).toHaveBeenCalled());
  },
};
