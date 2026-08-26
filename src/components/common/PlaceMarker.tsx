import Image from "next/image";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

import pinImage from "@/assets/images/pin.png";

export interface PlaceMarkerProps {
  position: { lat: number; lng: number };
}

export const PlaceMarker = ({ position }: PlaceMarkerProps) => (
  <AdvancedMarker position={position}>
    <Image src={pinImage} alt="" width={42} height={42} />
  </AdvancedMarker>
);
