import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type {
  MeetingCreateRequest,
  MeetingCreateResponse,
  MeetingData,
  MeetingInviteCodeResponse,
} from "@/types/meeting";

export const fetchMeetings = async (): Promise<MeetingData[]> => {
  const result = await api.get<ApiResult<MeetingData[]>>("/api/v1/meetings");
  return result.data;
};

export const createMeeting = async (
  request: MeetingCreateRequest,
  image: File
): Promise<MeetingCreateResponse> => {
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(request)], { type: "application/json" })
  );
  formData.append("image", image);

  const result = await api.post<ApiResult<MeetingCreateResponse>>(
    "/api/v1/meetings",
    formData
  );
  return result.data;
};

export const fetchInviteCode = async (
  meetingId: number
): Promise<MeetingInviteCodeResponse> => {
  const result = await api.get<ApiResult<MeetingInviteCodeResponse>>(
    `/api/v1/meetings/${meetingId}/invite-code`
  );
  return result.data;
};
