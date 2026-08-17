export const meetingKeys = {
  all: ["meetings"] as const,
  lists: () => [...meetingKeys.all, "list"] as const,
  list: () => [...meetingKeys.lists()] as const,
  participantLocations: (meetingId: number, participantIds: number[]) =>
    [
      ...meetingKeys.all,
      meetingId,
      "participant-locations",
      [...participantIds].sort((a, b) => a - b),
    ] as const,
};
