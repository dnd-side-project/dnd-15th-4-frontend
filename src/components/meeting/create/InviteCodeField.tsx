"use client";

import { useEffect, useRef, useState } from "react";

import { IcCopy } from "@/components/icons";
import { Toast } from "@/components/common/Toast";

export interface InviteCodeFieldProps {
  label?: string;
  inviteCode: string;
}

const TOAST_VISIBLE_MS = 2000;
const TOAST_EXIT_MS = 300;

type ToastPhase = "hidden" | "entering" | "exiting";

export const InviteCodeField = ({
  label = "초대 코드",
  inviteCode,
}: InviteCodeFieldProps) => {
  const [toastPhase, setToastPhase] = useState<ToastPhase>("hidden");
  const [origin, setOrigin] = useState("");
  const toastTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isMountedRef = useRef(true);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      toastTimers.current.forEach(clearTimeout);
    };
  }, []);

  const inviteLink = `${origin}/home?inviteCode=${encodeURIComponent(inviteCode)}&modal=invite`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      if (!isMountedRef.current) return;
      toastTimers.current.forEach(clearTimeout);
      setToastPhase("entering");
      toastTimers.current = [
        setTimeout(() => setToastPhase("exiting"), TOAST_VISIBLE_MS),
        setTimeout(
          () => setToastPhase("hidden"),
          TOAST_VISIBLE_MS + TOAST_EXIT_MS
        ),
      ];
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

      {toastPhase !== "hidden" && (
        <Toast
          message="초대 링크가 복사되었습니다!"
          position="top"
          isExiting={toastPhase === "exiting"}
        />
      )}
    </div>
  );
};
