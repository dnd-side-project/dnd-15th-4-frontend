"use client";

import { useRouter } from "next/navigation";
import { PopoverMenu } from "@/components/common/PopoverMenu";
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
    <PopoverMenu
      triggerAriaLabel="약속 생성 및 참여"
      triggerClassName="bg-sub2-normal rounded-pill size-15.5rem absolute right-4 bottom-6 z-20 flex cursor-pointer items-center justify-center shadow-lg"
      triggerContent={<IcPlus size={62} className="text-white" />}
      items={menuItems}
      side="top"
      align="end"
    />
  );
};
