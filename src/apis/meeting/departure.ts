import { api } from "@/lib/api/http-client";
import { HttpError } from "@/lib/api/http-error";
import type { ApiResult } from "@/types/api";
import type {
  MeetingMemberDepartureCreateRequest,
  MeetingMemberDepartureResponse,
} from "@/types/meeting";

export const getMemberDeparture = async (
  meetingId: number
): Promise<MeetingMemberDepartureResponse | null> => {
  try {
    const result = await api.get<ApiResult<MeetingMemberDepartureResponse>>(
      `/meetings/${meetingId}/members/me/departure`
    );
    return result.data;
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) return null;
    throw error;
  }
};

export const createMemberDeparture = async (
  meetingId: number,
  request: MeetingMemberDepartureCreateRequest
): Promise<MeetingMemberDepartureResponse> => {
  const result = await api.post<ApiResult<MeetingMemberDepartureResponse>>(
    `/meetings/${meetingId}/members/me/departure`,
    request
  );
  return result.data;
};
