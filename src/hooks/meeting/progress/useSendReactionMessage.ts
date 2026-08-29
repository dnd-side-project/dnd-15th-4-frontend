"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { sendReactionMessage } from "@/apis/meeting/reactionMessages";

export const useSendReactionMessageMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (presetId: number) =>
      sendReactionMessage(meetingId, { presetId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meetingKeys.inProgress(meetingId),
      });
    },
  });
};
