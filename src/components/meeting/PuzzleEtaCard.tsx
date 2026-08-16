import Image from "next/image";

import { cn } from "@/lib/utils";

export const CORNER_ROUNDING = {
  "top-left": "rounded-tl-20 rounded-tr-20 rounded-bl-20",
  "top-right": "rounded-tl-20 rounded-tr-20 rounded-br-20",
  "bottom-left": "rounded-tl-20 rounded-bl-20 rounded-br-20",
  "bottom-right": "rounded-tr-20 rounded-bl-20 rounded-br-20",
} as const;

export type PuzzleEtaCardPosition = keyof typeof CORNER_ROUNDING;

export interface PuzzleEtaCardProps {
  position: PuzzleEtaCardPosition;
  backgroundClassName: string;
  textClassName?: string;
  image: string;
  nickname: string;
  remainingMinutes: number;
}

export const PuzzleEtaCard = ({
  position,
  backgroundClassName,
  textClassName = "text-primary",
  image,
  nickname,
  remainingMinutes,
}: PuzzleEtaCardProps) => {
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return (
    <div
      className={cn(
        "flex size-full flex-col justify-between p-3",
        CORNER_ROUNDING[position],
        backgroundClassName
      )}
    >
      <div className="items-top flex gap-2">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-[0.75rem] bg-white">
          <Image src={image} alt={nickname} fill className="object-cover" />
        </div>
        <p className={cn("body1", textClassName)}>{nickname}</p>
      </div>

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
    </div>
  );
};
