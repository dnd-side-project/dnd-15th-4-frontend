import { api } from "@/lib/api/http-client";
import { fetchMeetingInProgress } from "@/apis/meeting/meetings";
import type { UserLocation } from "@/types/meeting";

export interface ParticipantLocationDto extends UserLocation {
  userId: number;
}

export const updateMemberLocation = async (
  meetingId: number,
  location: UserLocation
): Promise<void> => {
  await api.patch(`/meetings/${meetingId}/members/location`, location);
};

export const fetchParticipantLocations = async (
  meetingId: number,
  participantIds: number[]
): Promise<ParticipantLocationDto[]> => {
  const { puzzleGroups } = await fetchMeetingInProgress(meetingId);
  const participantIdSet = new Set(participantIds);

  return puzzleGroups.flatMap((group) =>
    group.members.flatMap((member) => {
      if (
        member.userId === null ||
        member.latitude === null ||
        member.longitude === null ||
        !participantIdSet.has(member.userId)
      ) {
        return [];
      }

      return [
        {
          userId: member.userId,
          latitude: member.latitude,
          longitude: member.longitude,
        },
      ];
    })
  );
};
