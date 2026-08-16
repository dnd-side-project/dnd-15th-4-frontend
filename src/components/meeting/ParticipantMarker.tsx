import Image from "next/image";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

import { getProfileImageUrl } from "@/constants/profileImages";
import type { MeetingParticipant } from "@/types/meeting";

export interface ParticipantMarkerProps {
  participant: MeetingParticipant & { speechBubbleMessage?: string };
}

export const ParticipantMarker = ({ participant }: ParticipantMarkerProps) => {
  const { currentLocation, profileImageNumber, nickname, speechBubbleMessage } =
    participant;

  return (
    <AdvancedMarker
      position={{
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      }}
    >
      <div className="relative">
        {speechBubbleMessage && (
          <div className="border-sub2-normal absolute bottom-full left-1/2 -mb-1 -translate-x-1/2 rounded-full border bg-white px-2 py-1 whitespace-nowrap">
            <p className="body3 text-primary">{speechBubbleMessage}</p>
          </div>
        )}
        <div className="border-border-4 rounded-16 shadow-1 size-13.5 overflow-hidden border-2 bg-white">
          <Image
            src={getProfileImageUrl(profileImageNumber)}
            alt={nickname}
            width={54}
            height={54}
            className="size-full object-cover"
          />
        </div>
      </div>
    </AdvancedMarker>
  );
};
