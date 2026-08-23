"use client";

import { useRouter } from "next/navigation";
import { Popover } from "@base-ui/react/popover";
import { IcPlus } from "@/components/icons";

export interface FloatingActionButtonProps {
  onParticipateClick: () => void;
}

const CREATE_MEETING_HREF = "/meeting/create";

export const FloatingActionButton = ({
  onParticipateClick,
}: FloatingActionButtonProps) => {
  const router = useRouter();

  const menuItems = [
    { label: "약속방 만들기", onClick: () => router.push(CREATE_MEETING_HREF) },
    { label: "초대 코드로 참여하기", onClick: onParticipateClick },
  ];

  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="약속 생성 및 참여"
        className="bg-sub2-normal rounded-pill size-15.5rem absolute right-4 bottom-12 flex cursor-pointer items-center justify-center shadow-lg"
      >
        <IcPlus size={62} className="text-white" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner
          side="top"
          align="end"
          sideOffset={8}
          className={"z-50"}
        >
          <Popover.Popup className="rounded-16 divide-border-1 flex w-48.25 flex-col divide-y overflow-hidden bg-white px-4.5 py-0 shadow-lg">
            {menuItems.map(({ label, onClick }) => (
              <Popover.Close
                key={label}
                onClick={onClick}
                className="body2 text-primary hover:text-secondary-1 cursor-pointer py-4 text-left transition-colors"
              >
                {label}
              </Popover.Close>
            ))}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
