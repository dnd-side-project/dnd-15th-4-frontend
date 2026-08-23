export interface Participant {
  id: number;
  name: string;
  profileImageUrl: string;
}

export type MeetingStatus =
  | "WAITING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELED";

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

export interface MeetingLocation {
  latitude: number;
  longitude: number;
}

export interface MeetingPuzzlePosition {
  set: number;
  number: number;
  puzzleImageUrl: string;
}

export interface MeetingParticipant {
  id: number;
  nickname: string;
  profileImageNumber: number;
  currentLocation: MeetingLocation;
  estimatedArrivalTime: number;
  departureTime: string;
  arrivalStatus: boolean;
  puzzlePosition: MeetingPuzzlePosition;
}

export interface MeetingParticipantsDto {
  meetingId: number;
  participants: MeetingParticipant[];
}

export interface MeetingSummaryParticipant {
  id: number;
  name: string;
  profileImageUrl: string;
}

export interface MeetingSummary {
  meetingId: number;
  title: string;
  dateTime: string;
  place: string;
  latitude: number;
  longitude: number;
  status: MeetingStatus;
  participants: MeetingSummaryParticipant[];
}

export interface MeetingRankingItem {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  arrived: boolean;
  arrivedAt: string | null;
  earlyArrivalMinutes: number | null;
  late: boolean;
}

export interface CompletedPuzzleFeedItem {
  imageUrl: string;
  uploaderId: number;
  uploaderNickname: string;
  uploaderProfileImageUrl: string;
}

export interface PuzzleGroupParticipant {
  userId: number | null;
  nickname: string | null;
  profileImageUrl: string | null;
  departed: boolean;
  departedAt: string | null;
  arrived: boolean;
  latitude: number | null;
  longitude: number | null;
  locationUpdatedAt: string | null;
  pieceIndex: number;
  revealed: boolean;
}

export interface MeetingPuzzleGroup {
  puzzleGroupId: number;
  puzzleImageUrl: string;
  pageNumber: number;
  members: PuzzleGroupParticipant[];
}

export interface MeetingResultResponse {
  puzzleFeed: CompletedPuzzleFeedItem[];
  puzzleGroups?: MeetingPuzzleGroup[];
  rankings: MeetingRankingItem[];
  myDepartedAt: string | null;
}

export interface MeetingImageSelection {
  type: "user" | "default";
  src: string;
  bgColorClassName?: string;
}

export interface MeetingCreateRequest {
  title: string;
  dateTime: string;
  destination: string;
  latitude: number;
  longitude: number;
  memo?: string | null;
  nickname?: string | null;
}

export interface MeetingCreateResponse {
  meetingId: number;
}

export interface MeetingInviteCodeResponse {
  inviteCode: string;
}

export interface MeetingPreviewRequest {
  inviteCode: string;
}

export interface MeetingPreviewParticipant {
  id: number;
  name: string;
  profileImageUrl: string;
}

export interface MeetingPreviewResponse {
  meetingId: number;
  title: string;
  dateTime: string;
  place: string;
  latitude: number;
  longitude: number;
  status: MeetingStatus;
  participants: MeetingPreviewParticipant[];
}

export interface MeetingJoinRequest {
  inviteCode: string;
  nickname?: string | null;
}

export interface MeetingJoinResponse {
  meetingId: number;
}
