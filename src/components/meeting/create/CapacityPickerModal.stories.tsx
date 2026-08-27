import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, userEvent, waitFor } from "storybook/test";

import { CapacityPickerModal } from "./CapacityPickerModal";

const meta = {
  title: "Meeting/Create/CapacityPickerModal",
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
  play: async () => {
    await screen.findByText("1");
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  },
};

export const MaxBoundary: Story = {
  args: {
    value: 12,
  },
  play: async () => {
    await screen.findByText("12");
    expect(screen.queryByText("13")).not.toBeInTheDocument();
  },
};

export const ConfirmSelection: Story = {
  args: {
    value: 4,
  },
  play: async ({ args }) => {
    const confirmButton = await screen.findByRole("button", { name: "확인" });

    await userEvent.click(confirmButton);

    await waitFor(() => expect(args.onConfirm).toHaveBeenCalledWith(4));
  },
};

export const CancelOnBackdropClick: Story = {
  play: async ({ args }) => {
    const backdrop = screen.getByTestId("capacity-picker-backdrop");

    await userEvent.click(backdrop);

    await waitFor(() => expect(args.onClose).toHaveBeenCalled());
  },
};
