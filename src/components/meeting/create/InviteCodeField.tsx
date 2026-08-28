"use client";

import { useEffect, useState } from "react";

import { IcCopy } from "@/components/icons";
import { Toast } from "@/components/common/Toast";
import { useToast } from "@/hooks/common/useToast";

export interface InviteCodeFieldProps {
  label?: string;
  inviteCode: string;
}

export const InviteCodeField = ({
  label = "초대 코드",
  inviteCode,
}: InviteCodeFieldProps) => {
  const { toastMessage, showToast } = useToast();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const inviteLink = `${origin}/home?inviteCode=${encodeURIComponent(inviteCode)}&modal=invite`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      showToast("초대 링크가 복사되었습니다!");
    } catch {
      // memo: 클립보드 권한이 없는 환경(포커스 없음 등)에서 무시
    }
  };

  return (
    <div className="relative flex w-full flex-col gap-3">
      {label && <label className="h4 text-primary font-bold">{label}</label>}
      <div className="border-border-1 rounded-16 flex w-full items-center justify-between border px-4 py-4.5">
        <span className="body3 text-primary truncate">{inviteLink}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="초대 링크 복사"
          className="shrink-0 pl-2"
        >
          <IcCopy size={20} className="text-disable" />
        </button>
      </div>

      {toastMessage && <Toast message={toastMessage} position="top" />}
    </div>
  );
};
