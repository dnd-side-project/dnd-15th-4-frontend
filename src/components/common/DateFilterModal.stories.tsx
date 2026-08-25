import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { DateFilterModal } from "./DateFilterModal";
import { MOCK_MEETINGS } from "@/mocks/mockMeetings";
import { isSameDay } from "@/utils/date";

const meta = {
  title: "Common/DateFilterModal",
  component: DateFilterModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    hasEventOnDate: (date: Date) =>
      MOCK_MEETINGS.some((meeting) =>
        isSameDay(new Date(meeting.dateTime), date)
      ),
    onSelectDate: fn(),
    onClose: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DateFilterModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialDate: null,
  },
};

const Interactive = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="bg-bg-gray relative h-screen w-full overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-primary-normal rounded-8 absolute top-4 left-4 px-4 py-2 text-white"
      >
        {selectedDate
          ? selectedDate.toLocaleDateString("ko-KR")
          : "날짜 필터 열기"}
      </button>

      {isOpen && (
        <DateFilterModal
          initialDate={selectedDate}
          hasEventOnDate={(date) =>
            MOCK_MEETINGS.some((meeting) =>
              isSameDay(new Date(meeting.dateTime), date)
            )
          }
          onSelectDate={setSelectedDate}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export const SelectDate: Story = {
  render: () => <Interactive />,
};
