import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./Input";

const meta = {
  title: "Common/Input",
  component: Input,
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
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    label: "약속 이름",
    placeholder: "약속 이름을 입력하세요",
    maxLength: 12,
    value: "",
    readOnly: true,
  },
};

export const Filled: Story = {
  args: {
    label: "약속 이름",
    placeholder: "약속 이름을 입력하세요",
    maxLength: 12,
    value: "성수동 약속",
    readOnly: true,
  },
};

export const WithoutCounter: Story = {
  args: {
    label: "날짜 / 시간",
    placeholder: "약속 날짜와 시간을 설정하세요",
    value: "",
    readOnly: true,
  },
};

export const Interactive: Story = {
  args: {
    label: "메모",
    placeholder: "메모를 남겨보세요",
    maxLength: 12,
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Input
        {...args}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};
