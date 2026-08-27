"use client";

import { useMutation } from "@tanstack/react-query";

import { searchMeetingRoutes } from "@/apis/meeting/routes";
import type { MeetingRouteSearchRequest } from "@/types/meeting";

export const useSearchMeetingRoutesMutation = (meetingId: number) =>
  useMutation({
    mutationFn: (request: MeetingRouteSearchRequest) =>
      searchMeetingRoutes(meetingId, request),
  });
