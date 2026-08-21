import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IcExtension, IcViewAgenda } from "@/components/icons";
import { Toggle } from "@/components/common/Toggle";

const meta = {
  title: "Common/Toggle",
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
    "aria-label": {
      control: "text",
      description: "스크린 리더 사용자를 위한 접근성 라벨",
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
    "aria-label": "기본 알약형 토글 스위치",
  },
};

export const PillUnchecked: Story = {
  args: {
    variant: "pill",
    defaultChecked: false,
    "aria-label": "알약형 토글 스위치 (해제됨)",
  },
};

export const PillDisabled: Story = {
  args: {
    variant: "pill",
    defaultChecked: true,
    disabled: true,
    "aria-label": "비활성화된 알약형 토글 스위치",
  },
};

export const Radio: Story = {
  args: {
    variant: "radio",
    defaultChecked: true,
    "aria-label": "라디오 토글 스위치",
  },
};

export const RadioUnchecked: Story = {
  args: {
    variant: "radio",
    defaultChecked: false,
    "aria-label": "라디오 토글 스위치 (해제됨)",
  },
};

export const RadioDisabled: Story = {
  args: {
    variant: "radio",
    defaultChecked: false,
    disabled: true,
    "aria-label": "비활성화된 라디오 토글 스위치",
  },
};

export const IconStyle: Story = {
  args: {
    variant: "icon",
    defaultChecked: false,
    iconOff: <IcExtension size={19} />,
    iconOn: <IcViewAgenda size={14} />,
    "aria-label": "아이콘 토글 스위치",
  },
};

export const IconStyleChecked: Story = {
  args: {
    variant: "icon",
    defaultChecked: true,
    iconOff: <IcExtension size={19} />,
    iconOn: <IcViewAgenda size={14} />,
    "aria-label": "아이콘 토글 스위치 (활성화됨)",
  },
};

export const IconStyleDisabled: Story = {
  args: {
    variant: "icon",
    defaultChecked: false,
    disabled: true,
    iconOff: <IcExtension size={19} />,
    iconOn: <IcViewAgenda size={14} />,
    "aria-label": "비활성화된 아이콘 토글 스위치",
  },
};

export const AllVariants: Story = {
  args: {
    variant: "pill",
  },
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Toggle variant="pill" defaultChecked aria-label="알약형 토글" />
        <span className="body7 text-secondary-2">Pill</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Toggle variant="radio" defaultChecked aria-label="라디오형 토글" />
        <span className="body7 text-secondary-2">Radio</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Toggle
          variant="icon"
          defaultChecked={false}
          iconOff={<IcExtension size={19} />}
          iconOn={<IcViewAgenda size={14} />}
          aria-label="아이콘형 토글"
        />
        <span className="body7 text-secondary-2">Icon</span>
      </div>
    </div>
  ),
};
