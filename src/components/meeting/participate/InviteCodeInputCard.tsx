"use client";

import { IcArrowRight, IcInfo } from "@/components/icons";
import { CODE_MAX_LENGTH } from "@/constants/validation";
import { cn } from "@/lib/utils";

export interface InviteCodeInputCardProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isValid: boolean;
  errorMessage?: string;
}

export const InviteCodeInputCard = ({
  value,
  onChange,
  onSubmit,
  isValid,
  errorMessage,
}: InviteCodeInputCardProps) => (
  <div className="flex w-full flex-col gap-2">
    <div
      className={cn(
        "rounded-16 flex w-full items-center justify-between gap-2 border-2 bg-white px-6 py-5 transition-colors",
        errorMessage ? "border-red" : "border-transparent"
      )}
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={CODE_MAX_LENGTH}
        placeholder="초대 코드를 입력해 주세요"
        aria-label="초대 코드"
        className="body3 text-primary placeholder:text-disable flex-1 bg-transparent outline-none"
      />
      <button
        type="button"
        onClick={onSubmit}
        disabled={!isValid}
        aria-label="약속 참여하기"
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors",
          isValid
            ? "bg-primary-normal-hover cursor-pointer"
            : "bg-sub2-normal cursor-not-allowed"
        )}
      >
        <IcArrowRight size={15} className="text-white" />
      </button>
    </div>

    {errorMessage && (
      <div className="rounded-8 flex w-full items-center gap-1 px-2.5">
        <IcInfo size={20} className="text-red shrink-0" />
        <p className="body7 text-red">{errorMessage}</p>
      </div>
    )}
  </div>
);
