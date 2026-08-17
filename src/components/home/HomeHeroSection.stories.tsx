import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HomeHeroSection } from "@/components/home";
import { MOCK_MEETINGS } from "@/mocks/mockMeetings";

// meetingId 0은 MOCK_PARTICIPANT_LOCATIONS에 등록된 참여자(1~4)와 destination 좌표가
// 실제로 맞물려 있어, 도착/이동중/출발 전 상태를 모두 보여줄 수 있는 유일한 조합입니다.
const mockActiveMeeting = MOCK_MEETINGS[0];

const meta: Meta<typeof HomeHeroSection> = {
  title: "Components/Home/HomeHeroSection",
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

// 진행중인 약속이 없을 때의 기본 배너 상태입니다.
export const Empty: Story = {
  args: {
    meeting: null,
  },
};

// 참여자별 위치 조회 폴링 결과에 따라 프로세스바(이동중/도착)가 채워집니다.
export const Active: Story = {
  args: {
    meeting: mockActiveMeeting,
  },
};
