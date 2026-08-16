import Image from "next/image";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

import { getProfileImageUrl } from "@/constants/profileImages";
import type { MeetingParticipant } from "@/types/meeting";

export interface ParticipantMarkerProps {
  participant: MeetingParticipant;
}

export const ParticipantMarker = ({ participant }: ParticipantMarkerProps) => {
  const { currentLocation, profileImageNumber, nickname } = participant;

  return (
    <AdvancedMarker
      position={{
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      }}
    >
      <div className="border-border-4 rounded-16 shadow-1 size-13.5 overflow-hidden border-2 bg-white">
        <Image
          src={getProfileImageUrl(profileImageNumber)}
          alt={nickname}
          width={54}
          height={54}
          className="size-full object-cover"
        />
      </div>
    </AdvancedMarker>
  );
};
