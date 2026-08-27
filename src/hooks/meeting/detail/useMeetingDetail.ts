"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import {
  deleteMeeting,
  fetchMeetingDetail,
  updateMeeting,
} from "@/apis/meeting/meetings";
import type { MeetingUpdateRequest } from "@/types/meeting";

export const useMeetingDetailQuery = (meetingId: number) =>
  useQuery({
    queryKey: meetingKeys.fullDetail(meetingId),
    queryFn: () => fetchMeetingDetail(meetingId),
    enabled: meetingId > 0,
  });

export const useUpdateMeetingMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: MeetingUpdateRequest) =>
      updateMeeting(meetingId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: meetingKeys.detail(meetingId),
      });
      queryClient.invalidateQueries({
        queryKey: meetingKeys.fullDetail(meetingId),
      });
    },
  });
};

export const useDeleteMeetingMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMeeting(meetingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingKeys.lists() });
    },
  });
};
