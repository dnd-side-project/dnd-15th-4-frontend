"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createMeeting, fetchMeetings } from "@/apis/meeting/meetings";
import { meetingKeys } from "@/apis/meeting/keys";
import type { MeetingCreateRequest, MeetingData } from "@/types/meeting";

export interface CreateMeetingVariables {
  request: MeetingCreateRequest;
  image: File;
}

export const useCreateMeetingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, image }: CreateMeetingVariables) =>
      createMeeting(request, image),
    onSuccess: (data, { request }) => {
      queryClient.invalidateQueries({ queryKey: meetingKeys.lists() });

      queryClient.setQueryData<MeetingData>(
        meetingKeys.detail(data.meetingId),
        {
          meetingId: data.meetingId,
          title: request.title,
          dateTime: request.dateTime,
          place: request.destination,
          latitude: request.latitude,
          longitude: request.longitude,
          status: "WAITING",
          participants: [],
        }
      );
    },
  });
};

export const useMeetingQuery = (meetingId: number) =>
  useQuery({
    queryKey: meetingKeys.detail(meetingId),
    queryFn: async () => {
      const meetings = await fetchMeetings();
      const meeting = meetings.find((item) => item.meetingId === meetingId);
      if (!meeting) {
        throw new Error("약속 정보를 찾을 수 없어요.");
      }
      return meeting;
    },
    enabled: meetingId > 0,
  });
