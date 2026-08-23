import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HomeUpcomingSection } from "./HomeUpcomingSection";
import type { MeetingData } from "@/types/meeting";

const mockSchedules: MeetingData[] = [
  {
    meetingId: 1,
    latitude: 37.4979,
    longitude: 127.0276,
    title: "강남역 모임 약속",
    dateTime: "2026-08-20T19:00:00+09:00",
    place: "강남역 11번 출구",
    participants: [
      { id: 1, name: "김철수", profileImageUrl: "/character-1.png" },
      { id: 2, name: "이영희", profileImageUrl: "/character-1.png" },
    ],
    status: "WAITING",
  },
  {
    meetingId: 2,
    latitude: 37.5445,
    longitude: 127.0557,
    title: "성수동 보드게임 모임",
    dateTime: "2026-08-23T14:30:00+09:00",
    place: "성수동 히어로보드게임카페",
    participants: [
      { id: 3, name: "박민수", profileImageUrl: "/character-1.png" },
    ],
    status: "WAITING",
  },
];

const meta: Meta<typeof HomeUpcomingSection> = {
  title: "Home/HomeUpcomingSection",
  component: HomeUpcomingSection,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="h-120 w-full max-w-90 bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HomeUpcomingSection>;

export const WithSchedules: Story = {
  args: {
    schedules: mockSchedules,
  },
};

export const Empty: Story = {
  args: {
    schedules: [],
  },
};
