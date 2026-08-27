import Image from "next/image";
import type { StaticImageData } from "next/image";

import { IcArrowOutward } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface ParticipantStatusAvatarProps {
  image: string | StaticImageData;
  nickname: string;
  minutesAgoLabel?: string;
  hasDeparted?: boolean;
  onClick?: () => void;
}

export const ParticipantStatusAvatar = ({
  image,
  nickname,
  minutesAgoLabel,
  hasDeparted = true,
  onClick,
}: ParticipantStatusAvatarProps) => {
  return (
    <div className={cn("relative shrink-0 pt-1", minutesAgoLabel && "pr-1")}>
      <button
        type="button"
        onClick={hasDeparted ? onClick : undefined}
        disabled={!hasDeparted}
        className="border-border-4 rounded-16 relative size-13.5 overflow-hidden border-2 disabled:cursor-default"
      >
        <Image
          src={image}
          alt={nickname}
          width={44}
          height={44}
          className="size-full object-cover"
        />
        {hasDeparted && (
          <>
            <div className="absolute inset-0 bg-black/52 mix-blend-hard-light" />
            <div className="absolute inset-0 flex items-center justify-center">
              <IcArrowOutward size={22} className="text-white" />
            </div>
          </>
        )}
      </button>
      {minutesAgoLabel && (
        <span className="bg-sub2-normal border-sub2-normal rounded-pill absolute top-0 right-0 flex items-center justify-center border-2 px-2 text-[0.5625rem] whitespace-nowrap text-white">
          {minutesAgoLabel}
        </span>
      )}
    </div>
  );
};
