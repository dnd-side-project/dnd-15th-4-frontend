"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

import { cn } from "@/lib/utils";

// Google's public prototyping Map ID — required to render AdvancedMarker without provisioning a real Map ID in Cloud Console.
const DEMO_MAP_ID = "DEMO_MAP_ID";

export interface MeetingMapFocusLocation {
  lat: number;
  lng: number;
  // 지도 픽셀 기준으로 pin을 중심보다 위로 밀어올릴 거리(바텀시트에 가려지는 높이의 절반)
  offsetY?: number;
}

export interface MeetingMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  focusLocation?: MeetingMapFocusLocation | null;
  className?: string;
  children?: ReactNode;
}

interface MapFocusControllerProps {
  location: MeetingMapFocusLocation | null | undefined;
}

const getShiftedCenter = (
  map: google.maps.Map,
  target: google.maps.LatLngLiteral,
  offsetY: number
): google.maps.LatLngLiteral | null => {
  const projection = map.getProjection();
  const zoom = map.getZoom();
  if (!projection || zoom === undefined) return null;

  const scale = 2 ** zoom;
  const worldPoint = projection.fromLatLngToPoint(target);
  if (!worldPoint) return null;

  const shiftedPoint = new google.maps.Point(
    worldPoint.x,
    worldPoint.y + offsetY / scale
  );
  const shiftedLatLng = projection.fromPointToLatLng(shiftedPoint);
  if (!shiftedLatLng) return null;

  return { lat: shiftedLatLng.lat(), lng: shiftedLatLng.lng() };
};

const MapFocusController = ({ location }: MapFocusControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !location) return;

    const target = { lat: location.lat, lng: location.lng };
    const shiftedCenter = location.offsetY
      ? getShiftedCenter(map, target, location.offsetY)
      : null;

    map.panTo(shiftedCenter ?? target);
  }, [map, location]);

  return null;
};

export const MeetingMap = ({
  center,
  zoom = 15,
  focusLocation,
  className,
  children,
}: MeetingMapProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return null;

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId={DEMO_MAP_ID}
        defaultCenter={center}
        defaultZoom={zoom}
        disableDefaultUI
        gestureHandling="greedy"
        className={cn("size-full", className)}
      >
        <MapFocusController location={focusLocation} />
        {children}
      </Map>
    </APIProvider>
  );
};
