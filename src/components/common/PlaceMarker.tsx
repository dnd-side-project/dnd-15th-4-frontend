import Image from "next/image";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

import pinImage from "@/assets/images/pin.png";

export interface PlaceMarkerProps {
  position: { lat: number; lng: number };
  placeName?: string;
}

export const PlaceMarker = ({ position, placeName }: PlaceMarkerProps) => (
  <AdvancedMarker position={position}>
    <div className="relative">
      <Image src={pinImage} alt="" width={42} height={42} />
      {placeName && (
        <p
          className="body3 text-primary absolute top-full left-1/2 -translate-x-1/2 py-1 whitespace-nowrap [-webkit-text-stroke:4px_#ffffff]"
          style={{ paintOrder: "stroke fill" }}
        >
          {placeName}
        </p>
      )}
    </div>
  </AdvancedMarker>
);
