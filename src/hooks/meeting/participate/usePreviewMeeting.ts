"use client";

import { useQuery } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { previewMeeting } from "@/apis/meeting/meetings";
import { useDebounce } from "@/hooks/common/useDebounce";

const INVITE_CODE_LENGTH = 8;

export const usePreviewMeetingQuery = (inviteCode: string) => {
  const debouncedCode = useDebounce(inviteCode.trim(), 300);

  return useQuery({
    queryKey: meetingKeys.preview(debouncedCode),
    queryFn: () => previewMeeting({ inviteCode: debouncedCode }),
    enabled: debouncedCode.length === INVITE_CODE_LENGTH,
    retry: false,
  });
};
