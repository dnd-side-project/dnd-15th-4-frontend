"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { updateMemberLocation } from "@/apis/meeting/location";

const LOCATION_SEND_INTERVAL_MS = 60000;

export const useSendMemberLocation = (meetingId: number, enabled: boolean) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (
      !enabled ||
      typeof navigator === "undefined" ||
      !navigator.geolocation
    ) {
      return;
    }

    const sendCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        updateMemberLocation(meetingId, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: meetingKeys.inProgress(meetingId),
            });
          })
          .catch(() => {});
      });
    };

    sendCurrentLocation();
    const intervalId = setInterval(
      sendCurrentLocation,
      LOCATION_SEND_INTERVAL_MS
    );

    return () => clearInterval(intervalId);
  }, [meetingId, enabled, queryClient]);
};
