import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HomeHeroSection } from "./HomeHeroSection";
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
      { id: 1, name: "소정", profileImageNumber: 3 },
      { id: 2, name: "민지", profileImageNumber: 5 },
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
    participants: [{ id: 3, name: "현우", profileImageNumber: 1 }],
    status: "WAITING",
  },
];

const mockActiveMeeting = MOCK_MEETINGS[0];

const meta: Meta<typeof HomeHeroSection> = {
  title: "Home/HomeHeroSection",
  component: HomeHeroSection,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <div className="w-full max-w-90">
            <Story />
          </div>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof HomeHeroSection>;

export const Empty: Story = {
  args: {
    meeting: null,
  },
};

export const Active: Story = {
  args: {
    meeting: mockActiveMeeting,
  },
};
