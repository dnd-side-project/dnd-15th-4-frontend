import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { TabMenu, type TabMenuProps } from "./TabMenu";

const meta = {
  title: "Common/TabMenu",
  component: TabMenu,
  parameters: {
    layout: "centered",
  },
  args: {
    leftLabel: "약속 정보",
    rightLabel: "내 경로",
    selectedTab: "left",
  },
  decorators: [
    (Story) => (
      <div className="w-88">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TabMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RightSelected: Story = {
  args: {
    selectedTab: "right",
  },
};

export const Interactive: Story = {
  render: (args: TabMenuProps) => {
    const [selectedTab, setSelectedTab] = useState<"left" | "right">(
      args.selectedTab
    );

    return (
      <TabMenu
        {...args}
        selectedTab={selectedTab}
        onLeftClick={() => setSelectedTab("left")}
        onRightClick={() => setSelectedTab("right")}
      />
    );
  },
};
