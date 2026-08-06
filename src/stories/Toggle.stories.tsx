import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IcExtension, IcViewAgenda } from "@/components/icons";
import { Toggle } from "@/components/ui/toggle";

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["pill", "radio", "icon"],
    },
    disabled: {
      control: "boolean",
    },
    defaultChecked: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pill: Story = {
  args: {
    variant: "pill",
    defaultChecked: true,
  },
};

export const PillUnchecked: Story = {
  args: {
    variant: "pill",
    defaultChecked: false,
  },
};

export const PillDisabled: Story = {
  args: {
    variant: "pill",
    defaultChecked: true,
    disabled: true,
  },
};

export const Radio: Story = {
  args: {
    variant: "radio",
    defaultChecked: true,
  },
};

export const RadioUnchecked: Story = {
  args: {
    variant: "radio",
    defaultChecked: false,
  },
};

export const RadioDisabled: Story = {
  args: {
    variant: "radio",
    defaultChecked: false,
    disabled: true,
  },
};

export const IconStyle: Story = {
  args: {
    variant: "icon",
    defaultChecked: false,
    iconOff: <IcExtension size={19} />,
    iconOn: <IcViewAgenda size={14} />,
  },
};

export const IconStyleChecked: Story = {
  args: {
    variant: "icon",
    defaultChecked: true,
    iconOff: <IcExtension size={19} />,
    iconOn: <IcViewAgenda size={14} />,
  },
};

export const IconStyleDisabled: Story = {
  args: {
    variant: "icon",
    defaultChecked: false,
    disabled: true,
    iconOff: <IcExtension size={19} />,
    iconOn: <IcViewAgenda size={14} />,
  },
};

export const AllVariants: Story = {
  args: {
    variant: "pill",
  },
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Toggle variant="pill" defaultChecked />
        <span className="body7 text-text-secondary-2">Pill</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Toggle variant="radio" defaultChecked />
        <span className="body7 text-text-secondary-2">Radio</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Toggle
          variant="icon"
          defaultChecked={false}
          iconOff={<IcExtension size={19} />}
          iconOn={<IcViewAgenda size={14} />}
        />
        <span className="body7 text-text-secondary-2">Icon</span>
      </div>
    </div>
  ),
};
