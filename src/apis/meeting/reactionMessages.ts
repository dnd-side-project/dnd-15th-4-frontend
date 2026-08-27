import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type { MeetingQuickMessage } from "@/types/meeting";

export const fetchReactionPresets = async (): Promise<
  MeetingQuickMessage[]
> => {
  const result = await api.get<ApiResult<MeetingQuickMessage[]>>(
    "/meetings/reaction-presets"
  );
  return result.data;
};

export interface SendReactionMessageRequest {
  presetId: number;
}

export const sendReactionMessage = async (
  meetingId: number,
  request: SendReactionMessageRequest
): Promise<void> => {
  await api.post<ApiResult<null>>(
    `/meetings/${meetingId}/reaction-messages`,
    request
  );
};
