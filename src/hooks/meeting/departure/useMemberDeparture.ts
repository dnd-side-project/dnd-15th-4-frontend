"use client";

import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createMemberDeparture,
  getMemberDeparture,
  updateMemberDeparture,
} from "@/apis/meeting/departure";
import { meetingKeys } from "@/apis/meeting/keys";
import type {
  MeetingMemberDepartureCreateRequest,
  MeetingMemberDepartureUpdateRequest,
} from "@/types/meeting";

export const useMemberDepartureQuery = (meetingId: number | null) =>
  useQuery({
    queryKey: meetingKeys.departure(meetingId ?? -1),
    queryFn: () => getMemberDeparture(meetingId as number),
    enabled: meetingId !== null,
  });

export const useDeparturesQuery = (meetingIds: number[]) =>
  useQueries({
    queries: meetingIds.map((meetingId) => ({
      queryKey: meetingKeys.departure(meetingId),
      queryFn: () => getMemberDeparture(meetingId),
    })),
    combine: (results) => {
      const departedIndex = results.findIndex((result) => Boolean(result.data));

      return {
        departedMeetingId:
          departedIndex === -1 ? null : (meetingIds[departedIndex] ?? null),
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });

export const useCreateMemberDepartureMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: MeetingMemberDepartureCreateRequest) =>
      createMemberDeparture(meetingId, request),
    onSuccess: (data) => {
      queryClient.setQueryData(meetingKeys.departure(meetingId), data);
      queryClient.invalidateQueries({ queryKey: meetingKeys.lists() });
    },
  });
};

export const useUpdateMemberDepartureMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: MeetingMemberDepartureUpdateRequest) =>
      updateMemberDeparture(meetingId, request),
    onSuccess: (data) => {
      queryClient.setQueryData(meetingKeys.departure(meetingId), data);
      queryClient.invalidateQueries({ queryKey: meetingKeys.lists() });
    },
  });
};
