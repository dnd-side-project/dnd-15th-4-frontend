import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IcArrivalDot } from "@/components/icons";

const meta: Meta<typeof IcArrivalDot> = {
  title: "Icons/IcArrivalDot",
  component: IcArrivalDot,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IcArrivalDot>;

export const Default: Story = {
  args: {
    className: "text-primary-normal",
  },
};
