"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { FloatingActionButton } from "@/components/home/FloatingActionButton";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeUpcomingSection } from "@/components/home/HomeUpcomingSection";
import { InviteCodeJoinSheet } from "@/components/meeting/participate/InviteCodeJoinSheet";
import { useDeparturesQuery } from "@/hooks/meeting/departure/useMemberDeparture";
import { useHomeMeetingsQuery } from "@/hooks/meeting/shared/useMeetings";
import type { MeetingData } from "@/types/meeting";
import { isActiveOrUpcomingMeeting } from "@/utils/date";

const isDepartureEligible = (meeting: MeetingData) =>
  meeting.status === "IN_PROGRESS";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [initialInviteCode, setInitialInviteCode] = useState("");
  const [departureCandidate, setDepartureCandidate] =
    useState<MeetingData | null>(null);
  const [isDuplicateDepartureOpen, setIsDuplicateDepartureOpen] =
    useState(false);
  const { data: meetings = [] } = useHomeMeetingsQuery();

  const visibleMeetings = meetings.filter((meeting) =>
    isActiveOrUpcomingMeeting(meeting)
  );
  const sortedMeetings = [...visibleMeetings].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );

  const inProgressMeetingIds = sortedMeetings
    .filter(isDepartureEligible)
    .map((meeting) => meeting.meetingId);

  const { departedMeetingId, isLoading: isDepartureCheckLoading } =
    useDeparturesQuery(inProgressMeetingIds);

  const handleInviteOpenChange = (open: boolean) => {
    setIsInviteOpen(open);
    if (!open) {
      setInitialInviteCode("");
      router.replace("/home");
    }
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

  const heroMeeting: MeetingData | null = isDepartureCheckLoading
    ? null
    : (sortedMeetings.find(
        (meeting) => meeting.meetingId === departedMeetingId
      ) ?? null);

  const upcomingMeetings = sortedMeetings.filter(
    (meeting) => meeting.meetingId !== heroMeeting?.meetingId
  );

  const handleScheduleClick = (meeting: MeetingData) => {
    if (meeting.status === "IN_PROGRESS") {
      setIsDuplicateDepartureOpen(false);
      setDepartureCandidate(meeting);
      return;
    }

    router.push(`/meeting/${meeting.meetingId}/info`);
  };

  const handleViewInfo = () => {
    if (!departureCandidate) return;
    const targetId = departureCandidate.meetingId;
    setDepartureCandidate(null);
    router.push(`/meeting/${targetId}/info`);
  };

  const handleDepart = () => {
    if (!departureCandidate) return;
    if (isDepartureCheckLoading) return;

    const candidate = departureCandidate;
    setDepartureCandidate(null);

    if (departedMeetingId && departedMeetingId !== candidate.meetingId) {
      setIsDuplicateDepartureOpen(true);
      return;
    }

    router.push(`/meeting/${candidate.meetingId}/departure`);
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <HomeHeroSection meeting={heroMeeting} />

      <HomeUpcomingSection
        schedules={upcomingMeetings}
        onScheduleClick={handleScheduleClick}
      />

      <FloatingActionButton onParticipateClick={() => setIsInviteOpen(true)} />

      <InviteCodeJoinSheet
        open={isInviteOpen}
        onOpenChange={handleInviteOpenChange}
        initialCode={initialInviteCode}
      />

      {departureCandidate && (
        <ConfirmModal
          title="이 약속을 진행할까요?"
          description={
            "다음 예정된 약속은 해당 약속이 종료된 뒤\n출발할 수 있습니다"
          }
          cancelLabel="정보보기"
          confirmLabel="출발하기"
          onCancelClassName="text-primary"
          onCancel={handleViewInfo}
          onConfirm={handleDepart}
        />
      )}

      {isDuplicateDepartureOpen && (
        <ConfirmModal
          title="약속은 하나만 진행 가능합니다"
          description={
            "기존 진행 중인 약속이 종료된 뒤\n약속을 시작할 수 있습니다"
          }
          confirmLabel="확인"
          onConfirm={() => setIsDuplicateDepartureOpen(false)}
          onCancel={() => setIsDuplicateDepartureOpen(false)}
        />
      )}
    </div>
  );
}
