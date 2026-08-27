"use client";

import { useMutation } from "@tanstack/react-query";

import { sendReactionMessage } from "@/apis/meeting/reactionMessages";

export const useSendReactionMessageMutation = (meetingId: number) =>
  useMutation({
    mutationFn: (presetId: number) =>
      sendReactionMessage(meetingId, { presetId }),
  });
