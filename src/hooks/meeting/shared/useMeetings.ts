"use client";

import { useQuery } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { fetchMeetings } from "@/apis/meeting/meetings";

export const useMeetingsQuery = () =>
  useQuery({
    queryKey: meetingKeys.list(),
    queryFn: fetchMeetings,
  });
