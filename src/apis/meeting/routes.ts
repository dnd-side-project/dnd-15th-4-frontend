import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type {
  MeetingRoute,
  MeetingRouteGuide,
  MeetingRouteSearchRequest,
} from "@/types/meeting";

interface MeetingRouteSearchResponse {
  routes: MeetingRoute[];
  guide: MeetingRouteGuide | null;
}

const requestRoutes = async (
  meetingId: number,
  request: MeetingRouteSearchRequest
): Promise<MeetingRouteSearchResponse> => {
  const result = await api.post<ApiResult<MeetingRouteSearchResponse>>(
    `/meetings/${meetingId}/routes`,
    request
  );
  return result.data;
};

const MAX_GUIDE_RETRIES = 2;

export const searchMeetingRoutes = async (
  meetingId: number,
  request: MeetingRouteSearchRequest
): Promise<MeetingRoute[]> => {
  let currentRequest = request;

  for (let attempt = 0; attempt <= MAX_GUIDE_RETRIES; attempt += 1) {
    const { routes, guide } = await requestRoutes(meetingId, currentRequest);
    if (routes.length > 0 || !guide) return routes;
    currentRequest = { ...currentRequest, travelMode: guide.travelMode };
  }

  return [];
};
