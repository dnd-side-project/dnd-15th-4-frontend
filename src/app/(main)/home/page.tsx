"use client";

import { useEffect, useState } from "react";
import { FloatingActionButton } from "@/components/home/FloatingActionButton";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeUpcomingSection } from "@/components/home/HomeUpcomingSection";
import { MOCK_MEETINGS } from "@/mocks/mockMeetings";
import type { MeetingData } from "@/types/meeting";

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
        <HomeHeroSection meeting={null} />
        <HomeUpcomingSection schedules={[]} />
        <FloatingActionButton />
      </div>
    );
  }

  const now = new Date();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const validSchedules = [...MOCK_MEETINGS]
    .filter((meeting) => new Date(meeting.dateTime) > now)
    .sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

  const todaySchedules = validSchedules.filter((meeting) =>
    isSameDay(new Date(meeting.dateTime), now)
  );

  const heroMeeting: MeetingData | null = todaySchedules[0] ?? null;

  const upcomingMeetings = validSchedules.filter(
    (meeting) => meeting.meetingId !== heroMeeting?.meetingId
  );

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <HomeHeroSection meeting={heroMeeting} />

      <HomeUpcomingSection schedules={upcomingMeetings} />

      <FloatingActionButton />
    </div>
  );
}
