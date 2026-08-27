import type { Ref } from "react";
import { useRouter } from "next/navigation";

import { PopoverMenu } from "@/components/common/PopoverMenu";
import { IcMoreVert } from "@/components/icons";
import { cn } from "@/lib/utils";

const HOME_HREF = "/";

interface MeetingSummaryCardProps {
  title: string;
  location: string;
  time: string;
  remainingTime: string;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export const MeetingSummaryCard = ({
  title,
  location,
  time,
  remainingTime,
  className,
  ref,
}: MeetingSummaryCardProps) => {
  const router = useRouter();

  const menuItems = [
    { label: "홈으로 이동", onClick: () => router.push(HOME_HREF) },
    { label: "약속 정보 수정하기", onClick: () => router.push(HOME_HREF) },
  ];

  return (
    <div
      ref={ref}
      className={cn(
        "bg-sub2-normal flex items-start justify-between gap-1 rounded-[1.375rem] py-3 pl-6 text-white backdrop-blur-[0.21875rem]",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 justify-between">
        <div className="mr-2 flex min-w-0 flex-col">
          <p className="h2">{title}</p>
          <div className="flex h-6.5 items-center">
            <span className="body6 min-w-0 truncate leading-6.5 text-white/71">
              {location}
            </span>
            <span className="mx-1.25 h-2.25 w-px shrink-0 bg-white/71" />
            <span className="body6 shrink-0 leading-6.5 text-white/71">
              {time}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col">
          <span className="body6 leading-6.5 text-white/71">남은시간</span>
          <p className="h2">{remainingTime}</p>
        </div>
      </div>
      <PopoverMenu
        triggerAriaLabel="더보기"
        triggerClassName="flex size-12 items-center justify-center"
        triggerContent={<IcMoreVert size={25.57} className="text-white/60" />}
        items={menuItems}
        side="bottom"
        align="end"
        sideOffset={28}
        menuWidthClassName="w-39.25"
      />
    </div>
  );
};
