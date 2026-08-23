import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, waitFor, within } from "storybook/test";

import { TimeSelectModal } from "./TimeSelectModal";
import type { MeetingData } from "@/types/meeting";
import { MIN_LEAD_TIME_MINUTES } from "@/utils/date";

const TOMORROW = new Date(Date.now() + 24 * 60 * 60 * 1000);

const MOCK_MEETINGS: MeetingData[] = [
  {
    meetingId: 1,
    title: "성수동 약속",
    dateTime: new Date(
      TOMORROW.getFullYear(),
      TOMORROW.getMonth(),
      TOMORROW.getDate(),
      18,
      0
    ).toISOString(),
    place: "성수 상상플래닛",
    latitude: 37.5445,
    longitude: 127.0557,
    participants: [
      { id: 1, name: "소정", profileImageUrl: "/character-1.png" },
    ],
    status: "WAITING",
  },
];

const meta = {
  title: "Meeting/Create/TimeSelectModal",
  component: TimeSelectModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    date: TOMORROW,
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
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
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

    const alertDialog = await screen.findByRole("dialog");
    expect(alertDialog).toBeInTheDocument();
    expect(args.onConfirm).not.toHaveBeenCalled();

    const dismissButton = within(alertDialog).getByRole("button", {
      name: "확인",
    });
    await dismissButton.click();

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  },
};

export const BlocksPastDateTime: Story = {
  args: {
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    initialHour: 10,
    initialMinute: 0,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const confirmButton = await canvas.findByRole("button", { name: "확인" });

    await confirmButton.click();

    const alertDialog = await screen.findByRole("dialog");
    expect(alertDialog).toHaveTextContent("이미 지난 날짜와 시간이에요");
    expect(args.onConfirm).not.toHaveBeenCalled();
  },
};

export const BlocksTooSoonDateTime: Story = {
  args: (() => {
    const inTenMinutes = new Date(Date.now() + 10 * 60 * 1000);
    return {
      date: inTenMinutes,
      initialHour: inTenMinutes.getHours(),
      initialMinute: inTenMinutes.getMinutes(),
    };
  })(),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const confirmButton = await canvas.findByRole("button", { name: "확인" });

    await confirmButton.click();

    const alertDialog = await screen.findByRole("dialog");
    expect(alertDialog).toHaveTextContent(
      `최소 ${MIN_LEAD_TIME_MINUTES}분 이후로`
    );
    expect(args.onConfirm).not.toHaveBeenCalled();
  },
};
