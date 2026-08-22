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
  profileImageNumber?: number;
  profileImageUrl?: string;
}

interface StackAvatarProps {
  item: AvatarStackItem;
  zIndex: number;
  hiddenCount?: number;
}

const resolveAvatarImage = (item: AvatarStackItem) => {
  if (item.profileImageUrl) return item.profileImageUrl;
  if (item.profileImageNumber !== undefined) {
    return getCharacterImage(item.profileImageNumber);
  }
  return CHARACTER_FALLBACK_IMAGE;
};

const StackAvatar = ({ item, zIndex, hiddenCount }: StackAvatarProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{ zIndex }}
      className="border-border-4 rounded-8 relative size-9 shrink-0 overflow-hidden border bg-white"
    >
      <Image
        src={hasError ? CHARACTER_FALLBACK_IMAGE : resolveAvatarImage(item)}
        alt={item.name}
        fill
        sizes="38px"
        className="object-cover"
        onError={() => setHasError(true)}
      />

      {hiddenCount ? (
        <div className="body6 absolute inset-0 flex items-center justify-center bg-black/51 text-white">
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
    <div className="flex -space-x-4.25">
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
