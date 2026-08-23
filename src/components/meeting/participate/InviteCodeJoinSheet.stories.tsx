import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dialog } from "@base-ui/react/dialog";

import { InviteCodeInputCard } from "./InviteCodeInputCard";

const VALID_CODE = "aB3dEfGh";

interface DummySheetProps {
  initialOpen?: boolean;
}

const DummyInviteCodeJoinSheet = ({ initialOpen = true }: DummySheetProps) => {
  const [open, setOpen] = useState(initialOpen);
  const [inviteCode, setInviteCode] = useState("");

  const trimmed = inviteCode.trim();
  const isComplete = trimmed.length === 8;
  const isValid = isComplete && trimmed === VALID_CODE;
  const errorMessage =
    isComplete && !isValid ? "초대코드가 존재하지 않습니다" : undefined;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/63" />
        <Dialog.Viewport className="fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
          <Dialog.Popup className="flex w-full max-w-md flex-col gap-4">
            <Dialog.Title className="sr-only">
              초대 코드로 참여하기
            </Dialog.Title>

            <div className="rounded-16 flex w-full flex-col gap-1 bg-white px-6 py-5">
              <p className="h4 text-primary">초대 코드로 참여하기</p>
              <p className="body6 text-secondary-2">
                친구에게 받은 초대코드를 아래에 입력해 주세요
              </p>
            </div>

            <InviteCodeInputCard
              value={inviteCode}
              onChange={setInviteCode}
              onSubmit={() => {}}
              isValid={isValid}
              errorMessage={errorMessage}
            />
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const meta = {
  title: "Meeting/Participate/InviteCodeJoinSheet",
  component: DummyInviteCodeJoinSheet,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative mx-auto h-176 w-full max-w-md border border-gray-200">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof DummyInviteCodeJoinSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialOpen: true,
  },
};
