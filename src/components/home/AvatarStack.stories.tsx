import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AvatarStack } from "./AvatarStack";

const mockParticipants = [
  { id: 1, name: "소정", profileImageUrl: "/character-1.png" },
  { id: 2, name: "민지", profileImageUrl: "/character-1.png" },
  { id: 3, name: "현우", profileImageUrl: "/character-1.png" },
  { id: 4, name: "예린", profileImageUrl: "/character-1.png" },
  { id: 5, name: "성진", profileImageUrl: "/character-1.png" },
];

const meta: Meta<typeof AvatarStack> = {
  title: "Home/AvatarStack",
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
