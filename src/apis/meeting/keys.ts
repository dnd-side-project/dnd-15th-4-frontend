import type { MeetingStatus } from "@/types/meeting";

export const meetingKeys = {
  all: ["meetings"] as const,
  lists: () => [...meetingKeys.all, "list"] as const,
  list: (filters?: { status?: MeetingStatus }) =>
    [...meetingKeys.lists(), filters ?? {}] as const,
  details: () => [...meetingKeys.all, "detail"] as const,
  detail: (meetingId: number) => [...meetingKeys.details(), meetingId] as const,
  inviteCode: (meetingId: number) =>
    [...meetingKeys.detail(meetingId), "invite-code"] as const,
  departure: (meetingId: number) =>
    [...meetingKeys.detail(meetingId), "departure"] as const,
  participantLocations: (meetingId: number, participantIds: number[]) =>
    [
      ...meetingKeys.all,
      meetingId,
      "participant-locations",
      [...participantIds].sort((a, b) => a - b),
    ] as const,
  preview: (inviteCode: string) =>
    [...meetingKeys.all, "preview", inviteCode] as const,
};
