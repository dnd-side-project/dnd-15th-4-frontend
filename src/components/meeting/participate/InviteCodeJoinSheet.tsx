"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";

import { ScheduleCard } from "@/components/common/ScheduleCard";
import { usePreviewMeetingQuery } from "@/hooks/meeting/participate/usePreviewMeeting";

import { InviteCodeInputCard } from "./InviteCodeInputCard";

export interface InviteCodeJoinSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEFAULT_ERROR_MESSAGE = "초대코드가 존재하지 않습니다";

export const InviteCodeJoinSheet = ({
  open,
  onOpenChange,
}: InviteCodeJoinSheetProps) => {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState("");
  const {
    data: previewData,
    isSuccess: isValid,
    isError,
  } = usePreviewMeetingQuery(inviteCode);

  const handleSubmit = () => {
    if (!isValid) return;
    onOpenChange(false);
    router.push(
      `/meeting/participate?code=${encodeURIComponent(inviteCode.trim())}`
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Viewport className="fixed inset-x-0 inset-y-0 z-50 flex items-center justify-center px-4">
          <Dialog.Popup className="relative flex w-full max-w-md flex-col gap-4">
            <Dialog.Title className="sr-only">
              초대 코드로 참여하기
            </Dialog.Title>

            {previewData && (
              <div className="pointer-events-none absolute bottom-full left-0 mb-4 w-full select-none">
                <ScheduleCard meeting={previewData} />
              </div>
            )}

            <div className="rounded-16 flex w-full flex-col gap-1 bg-white px-6 py-5">
              <p className="h4 text-primary">초대 코드로 참여하기</p>
              <p className="body6 text-secondary-2">
                친구에게 받은 초대코드를 아래에 입력해 주세요
              </p>
            </div>

            <InviteCodeInputCard
              value={inviteCode}
              onChange={setInviteCode}
              onSubmit={handleSubmit}
              isValid={isValid}
              errorMessage={isError ? DEFAULT_ERROR_MESSAGE : undefined}
            />
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
