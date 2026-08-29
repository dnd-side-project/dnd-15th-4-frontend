"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import { checkIsHost } from "@/utils/participant";
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

  useEffect(() => {
    setHasError(false);
  }, [participant.profileImageUrl]);

  const isMe = myId !== undefined && participant.id === myId;
  const isHost = checkIsHost(hostId, participant.id);

  const displayName = isMe ? `${participant.name}(나)` : participant.name;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative size-13.5">
        <div className="border-border-4 rounded-16 size-full overflow-hidden border-2 bg-white">
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

        {isHost && (
          <span className="bg-sub2-normal body8 rounded-pill absolute -top-1 -right-2 px-1.5 py-0.5 font-medium text-white">
            방장
          </span>
        )}
      </div>

      <span className="body6 text-primary">{displayName}</span>
    </div>
  );
};
