"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchReactionPresets } from "@/apis/meeting/reactionMessages";
import { meetingKeys } from "@/apis/meeting/keys";

export const useReactionPresetsQuery = () =>
  useQuery({
    queryKey: meetingKeys.reactionPresets(),
    queryFn: fetchReactionPresets,
  });
