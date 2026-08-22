import type { Ref } from "react";

import { IcMoreVert } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface MeetingSummaryCardProps {
  title: string;
  location: string;
  time: string;
  remainingTime: string;
  onMoreClick?: () => void;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export const MeetingSummaryCard = ({
  title,
  location,
  time,
  remainingTime,
  onMoreClick,
  className,
  ref,
}: MeetingSummaryCardProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-sub2-normal flex items-start justify-between gap-1 rounded-[1.375rem] py-3 pr-4 pl-6 text-white backdrop-blur-[0.21875rem]",
        className
      )}
    >
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <p className="h2">{title}</p>
          <div className="flex h-6.5 items-center">
            <span className="body6 leading-6.5 text-white/71">{location}</span>
            <span className="mx-1.25 h-2.25 w-px bg-white/71" />
            <span className="body6 leading-6.5 text-white/71">{time}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="body6 leading-6.5 text-white/71">남은시간</span>
          <p className="h2">{remainingTime}</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="더보기"
        onClick={onMoreClick}
        className="-mr-1 flex size-12 items-center justify-center"
      >
        <IcMoreVert size={25.57} className="text-white/60" />
      </button>
    </div>
  );
};
