import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FloatingActionButton } from "./FloatingActionButton";

const meta: Meta<typeof FloatingActionButton> = {
  title: "Home/FloatingActionButton",
  component: FloatingActionButton,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="border-border-1 bg-bg-gray relative h-80 w-full rounded-xl border border-dashed p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

export const Default: Story = {
  args: {
    onParticipateClick: () => {},
  },
};
