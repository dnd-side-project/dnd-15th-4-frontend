import { useState } from "react";
import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BottomSheet } from "./BottomSheet";
import { MeetingProgressSheet } from "@/components/meeting/progress/MeetingProgressSheet";
import {
  mockMeetingParticipants,
  mockMeetingSummary,
} from "@/mocks/mockMeetings";

const meta = {
  title: "Common/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    modal: {
      control: "boolean",
    },
    shouldShowBackdrop: {
      control: "boolean",
    },
    disablePointerDismissal: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const SheetPreview = ({
  children,
  ...props
}: ComponentProps<typeof BottomSheet>) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-bg-gray relative h-screen w-full overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-primary-normal rounded-8 absolute top-4 left-4 px-4 py-2 text-white"
      >
        시트 열기
      </button>

      <BottomSheet {...props} open={open} onOpenChange={setOpen}>
        {children}
      </BottomSheet>
    </div>
  );
};

export const Default: Story = {
  args: {
    modal: false,
    shouldShowBackdrop: false,
    disablePointerDismissal: false,
  },
  render: (args) => (
    <SheetPreview {...args}>
      <div className="flex w-full flex-col gap-3 px-4 pb-8">
        <p className="h3 text-primary">바텀시트 콘텐츠</p>
        <p className="body6 text-secondary-2">
          여기에 원하는 콘텐츠를 채워 넣을 수 있습니다.
        </p>
      </div>
    </SheetPreview>
  ),
};

export const WithBackdrop: Story = {
  args: {
    modal: true,
    shouldShowBackdrop: true,
    disablePointerDismissal: false,
  },
  render: (args) => (
    <SheetPreview {...args}>
      <div className="flex w-full flex-col gap-3 px-4 pb-8">
        <p className="h3 text-primary">모달 바텀시트</p>
        <p className="body6 text-secondary-2">
          배경(백드롭)을 클릭하면 시트가 닫힙니다.
        </p>
      </div>
    </SheetPreview>
  ),
};

export const WithSnapPoints: Story = {
  args: {
    modal: false,
    shouldShowBackdrop: false,
    disablePointerDismissal: true,
    snapPoints: [170, 9999],
    snapPoint: 170,
  },
  render: (args) => (
    <SheetPreview {...args}>
      <div className="flex w-full flex-col gap-3 px-4 pb-8">
        <p className="h3 text-primary">스냅 포인트 바텀시트</p>
        <p className="body6 text-secondary-2">
          핸들을 위로 끌어올리면 확장되고, 아래로 내리면 축소됩니다.
        </p>
      </div>
    </SheetPreview>
  ),
};

const MEETING_DETAIL_SNAP_POINTS = [100, 270, 9999];

const MeetingDetailPagePreview = () => {
  const [snapPoint, setSnapPoint] = useState<number>(270);

  return (
    <div className="bg-bg-gray relative h-screen w-full overflow-hidden">
      <BottomSheet
        open
        onOpenChange={() => {}}
        modal={false}
        shouldShowBackdrop={false}
        disablePointerDismissal
        snapPoints={MEETING_DETAIL_SNAP_POINTS}
        snapPoint={snapPoint}
        onSnapPointChange={(point) => {
          if (typeof point !== "number") return;
          setSnapPoint(point);
        }}
      >
        <MeetingProgressSheet
          participants={mockMeetingParticipants.participants}
          meetingPlaceLocation={{
            latitude: mockMeetingSummary.latitude,
            longitude: mockMeetingSummary.longitude,
          }}
        />
      </BottomSheet>
    </div>
  );
};

export const MeetingDetailPage: Story = {
  render: () => <MeetingDetailPagePreview />,
};
