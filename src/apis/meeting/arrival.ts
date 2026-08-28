import { api } from "@/lib/api/http-client";

export const confirmMemberArrival = async (
  meetingId: number
): Promise<void> => {
  await api.put(`/meetings/${meetingId}/members/me/arrival`);
};
