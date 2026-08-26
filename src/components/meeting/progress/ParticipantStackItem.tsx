import Image from "next/image";
import type { StaticImageData } from "next/image";

import { PillButton } from "@/components/common/PillButton";
import { IcAlarm } from "@/components/icons";
import { useArrivalConfirmation } from "@/hooks/meeting/progress/useArrivalConfirmation";
import { cn } from "@/lib/utils";

export interface ParticipantStackItemProps {
  image: string | StaticImageData;
  nickname: string;
  hasDeparted: boolean;
  elapsedMinutes: number;
  isHighlighted?: boolean;
  isArrived?: boolean;
}

export const ParticipantStackItem = ({
  image,
  nickname,
  hasDeparted,
  elapsedMinutes,
  isHighlighted = false,
  isArrived = false,
}: ParticipantStackItemProps) => {
  const hours = Math.floor(elapsedMinutes / 60);
  const minutes = elapsedMinutes % 60;

  const {
    confirmationStep,
    remainingSeconds,
    isConfirmed,
    handleStartConfirmation,
    handleCancelConfirmation,
  } = useArrivalConfirmation(isArrived);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between",
        isHighlighted
          ? "bg-primary-light-active rounded-t-20 px-4 py-5.25 h-23.5"
          : "pt-4 pb-3 px-4 h-20.5"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="border-border-4 relative size-9 shrink-0 overflow-hidden rounded-xl border bg-white">
          <Image src={image} alt={nickname} fill className="object-cover" />
        </div>
        <div className="flex flex-col">
          <p className="body1 text-primary">{nickname}</p>
          {isConfirmed && <p className="body6 text-secondary-2">도착</p>}
          {!hasDeparted && !isConfirmed && (
            <p className="body6 text-secondary-2">출발 전</p>
          )}
        </div>
      </div>

      {isArrived && !isConfirmed && (
        <PillButton
          text={
            confirmationStep === "confirming"
              ? `취소 (${remainingSeconds})`
              : "도착시 눌러주세요"
          }
          icon={
            confirmationStep === "confirming" ? undefined : (
              <IcAlarm size={18} className="text-white" />
            )
          }
          onClick={
            confirmationStep === "confirming"
              ? handleCancelConfirmation
              : handleStartConfirmation
          }
          className="w-39"
        />
      )}

      {!isArrived && hasDeparted && (
        <div className="flex h-13.5 items-end gap-1">
          {hours > 0 && (
            <div className="flex items-baseline">
              <span className="puzzle-eta text-primary">{hours}</span>
              <span className="body6 text-primary">시간</span>
            </div>
          )}
          <div className="flex items-baseline">
            <span className="puzzle-eta text-primary">{minutes}</span>
            <span className="body6 text-primary">분</span>
          </div>
        </div>
      )}
    </div>
  );
};
