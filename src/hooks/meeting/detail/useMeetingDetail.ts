"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import {
  deleteMeeting,
  fetchMeetingDetail,
  updateMeeting,
  updateMemberNickname,
  updateMemberPuzzleImage,
} from "@/apis/meeting/meetings";
import type { MeetingUpdateRequest } from "@/types/meeting";

export const useMeetingDetailQuery = (meetingId: number, enabled = true) =>
  useQuery({
    queryKey: meetingKeys.fullDetail(meetingId),
    queryFn: () => fetchMeetingDetail(meetingId),
    enabled: meetingId > 0 && enabled,
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

export interface UpdateMemberNicknameVariables {
  nickname: string;
  nicknameSet: boolean;
}

export const useUpdateMemberNicknameMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nickname, nicknameSet }: UpdateMemberNicknameVariables) =>
      updateMemberNickname(meetingId, nickname, nicknameSet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: meetingKeys.fullDetail(meetingId),
      });
    },
  });
};

export interface UpdateMemberPuzzleImageVariables {
  image: File;
  imageSet: boolean;
}

export const useUpdateMemberPuzzleImageMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ image, imageSet }: UpdateMemberPuzzleImageVariables) =>
      updateMemberPuzzleImage(meetingId, image, imageSet),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meetingKeys.fullDetail(meetingId),
      });
    },
  });
};
