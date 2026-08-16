import Image from "next/image";

import { cn } from "@/lib/utils";

export interface ParticipantStackItemProps {
  image: string;
  nickname: string;
  remainingMinutes: number;
  isHighlighted?: boolean;
}

export const ParticipantStackItem = ({
  image,
  nickname,
  remainingMinutes,
  isHighlighted = false,
}: ParticipantStackItemProps) => {
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between",
        isHighlighted
          ? "bg-primary-light-active rounded-t-20 px-4 py-5.25"
          : "py-3 px-4"
      )}
    >
      <div className="flex items-center gap-2.75">
        <div className="border-border-4 relative size-9 shrink-0 overflow-hidden rounded-[0.75rem] border bg-white">
          <Image src={image} alt={nickname} fill className="object-cover" />
        </div>
        <div className="flex flex-col">
          <p className="body1 text-primary">{nickname}</p>
        </div>
      </div>

      <div className="flex items-end gap-1">
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
    </div>
  );
};
