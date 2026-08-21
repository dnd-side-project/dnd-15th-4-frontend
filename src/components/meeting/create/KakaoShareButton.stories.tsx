import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { KakaoShareButton } from "./KakaoShareButton";

const meta = {
  title: "Meeting/Create/KakaoShareButton",
  component: KakaoShareButton,
  parameters: {
    layout: "padded",
  },
  args: {
    title: "성수동 약속",
    description: "2026.08.25 (화) 오후 2:00 · 성수 상상플래닛",
    linkUrl: "https://puzzlemeet.kr/invite/123",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KakaoShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SdkUnavailableShowsMessage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shareButton = await canvas.findByRole("button", {
      name: "카카오톡으로 공유하기",
    });

    await shareButton.click();

    await waitFor(
      () =>
        expect(
          canvas.getByText(/카카오톡 공유를 사용할 수 없어요/)
        ).toBeInTheDocument(),
      { timeout: 5000 }
    );
  },
};
