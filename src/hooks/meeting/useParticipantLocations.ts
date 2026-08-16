"use client";

import { useQuery } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { fetchParticipantLocations } from "@/apis/meeting/location";

export const useParticipantLocationsQuery = (
  meetingId: number,
  participantIds: number[]
) =>
  useQuery({
    queryKey: meetingKeys.participantLocations(meetingId),
    queryFn: () => fetchParticipantLocations(participantIds),
    refetchInterval: 5000,
    enabled: participantIds.length > 0,
  });
