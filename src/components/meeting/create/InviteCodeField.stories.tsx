import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, waitFor, within } from "storybook/test";

import { InviteCodeField } from "./InviteCodeField";

const meta = {
  title: "Meeting/Create/InviteCodeField",
  component: InviteCodeField,
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
    inviteLink: "https://puzzlemeet.kr/invite/123",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InviteCodeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CopyShowsToast: Story = {
  play: async ({ canvasElement }) => {
    const writeTextSpy = fn();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextSpy },
      configurable: true,
    });

    const canvas = within(canvasElement);
    const copyButton = await canvas.findByRole("button", {
      name: "초대 코드 복사",
    });

    await copyButton.click();

    await waitFor(() =>
      expect(writeTextSpy).toHaveBeenCalledWith(
        "https://puzzlemeet.kr/invite/123"
      )
    );
    await waitFor(() =>
      expect(canvas.getByRole("status")).toHaveTextContent(
        "초대 코드가 복사되었어요"
      )
    );
  },
};
