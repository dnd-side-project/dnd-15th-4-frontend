import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ScheduleCard } from "@/components/home";
import type { MeetingData } from "@/types/meeting";

const mockMeeting: MeetingData = {
  meetingId: 1,
  latitude: 37.4979,
  longitude: 127.0276,
  title: "강남역 모임 약속",
  dateTime: "2026-08-20T19:00:00",
  place: "강남역 11번 출구",
  participants: [
    { id: 1, name: "김철수", profileImageNumber: 1 },
    { id: 2, name: "이영희", profileImageNumber: 2 },
    { id: 3, name: "박민수", profileImageNumber: 3 },
  ],
};

const meta: Meta<typeof ScheduleCard> = {
  title: "Components/Home/ScheduleCard",
  component: ScheduleCard,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-bg-gray w-full max-w-90 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScheduleCard>;

export const Default: Story = {
  args: {
    meeting: mockMeeting,
  },
};

export const LongTextOverflow: Story = {
  args: {
    meeting: {
      ...mockMeeting,
      title:
        "엄청나게 긴 약속 제목입니다. 긴 제목 처리 truncate 속성이 잘 적용되는지 확인합니다.",
      place: "서울특별시 강남구 테헤란로 123 길거리 스터디카페 2층 A룸",
    },
  },
};

export const ManyParticipants: Story = {
  args: {
    meeting: {
      ...mockMeeting,
      participants: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        name: `참여자 ${i + 1}`,
        profileImageNumber: (i % 5) + 1,
      })),
    },
  },
};

export const TodayMeeting: Story = {
  args: {
    meeting: {
      ...mockMeeting,
      dateTime: new Date().toISOString(),
    },
  },
};
