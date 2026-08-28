"use client";

import { useQuery } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { fetchMeetingInProgress } from "@/apis/meeting/meetings";

export const useMeetingInProgressQuery = (meetingId: number) =>
  useQuery({
    queryKey: meetingKeys.inProgress(meetingId),
    queryFn: () => fetchMeetingInProgress(meetingId),
    enabled: meetingId > 0,
    refetchInterval: 60000,
  });
