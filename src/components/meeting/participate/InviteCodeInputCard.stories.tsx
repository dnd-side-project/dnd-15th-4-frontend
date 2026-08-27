import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InviteCodeInputCard } from "./InviteCodeInputCard";

const meta = {
  title: "Meeting/Participate/InviteCodeInputCard",
  component: InviteCodeInputCard,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="w-88">
        <Story />
      </div>
    ),
  ],
  args: {
    onChange: () => {},
    onSubmit: () => {},
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InviteCodeInputCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    value: "",
    isValid: false,
  },
};

export const Typing: Story = {
  args: {
    value: "aB3dEf",
    isValid: false,
  },
};

export const Valid: Story = {
  args: {
    value: "aB3dEfGh",
    isValid: true,
  },
};

export const Error: Story = {
  args: {
    value: "wrongCod",
    isValid: false,
    errorMessage: "초대코드가 존재하지 않습니다",
  },
};

const VALID_CODE = "aB3dEfGh";

export const Interactive: Story = {
  args: {
    value: "",
    isValid: false,
  },
  render: () => {
    const InteractiveCard = () => {
      const [value, setValue] = useState("");
      const isComplete = value.length === 8;
      return (
        <InviteCodeInputCard
          value={value}
          onChange={setValue}
          onSubmit={() => {}}
          isValid={isComplete && value === VALID_CODE}
          errorMessage={
            isComplete && value !== VALID_CODE
              ? "초대코드가 존재하지 않습니다"
              : undefined
          }
        />
      );
    };
    return <InteractiveCard />;
  },
};
