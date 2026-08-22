import type { MeetingRankingItem } from "@/types/meeting";

export interface NotificationSettings {
  locationPermission: boolean;
  friendArrival: boolean;
  chatBubble: boolean;
}

export interface User {
  id: number;
  nickname: string;
  previousAppointmentCount: number;
  profileImageNumber: number;
  collectedPuzzleCount: number;
  favoritePlaceCount: number;
  kakaoId?: string;
  notificationSettings: NotificationSettings;
}

export interface CollectedPuzzle {
  meetingId: number;
  title: string;
  meetingAt: string;
  destination: string;
  puzzleImageUrls: string[];
  rankings: MeetingRankingItem[];
}
