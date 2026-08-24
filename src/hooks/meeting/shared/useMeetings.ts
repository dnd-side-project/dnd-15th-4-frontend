"use client";

import { useQueries, useQuery } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { fetchMeetings } from "@/apis/meeting/meetings";
import type { MeetingData } from "@/types/meeting";

export const useMeetingsQuery = () =>
  useQuery({
    queryKey: meetingKeys.list(),
    queryFn: () => fetchMeetings(),
  });

const HOME_MEETING_STATUSES = ["waiting", "in-progress"] as const;

export const useHomeMeetingsQuery = () => {
  return useQueries({
    queries: HOME_MEETING_STATUSES.map((status) => ({
      queryKey: meetingKeys.list({ status }),
      queryFn: () => fetchMeetings(status),
    })),
    combine: (results) => {
      const isPending = results.some((result) => result.isPending);
      const isError = results.some((result) => result.isError);

      const data: MeetingData[] | undefined = results.every(
        (result) => result.data !== undefined
      )
        ? results.flatMap((result) => result.data ?? [])
        : undefined;

      return {
        data,
        isPending,
        isLoading: isPending,
        isError,
      };
    },
  });
};
