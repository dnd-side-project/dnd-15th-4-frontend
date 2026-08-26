"use client";

import Image from "next/image";
import { useState } from "react";

import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import type { Participant } from "@/types/meeting";

export interface ParticipantAvatarProps {
  participant: Participant;
  isMe: boolean;
}

export const ParticipantAvatar = ({
  participant,
  isMe,
}: ParticipantAvatarProps) => {
  const [hasError, setHasError] = useState(false);

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
      <span className="body6 text-primary">
        {isMe ? `${participant.name}(나)` : participant.name}
      </span>
    </div>
  );
};
