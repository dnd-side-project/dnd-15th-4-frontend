"use client";

import { useState } from "react";

import { IcCopy } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface InviteCodeFieldProps {
  label?: string;
  inviteLink: string;
}

const TOAST_DURATION_MS = 2000;

export const InviteCodeField = ({
  label = "초대 코드",
  inviteLink,
}: InviteCodeFieldProps) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setShowToast(true);
      setTimeout(() => setShowToast(false), TOAST_DURATION_MS);
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
          aria-label="초대 코드 복사"
          className="shrink-0 pl-2"
        >
          <IcCopy size={20} className="text-disable" />
        </button>
      </div>

      <output
        aria-live="polite"
        className={cn(
          "rounded-pill bg-sub2-normal absolute top-full left-1/2 mt-2 -translate-x-1/2 px-4 py-2 transition-opacity",
          showToast ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <span className="body6 whitespace-nowrap text-white">
          초대 코드가 복사되었습니다!
        </span>
      </output>
    </div>
  );
};
