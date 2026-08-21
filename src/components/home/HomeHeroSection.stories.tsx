import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HomeHeroSection } from "@/components/home";
import { MOCK_MEETINGS } from "@/mocks/mockMeetings";

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
