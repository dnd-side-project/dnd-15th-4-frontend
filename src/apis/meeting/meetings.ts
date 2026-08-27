import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type {
  MeetingCreateRequest,
  MeetingCreateResponse,
  MeetingData,
  MeetingInProgressResponse,
  MeetingDetailResponse,
  MeetingInviteCodeResponse,
  MeetingJoinRequest,
  MeetingJoinResponse,
  MeetingMemberNicknameUpdateResponse,
  MeetingMemberPuzzleImageUpdateResponse,
  MeetingPreviewRequest,
  MeetingPreviewResponse,
  MeetingResultResponse,
  MeetingStatus,
  MeetingUpdateRequest,
} from "@/types/meeting";

const MEETING_STATUS_QUERY_PARAM: Record<MeetingStatus, string> = {
  WAITING: "waiting",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELED: "canceled",
};

export const fetchMeetings = async (
  status?: MeetingStatus
): Promise<MeetingData[]> => {
  const result = await api.get<ApiResult<MeetingData[]>>("/meetings", {
    params: status ? { status: MEETING_STATUS_QUERY_PARAM[status] } : undefined,
  });
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
    "/meetings",
    formData
  );
  return result.data;
};

export const fetchMeetingInProgress = async (
  meetingId: number
): Promise<MeetingInProgressResponse> => {
  const result = await api.get<ApiResult<MeetingInProgressResponse>>(
    `/meetings/${meetingId}/in-progress`
  );
  return result.data;
};

export const fetchMeetingResult = async (
  meetingId: number
): Promise<MeetingResultResponse> => {
  const result = await api.get<ApiResult<MeetingResultResponse>>(
    `/meetings/${meetingId}/result`
  );
  return result.data;
};

export const fetchInviteCode = async (
  meetingId: number
): Promise<MeetingInviteCodeResponse> => {
  const result = await api.get<ApiResult<MeetingInviteCodeResponse>>(
    `/meetings/${meetingId}/invite-code`
  );
  return result.data;
};

export const previewMeeting = async (
  request: MeetingPreviewRequest
): Promise<MeetingPreviewResponse> => {
  const result = await api.post<ApiResult<MeetingPreviewResponse>>(
    "/meetings/preview",
    request
  );
  return result.data;
};

export const fetchMeetingDetail = async (
  meetingId: number
): Promise<MeetingDetailResponse> => {
  const result = await api.get<ApiResult<MeetingDetailResponse>>(
    `/meetings/${meetingId}`
  );
  return result.data;
};

export const updateMeeting = async (
  meetingId: number,
  request: MeetingUpdateRequest
): Promise<void> => {
  await api.patch(`/meetings/${meetingId}`, request);
};

export const deleteMeeting = async (meetingId: number): Promise<void> => {
  await api.delete(`/meetings/${meetingId}`);
};

export const updateMemberNickname = async (
  meetingId: number,
  nickname: string
): Promise<MeetingMemberNicknameUpdateResponse> => {
  const result = await api.patch<
    ApiResult<MeetingMemberNicknameUpdateResponse>
  >(`/meetings/${meetingId}/members/me/nickname`, { nickname });
  return result.data;
};

export const updateMemberPuzzleImage = async (
  meetingId: number,
  image: File
): Promise<MeetingMemberPuzzleImageUpdateResponse> => {
  const formData = new FormData();
  formData.append("image", image);

  const result = await api.patch<
    ApiResult<MeetingMemberPuzzleImageUpdateResponse>
  >(`/meetings/${meetingId}/members/me/puzzle-image`, formData);
  return result.data;
};

export const leaveMeeting = async (meetingId: number): Promise<void> => {
  await api.delete(`/meetings/${meetingId}/members/me`);
};

export const joinMeeting = async (
  request: MeetingJoinRequest,
  image?: File
): Promise<MeetingJoinResponse> => {
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(request)], { type: "application/json" })
  );
  if (image) formData.append("image", image);

  const result = await api.post<ApiResult<MeetingJoinResponse>>(
    "/meetings/members",
    formData
  );
  return result.data;
};
