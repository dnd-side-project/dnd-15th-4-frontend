export const meetingKeys = {
  all: ["meetings"] as const,
  lists: () => [...meetingKeys.all, "list"] as const,
  list: () => [...meetingKeys.lists()] as const,
  participantLocations: (meetingId: number) =>
    [...meetingKeys.all, meetingId, "participant-locations"] as const,
};
