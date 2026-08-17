export interface Participant {
  id: number;
  name: string;
  profileImageNumber: number;
}

export type MeetingStatus = "WAITING" | "IN_PROGRESS" | "COMPLETED";

export interface MeetingData {
  meetingId: number;
  title: string;
  dateTime: string;
  place: string;
  latitude: number;
  longitude: number;
  participants: Participant[];
  status: MeetingStatus;
}

export interface MeetingListResponse {
  data: MeetingData[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}
