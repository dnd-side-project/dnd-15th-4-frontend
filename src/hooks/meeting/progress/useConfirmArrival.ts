"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { confirmMemberArrival } from "@/apis/meeting/arrival";
import { meetingKeys } from "@/apis/meeting/keys";

export const useConfirmArrivalMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => confirmMemberArrival(meetingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meetingKeys.inProgress(meetingId),
      });
    },
  });
};
