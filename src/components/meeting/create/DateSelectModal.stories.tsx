import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, userEvent, waitFor } from "storybook/test";

import { DateSelectModal } from "./DateSelectModal";
import type { MeetingData } from "@/types/meeting";

const getFutureDates = () => {
  const now = new Date();
  const currentMonthDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 10);

  const nextMonthConfirmDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    20
  );

  const formatDateIso = (d: Date, hour: number) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(hour).padStart(2, "0");
    return `${year}-${month}-${day}T${h}:00:00+09:00`;
  };

  return {
    now,
    currentMonthDate,
    nextMonthDate,
    nextMonthConfirmDate,
    isoSchedule1: formatDateIso(currentMonthDate, 18),
    isoSchedule2: formatDateIso(currentMonthDate, 20),
  };
};

const futureDates = getFutureDates();

const MOCK_MEETINGS: MeetingData[] = [
  {
    meetingId: 1,
    title: "성수동 약속",
    dateTime: futureDates.isoSchedule1,
    place: "성수 상상플래닛",
    latitude: 37.5445,
    longitude: 127.0557,
    capacity: 4,
    currentParticipantCount: 2,
    participants: [
      { id: 1, name: "소정", profileImageUrl: "/character-1.png" },
      { id: 2, name: "민지", profileImageUrl: "/character-1.png" },
    ],
    status: "WAITING",
  },
  {
    meetingId: 2,
    title: "저녁 약속",
    dateTime: futureDates.isoSchedule2,
    place: "성수동 카페",
    latitude: 37.5445,
    longitude: 127.0557,
    capacity: 4,
    currentParticipantCount: 1,
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
    initialDate: futureDates.currentMonthDate,
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
    initialDate: futureDates.currentMonthDate,
  },
  play: async ({ args }) => {
    const targetMonth = futureDates.nextMonthConfirmDate.getMonth() + 1;
    const targetDay = futureDates.nextMonthConfirmDate.getDate();
    const dayAriaLabel = `${targetMonth}월 ${targetDay}일`;

    const nextButton = await screen.findByRole("button", { name: "다음 달" });
    await userEvent.click(nextButton);

    const targetDayButton = await screen.findByRole("button", {
      name: dayAriaLabel,
    });

    await userEvent.click(targetDayButton);
    await waitFor(() =>
      expect(targetDayButton).toHaveAccessibleName(`${dayAriaLabel}, 선택됨`)
    );

    const confirmButton = await screen.findByRole("button", { name: "확인" });
    await userEvent.click(confirmButton);

    await waitFor(() => expect(args.onConfirm).toHaveBeenCalled());

    const confirmedDate = (args.onConfirm as ReturnType<typeof fn>).mock
      .calls[0][0] as Date;
    expect(confirmedDate.getDate()).toBe(targetDay);
  },
};

export const NavigateMonth: Story = {
  args: {
    initialDate: futureDates.currentMonthDate,
  },
  play: async () => {
    const currentYear = futureDates.currentMonthDate.getFullYear();
    const currentMonth = futureDates.currentMonthDate.getMonth() + 1;

    expect(
      screen.getByText(`${currentYear}년 ${currentMonth}월`)
    ).toBeInTheDocument();

    const nextButton = await screen.findByRole("button", { name: "다음 달" });
    await userEvent.click(nextButton);

    const nextMonthDate = new Date(
      currentYear,
      futureDates.currentMonthDate.getMonth() + 1,
      1
    );
    const nextYear = nextMonthDate.getFullYear();
    const nextMonth = nextMonthDate.getMonth() + 1;

    await waitFor(() =>
      expect(
        screen.getByText(`${nextYear}년 ${nextMonth}월`)
      ).toBeInTheDocument()
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
