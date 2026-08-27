import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type { MeetingRoute, MeetingRouteSearchRequest } from "@/types/meeting";

interface MeetingRouteSearchResponse {
  routes: MeetingRoute[];
}

export const searchMeetingRoutes = async (
  meetingId: number,
  request: MeetingRouteSearchRequest
): Promise<MeetingRoute[]> => {
  const result = await api.post<ApiResult<MeetingRouteSearchResponse>>(
    `/meetings/${meetingId}/routes`,
    request
  );
  return result.data.routes;
};
