import Image from "next/image";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import type { PuzzleGroupParticipant } from "@/types/meeting";

export interface ParticipantMarkerProps {
  participant: PuzzleGroupParticipant & {
    latitude: number;
    longitude: number;
    speechBubbleMessage?: string;
  };
}

export const ParticipantMarker = ({ participant }: ParticipantMarkerProps) => {
  const {
    latitude,
    longitude,
    profileImageUrl,
    nickname,
    speechBubbleMessage,
  } = participant;

  return (
    <AdvancedMarker position={{ lat: latitude, lng: longitude }}>
      <div className="relative">
        {speechBubbleMessage && (
          <div className="border-sub2-normal absolute bottom-full left-1/2 -mb-1 -translate-x-1/2 rounded-full border bg-white px-2 py-1 whitespace-nowrap">
            <p className="body3 text-primary">{speechBubbleMessage}</p>
          </div>
        )}
        <div className="border-border-4 rounded-16 shadow-1 size-13.5 overflow-hidden border-2 bg-white">
          <Image
            src={profileImageUrl?.trim() || CHARACTER_FALLBACK_IMAGE}
            alt={nickname ?? ""}
            width={54}
            height={54}
            className="size-full object-cover"
          />
        </div>
      </div>
    </AdvancedMarker>
  );
};
