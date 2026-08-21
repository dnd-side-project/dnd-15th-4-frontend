"use client";

import { useEffect, useState } from "react";
import { FloatingActionButton } from "@/components/home/FloatingActionButton";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeUpcomingSection } from "@/components/home/HomeUpcomingSection";
import { useMeetingsQuery } from "@/hooks/meeting/shared/useMeetings";
import type { MeetingData } from "@/types/meeting";

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: meetings = [] } = useMeetingsQuery();

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

  const heroMeeting: MeetingData | null =
    meetings.find((meeting) => meeting.status === "IN_PROGRESS") ?? null;

  const upcomingMeetings = meetings
    .filter((meeting) => meeting.status === "WAITING")
    .sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <HomeHeroSection meeting={heroMeeting} />

      <HomeUpcomingSection schedules={upcomingMeetings} />

      <FloatingActionButton />
    </div>
  );
}
