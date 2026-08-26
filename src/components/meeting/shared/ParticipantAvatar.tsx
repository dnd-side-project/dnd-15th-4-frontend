"use client";

import Image from "next/image";
import { useState } from "react";

import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import type { Participant } from "@/types/meeting";

export interface ParticipantAvatarProps {
  participant: Participant;
  hostId?: number;
  myId?: number;
}

export const ParticipantAvatar = ({
  participant,
  hostId,
  myId,
}: ParticipantAvatarProps) => {
  const [hasError, setHasError] = useState(false);

  const isMe = myId !== undefined && participant.id === myId;
  const isHost = hostId !== undefined && participant.id === hostId;

  const getDisplayName = () => {
    if (isMe && isHost) return `${participant.name}(나/방장)`;
    if (isMe) return `${participant.name}(나)`;
    if (isHost) return `${participant.name}(방장)`;
    return participant.name;
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="border-border-4 rounded-16 size-13.5 overflow-hidden border-2 bg-white">
        <Image
          src={
            hasError || !participant.profileImageUrl?.trim()
              ? CHARACTER_FALLBACK_IMAGE
              : participant.profileImageUrl
          }
          alt={participant.name}
          width={54}
          height={54}
          className="size-full object-cover"
          onError={() => setHasError(true)}
        />
      </div>
      <span className="body6 text-primary">{getDisplayName()}</span>
    </div>
  );
};
