"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";

import { PillButton } from "@/components/common/PillButton";
import artwork1 from "@/assets/images/artwork-1.png";
import { IcAlarm } from "@/components/icons";
import { useArrivalConfirmation } from "@/hooks/meeting/progress/useArrivalConfirmation";
import { cn } from "@/lib/utils";

export const CORNER_ROUNDING = {
  "top-left": "rounded-tl-20 rounded-tr-20 rounded-bl-20",
  "top-right": "rounded-tl-20 rounded-tr-20 rounded-br-20",
  "bottom-left": "rounded-tl-20 rounded-bl-20 rounded-br-20",
  "bottom-right": "rounded-tr-20 rounded-bl-20 rounded-br-20",
} as const;

export type PuzzleEtaCardPosition = keyof typeof CORNER_ROUNDING;

// 카드 하나가 전체 정사각형 일러스트의 어느 조각을 보여줄지 결정
const QUADRANT_OFFSET_CLASS: Record<PuzzleEtaCardPosition, string> = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 -left-full",
  "bottom-left": "-top-full left-0",
  "bottom-right": "-top-full -left-full",
};

export interface PuzzleEtaCardProps {
  position: PuzzleEtaCardPosition;
  backgroundClassName: string;
  textClassName?: string;
  image: StaticImageData;
  nickname: string;
  remainingMinutes: number;
  isArrived?: boolean;
}

export const PuzzleEtaCard = ({
  position,
  backgroundClassName,
  textClassName = "text-primary",
  image,
  nickname,
  remainingMinutes,
  isArrived = false,
}: PuzzleEtaCardProps) => {
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  const {
    confirmationStep,
    remainingSeconds,
    isConfirmed,
    handleStartConfirmation,
    handleCancelConfirmation,
  } = useArrivalConfirmation(isArrived);

  const resolvedTextClassName = isConfirmed ? "text-primary" : textClassName;

  return (
    <div
      className={cn(
        "relative flex size-full flex-col justify-between overflow-hidden p-3",
        CORNER_ROUNDING[position],
        isConfirmed ? "bg-black" : backgroundClassName
      )}
    >
      {isConfirmed && (
        <div
          className={cn(
            "absolute size-[200%]",
            QUADRANT_OFFSET_CLASS[position]
          )}
        >
          <Image src={artwork1} alt="" fill className="bg-white object-cover" />
        </div>
      )}

      <div className="relative z-10 flex size-full flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="relative size-8.5 shrink-0 overflow-hidden rounded-xl bg-white">
            <Image src={image} alt={nickname} fill className="object-cover" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className={cn("body1", resolvedTextClassName)}>{nickname}</p>
            <p
              className={cn(
                "body6 text-secondary-2",
                !isConfirmed && "invisible"
              )}
            >
              도착
            </p>
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
          />
        )}

        {!isArrived && (
          <div className="flex items-end justify-end gap-2">
            {hours > 0 && (
              <div className="flex items-baseline">
                <span className={cn("puzzle-eta", textClassName)}>{hours}</span>
                <span className={cn("body6 ml-0.5", textClassName)}>시간</span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className={cn("puzzle-eta", textClassName)}>{minutes}</span>
              <span className={cn("body6 ml-0.5", textClassName)}>분</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
