import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AvatarStack } from "@/components/home";

const mockParticipants = [
  { id: 1, name: "소정", profileImageNumber: 3 },
  { id: 2, name: "민지", profileImageNumber: 5 },
  { id: 3, name: "현우", profileImageNumber: 1 },
  { id: 4, name: "예린", profileImageNumber: 2 },
  { id: 5, name: "성진", profileImageNumber: 4 },
];

const meta: Meta<typeof AvatarStack> = {
  title: "Components/Home/AvatarStack",
  component: AvatarStack,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-bg-gray rounded-xl p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AvatarStack>;

export const Default: Story = {
  args: {
    participants: mockParticipants.slice(0, 3),
  },
};

export const SingleParticipant: Story = {
  args: {
    participants: mockParticipants.slice(0, 1),
  },
};

export const OverflowCount: Story = {
  args: {
    participants: mockParticipants,
  },
};
