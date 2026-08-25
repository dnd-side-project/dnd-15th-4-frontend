import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, userEvent, waitFor } from "storybook/test";

import { DateSelectModal } from "./DateSelectModal";
import type { MeetingData } from "@/types/meeting";

const MOCK_MEETINGS: MeetingData[] = [
  {
    meetingId: 1,
    title: "성수동 약속",
    dateTime: "2026-08-21T18:00:00+09:00",
    place: "성수 상상플래닛",
    latitude: 37.5445,
    longitude: 127.0557,
    participants: [
      { id: 1, name: "소정", profileImageUrl: "/character-1.png" },
      { id: 2, name: "민지", profileImageUrl: "/character-1.png" },
    ],
    status: "WAITING",
  },
  {
    meetingId: 2,
    title: "저녁 약속",
    dateTime: "2026-08-21T20:00:00+09:00",
    place: "성수동 카페",
    latitude: 37.5445,
    longitude: 127.0557,
    participants: [
      { id: 3, name: "현우", profileImageUrl: "/character-1.png" },
    ],
    status: "WAITING",
  },
];

const meta = {
  title: "Meeting/Create/DateSelectModal",
  component: DateSelectModal,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    meetings: MOCK_MEETINGS,
    onConfirm: fn(),
    onClose: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DateSelectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialDate: null,
  },
};

export const SelectedDateHasSchedules: Story = {
  args: {
    initialDate: new Date(2026, 7, 21),
  },
  play: async () => {
    await waitFor(() =>
      expect(screen.getByText("성수동 약속")).toBeInTheDocument()
    );
    expect(screen.getByText("저녁 약속")).toBeInTheDocument();
  },
};

export const SelectDateAndConfirm: Story = {
  args: {
    initialDate: new Date(2026, 7, 20),
  },
  play: async ({ args }) => {
    const day25 = await screen.findByRole("button", { name: "8월 25일" });

    await userEvent.click(day25);
    await waitFor(() => expect(day25).toHaveAccessibleName("8월 25일, 선택됨"));

    const confirmButton = await screen.findByRole("button", { name: "확인" });
    await userEvent.click(confirmButton);

    await waitFor(() => expect(args.onConfirm).toHaveBeenCalled());

    const confirmedDate = (args.onConfirm as ReturnType<typeof fn>).mock
      .calls[0][0] as Date;
    expect(confirmedDate.getDate()).toBe(25);
  },
};

export const NavigateMonth: Story = {
  args: {
    initialDate: new Date(2026, 7, 20),
  },
  play: async () => {
    expect(screen.getByText("2026년 8월")).toBeInTheDocument();

    const nextButton = await screen.findByRole("button", { name: "다음 달" });
    await userEvent.click(nextButton);

    await waitFor(() =>
      expect(screen.getByText("2026년 9월")).toBeInTheDocument()
    );
  },
};

export const CloseOnBackdropClick: Story = {
  play: async ({ args }) => {
    const backdrop = screen.getByTestId("data-select-backdrop");

    await userEvent.click(backdrop);

    await waitFor(() => expect(args.onClose).toHaveBeenCalled());
  },
};
