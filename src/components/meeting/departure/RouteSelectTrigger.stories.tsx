import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { RouteSelectTrigger } from "./RouteSelectTrigger";

const meta = {
  title: "Meeting/Departure/RouteSelectTrigger",
  component: RouteSelectTrigger,
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
    label: "이동 경로",
    value: null,
    placeholder: "출발지를 먼저 선택해주세요",
    disabled: true,
    onClick: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RouteSelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Disabled: Story = {};

export const Empty: Story = {
  args: {
    placeholder: "이동 경로를 선택해주세요",
    disabled: false,
  },
};

export const RouteSelected: Story = {
  args: {
    value: "신논현역 - 신당역  - 뱅뱅사거리 - 강남역",
    disabled: false,
  },
};

export const RouteSelectedLong: Story = {
  args: {
    value:
      "신논현역 - 신당역  - 뱅뱅사거리 - 강남역 - 신논현역 - 신당역  - 뱅뱅사거리 - 강남역",
    disabled: false,
  },
};

export const ClickOpensRouteList: Story = {
  args: {
    placeholder: "이동 경로를 선택해주세요",
    disabled: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const trigger = await canvas.findByRole("button", {
      name: /이동 경로를 선택해주세요/i,
    });

    await userEvent.click(trigger);

    await expect(args.onClick).toHaveBeenCalled();
  },
};
