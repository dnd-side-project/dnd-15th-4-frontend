import Image from "next/image";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

import pinImage from "@/assets/images/pin.png";

export interface PlaceMarkerProps {
  position: { lat: number; lng: number };
  placeName?: string;
}

export const PlaceMarker = ({ position, placeName }: PlaceMarkerProps) => (
  <AdvancedMarker position={position}>
    <div className="flex flex-col items-center">
      <Image src={pinImage} alt="" width={42} height={42} />
      {placeName && (
        <p className="body5 text-primary py-1 whitespace-nowrap">{placeName}</p>
      )}
    </div>
  </AdvancedMarker>
);
