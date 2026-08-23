"use client";

import { useEffect, useState } from "react";
import { FloatingActionButton } from "@/components/home/FloatingActionButton";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeUpcomingSection } from "@/components/home/HomeUpcomingSection";
import { InviteCodeJoinSheet } from "@/components/meeting/participate/InviteCodeJoinSheet";
import { useMeetingsQuery } from "@/hooks/meeting/shared/useMeetings";
import type { MeetingData } from "@/types/meeting";
import { isActiveOrUpcomingMeeting } from "@/utils/date";

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const { data: meetings = [] } = useMeetingsQuery();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
        <HomeHeroSection meeting={null} />
        <HomeUpcomingSection schedules={[]} />
        <FloatingActionButton
          onParticipateClick={() => setIsInviteOpen(true)}
        />
        <InviteCodeJoinSheet
          open={isInviteOpen}
          onOpenChange={setIsInviteOpen}
        />
      </div>
    );
  }

  const visibleMeetings = meetings.filter((meeting) =>
    isActiveOrUpcomingMeeting(meeting)
  );

  const heroMeeting: MeetingData | null =
    visibleMeetings.find((meeting) => meeting.status === "IN_PROGRESS") ?? null;

  const upcomingMeetings = visibleMeetings
    .filter((meeting) => meeting.status === "WAITING")
    .sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <HomeHeroSection meeting={heroMeeting} />

      <HomeUpcomingSection schedules={upcomingMeetings} />

      <FloatingActionButton onParticipateClick={() => setIsInviteOpen(true)} />

      <InviteCodeJoinSheet open={isInviteOpen} onOpenChange={setIsInviteOpen} />
    </div>
  );
}
