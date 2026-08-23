"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FloatingActionButton } from "@/components/home/FloatingActionButton";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeUpcomingSection } from "@/components/home/HomeUpcomingSection";
import { InviteCodeJoinSheet } from "@/components/meeting/participate/InviteCodeJoinSheet";
import { useMeetingsQuery } from "@/hooks/meeting/shared/useMeetings";
import type { MeetingData } from "@/types/meeting";
import { isActiveOrUpcomingMeeting } from "@/utils/date";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [initialInviteCode, setInitialInviteCode] = useState("");
  const { data: meetings = [] } = useMeetingsQuery();

  const handleInviteOpenChange = (open: boolean) => {
    setIsInviteOpen(open);
    if (!open) router.replace("/home");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const code = searchParams.get("inviteCode");
    const shouldOpen = Boolean(code) || searchParams.get("modal") === "invite";
    if (!shouldOpen) return;
    setInitialInviteCode(code ?? "");
    setIsInviteOpen(true);
  }, [searchParams]);

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
          onOpenChange={handleInviteOpenChange}
          initialCode={initialInviteCode}
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

      <InviteCodeJoinSheet
        open={isInviteOpen}
        onOpenChange={handleInviteOpenChange}
        initialCode={initialInviteCode}
      />
    </div>
  );
}
