import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, waitFor, within } from "storybook/test";

import { TimeSelectModal } from "./TimeSelectModal";
import type { MeetingData } from "@/types/meeting";

const MOCK_MEETINGS: MeetingData[] = [
  {
    meetingId: 1,
    title: "성수동 약속",
    dateTime: "2026-08-21T18:00:00+09:00",
    place: "성수 상상플래닛",
    latitude: 37.5445,
    longitude: 127.0557,
    participants: [{ id: 1, name: "소정", profileImageNumber: 3 }],
    status: "WAITING",
  },
];

const meta = {
  title: "Components/Meeting/TimeSelectModal",
  component: TimeSelectModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    date: new Date(2026, 7, 21),
    meetings: MOCK_MEETINGS,
    onConfirm: fn(),
    onClose: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TimeSelectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ConfirmWithoutConflict: Story = {
  args: {
    initialHour: 10,
    initialMinute: 0,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const confirmButton = await canvas.findByRole("button", { name: "확인" });

    await confirmButton.click();

    await waitFor(() => expect(args.onConfirm).toHaveBeenCalledWith(10, 0));
    expect(canvas.queryByRole("alertdialog")).not.toBeInTheDocument();
  },
};

export const BlocksDuplicateTime: Story = {
  args: {
    initialHour: 18,
    initialMinute: 0,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const confirmButton = await canvas.findByRole("button", { name: "확인" });

    await confirmButton.click();

    const alertDialog = await canvas.findByRole("alertdialog");
    expect(alertDialog).toBeInTheDocument();
    expect(args.onConfirm).not.toHaveBeenCalled();

    const dismissButton = within(alertDialog).getByRole("button", {
      name: "확인",
    });
    await dismissButton.click();

    await waitFor(() =>
      expect(canvas.queryByRole("alertdialog")).not.toBeInTheDocument()
    );
  },
};
