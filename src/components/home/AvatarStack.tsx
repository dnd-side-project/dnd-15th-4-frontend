"use client";

import Image from "next/image";
import { useState } from "react";

import {
  CHARACTER_FALLBACK_IMAGE,
  getCharacterImage,
} from "@/constants/character-images";

export interface AvatarStackItem {
  id: number;
  name: string;
  profileImageNumber: number;
}

interface StackAvatarProps {
  item: AvatarStackItem;
  zIndex: number;
  hiddenCount?: number;
}

const StackAvatar = ({ item, zIndex, hiddenCount }: StackAvatarProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{ zIndex }}
      className="border-border-4 rounded-8 relative size-9 shrink-0 overflow-hidden border bg-white"
    >
      <Image
        src={
          hasError
            ? CHARACTER_FALLBACK_IMAGE
            : getCharacterImage(item.profileImageNumber)
        }
        alt={item.name}
        fill
        sizes="38px"
        className="object-cover"
        onError={() => setHasError(true)}
      />

      {hiddenCount ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/51 text-[14px] font-semibold text-white">
          +{hiddenCount}
        </div>
      ) : null}
    </div>
  );
};

interface AvatarStackProps {
  participants: AvatarStackItem[];
  maxVisible?: number;
}

export const AvatarStack = ({
  participants,
  maxVisible = 3,
}: AvatarStackProps) => {
  const visibleParticipants = participants.slice(0, maxVisible);
  const hiddenCount = participants.length - visibleParticipants.length;

  return (
    <div className="flex -space-x-2">
      {visibleParticipants.map((item, index) => (
        <StackAvatar
          key={item.id}
          item={item}
          zIndex={10 - index}
          hiddenCount={index === 0 ? hiddenCount : undefined}
        />
      ))}
    </div>
  );
};
