"use client";

import { useEffect, useState } from "react";

import { updateMemberLocation } from "@/apis/meeting/location";
import { getDistanceInMeters } from "@/utils/geo";
import type { UserLocation } from "@/types/meeting";

const ARRIVAL_PROXIMITY_METERS = 50;

export const useSendMemberLocation = (
  meetingId: number,
  enabled: boolean,
  destinationLatitude: number | null,
  destinationLongitude: number | null,
  // 약속 진행 상황 폴링(dataUpdatedAt)이 갱신될 때마다 같이 위치를 보낸다.
  // 별도의 setInterval을 두면 두 타이머의 시작 시점이 달라 위상이 어긋나기 때문에,
  // 하나의 이벤트(폴링 성공)에 묶어 항상 같은 타이밍에 동작하도록 한다.
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
      },
      () => {},
      // 기본값(false)이면 Wi-Fi/기지국 기반 저정밀 위치가 반환될 수 있어
      // 500m 반경 판정이 실제 위치와 크게 어긋날 수 있다
      { enableHighAccuracy: true }
    );
    // destinationLatitude/Longitude를 deps에 넣지 않는다: 폴링으로 목적지 좌표가 뒤늦게
    // 도착해도 새로 GPS를 다시 요청하지 않고, 아래 파생값이 즉시 재계산되도록 한다.
  }, [meetingId, enabled, syncTick]);

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
