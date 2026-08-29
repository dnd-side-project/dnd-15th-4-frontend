"use client";

import { useEffect, useState } from "react";

import { updateMemberLocation } from "@/apis/meeting/location";
import { getDistanceInMeters } from "@/utils/geo";
import type { UserLocation } from "@/types/meeting";

const ARRIVAL_PROXIMITY_METERS = 500;

export const useArrivalProximityCheck = (
  meetingId: number,
  enabled: boolean,
  destinationLatitude: number | null,
  destinationLongitude: number | null,
  syncTick: number
) => {
  const [myLocation, setMyLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    if (
      !enabled ||
      typeof navigator === "undefined" ||
      !navigator.geolocation
    ) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation: UserLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setMyLocation(currentLocation);
        updateMemberLocation(meetingId, currentLocation).catch(() => {});

        if (destinationLatitude !== null && destinationLongitude !== null) {
          const distanceInMeters = getDistanceInMeters(currentLocation, {
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          });
          console.info(
            `[도착 거리] 목적지까지 ${distanceInMeters.toFixed(1)}m 남음`
          );
        }
      },
      () => {
        setMyLocation(null);
      },
      { enableHighAccuracy: true }
    );
  }, [meetingId, enabled, syncTick, destinationLatitude, destinationLongitude]);

  const isNearDestination =
    myLocation !== null &&
    destinationLatitude !== null &&
    destinationLongitude !== null &&
    getDistanceInMeters(myLocation, {
      latitude: destinationLatitude,
      longitude: destinationLongitude,
    }) <= ARRIVAL_PROXIMITY_METERS;

  return { isNearDestination };
};
