export interface Participant {
  id: number;
  name: string;
  profileImageUrl: string;
}

export interface ParticipantDetail {
  id: number;
  name: string;
  profileImageUrl: string;
  puzzleImageUrl: string;
  imageSet: boolean;
  nicknameSet: boolean;
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
  capacity: number;
  currentParticipantCount: number;
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

export interface MeetingRankingItem {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  arrived: boolean;
  arrivedAt: string | null;
  earlyArrivalMinutes: number | null;
  late: boolean;
}

export interface MeetingUnselectedImage {
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
  estimatedArrivalTime: string | null;
  arrived: boolean;
  latitude: number | null;
  longitude: number | null;
  locationUpdatedAt: string | null;
  departureLatitude: number | null;
  departureLongitude: number | null;
  pieceIndex: number;
  revealed: boolean;
}

export interface MeetingPuzzleGroup {
  puzzleGroupId: number;
  puzzleImageUrl: string;
  pageNumber: number;
  members: PuzzleGroupParticipant[];
}

export interface MeetingResultPuzzlePiece {
  pieceIndex: number;
  success: boolean;
  uploaderId: number | null;
  uploaderNickname: string | null;
  uploaderProfileImageUrl: string | null;
}

export interface MeetingResultPuzzlePage {
  puzzlePageId: number;
  imageUrl: string;
  uploaderNickname: string;
  uploaderProfileImageUrl: string;
  completed: boolean;
  pieces: MeetingResultPuzzlePiece[];
}

export interface MeetingResultResponse {
  puzzleFeed: MeetingResultPuzzlePage[];
  unselectedImages: MeetingUnselectedImage[];
  rankings: MeetingRankingItem[];
  myDepartedAt: string | null;
}

export interface MeetingQuickMessage {
  id: number;
  content: string;
  senderId: number;
}

export interface MeetingInProgressResponse {
  puzzleGroups: MeetingPuzzleGroup[];
  quickMessages: MeetingQuickMessage[];
  completed: boolean;
  destinationLatitude: number;
  destinationLongitude: number;
}

export interface QuickMessageOption {
  id: number | null;
  content: string;
}

export interface MeetingImageSelection {
  type: "user" | "default";
  src: string;
  bgColorClassName?: string;
}

export interface MeetingCreateRequest {
  imageSet: boolean;
  nicknameSet: boolean;
  title: string;
  dateTime: string;
  destination: string;
  latitude: number;
  longitude: number;
  capacity: number;
  memo?: string | null;
  nickname?: string | null;
}

export interface MeetingCreateResponse {
  meetingId: number;
}

export interface MeetingDetailResponse {
  meetingId: number;
  title: string;
  dateTime: string;
  place: string;
  latitude: number;
  longitude: number;
  memo: string | null;
  status: MeetingStatus;
  inviteCode: string;
  capacity: number;
  currentParticipantCount: number;
  participants: ParticipantDetail[];
}

export interface MeetingUpdateRequest {
  title?: string;
  dateTime?: string;
  destination?: string;
  latitude?: number;
  longitude?: number;
  memo?: string;
}

export interface MeetingMemberNicknameUpdateResponse {
  meetingId: number;
  nickname: string;
  nicknameSet: boolean;
}

export interface MeetingMemberPuzzleImageUpdateResponse {
  meetingId: number;
  imageUrl: string;
  imageSet: boolean;
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
  capacity: number;
  currentMemberCount: number;
  participants: MeetingPreviewParticipant[];
}

export interface MeetingJoinRequest {
  inviteCode: string;
  nickname?: string | null;
  nicknameSet: boolean;
  imageSet: boolean;
}

export interface MeetingJoinResponse {
  meetingId: number;
}

export interface DepartureOrigin {
  placeName: string;
  addressName: string;
  latitude: number;
  longitude: number;
}

export interface MeetingMemberDepartureOrigin {
  placeName: string;
  latitude: number;
  longitude: number;
}

export interface MeetingMemberNotificationSettings {
  locationPermission: boolean;
  friendArrival: boolean;
  chatBubble: boolean;
}

export interface MeetingMemberNicknameSetting {
  enabled: boolean;
  nickname?: string | null;
}

export type MeetingTravelMode = "TRANSIT" | "CAR" | "WALK";

export interface MeetingRouteStation {
  start: string;
  end: string;
}

export interface MeetingRouteStep {
  type: "SUBWAY" | "BUS" | "WALK" | "ETC";
  time: number;
  distance: number;
  description?: string | null;
  line?: string | null;
  color?: string | null;
  station?: MeetingRouteStation | null;
  stations?: string[] | null;
}

export interface MeetingRoute {
  totalTime: number;
  fare: number;
  transferCount: number;
  pathType?: number | null;
  steps: MeetingRouteStep[];
}

export interface MeetingRouteSearchRequest {
  start: {
    latitude: number;
    longitude: number;
  };
  travelMode?: MeetingTravelMode | null;
}

export interface MeetingRouteGuide {
  code: string;
  message: string;
  travelMode: MeetingTravelMode;
}

export interface MeetingRouteRequest {
  totalTime: number;
  steps: MeetingRouteStep[];
}

export interface MeetingMemberDepartureCreateRequest {
  departure: MeetingMemberDepartureOrigin;
  notificationSettings: MeetingMemberNotificationSettings;
  nicknameSetting: MeetingMemberNicknameSetting;
  route: MeetingRouteRequest;
  travelMode?: MeetingTravelMode | null;
}

export interface MeetingMemberDepartureUpdateRequest {
  departure?: MeetingMemberDepartureOrigin | null;
  notificationSettings?: MeetingMemberNotificationSettings | null;
  nicknameSetting?: MeetingMemberNicknameSetting | null;
  route?: MeetingRouteRequest | null;
  travelMode?: MeetingTravelMode | null;
}

export interface MeetingDepartureRouteSegment {
  content: string | null;
  transportType: "SUBWAY" | "BUS" | "WALK" | "ETC";
  transportContent: string | null;
  estimatedTime: number;
  station: MeetingRouteStation | null;
}

export interface MeetingMemberDepartureResponse {
  meetingId: number;
  departure: MeetingMemberDepartureOrigin;
  notificationSettings: MeetingMemberNotificationSettings;
  nicknameSetting: MeetingMemberNicknameSetting;
  totalEstimatedTime: number;
  recommendedDepartureTime: string;
  routes: MeetingDepartureRouteSegment[];
  travelMode?: MeetingTravelMode | null;
}
