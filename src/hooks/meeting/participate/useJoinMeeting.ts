"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { joinMeeting } from "@/apis/meeting/meetings";
import type { MeetingJoinRequest } from "@/types/meeting";

export interface JoinMeetingVariables {
  request: MeetingJoinRequest;
  image: File;
}

export const useJoinMeetingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, image }: JoinMeetingVariables) =>
      joinMeeting(request, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingKeys.lists() });
    },
  });
};
