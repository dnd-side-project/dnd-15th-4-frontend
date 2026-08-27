"use client";

import { useQuery } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { fetchMeetingResult } from "@/apis/meeting/meetings";

export const useMeetingResultQuery = (meetingId: number) =>
  useQuery({
    queryKey: meetingKeys.result(meetingId),
    queryFn: () => fetchMeetingResult(meetingId),
    enabled: meetingId > 0,
  });
