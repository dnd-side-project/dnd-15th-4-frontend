"use client";

import { HomeUpcomingEmpty } from "@/components/home/schedule/HomeUpcomingEmpty";
import { ScheduleCard } from "@/components/home/schedule/ScheduleCard";
import type { MeetingData } from "@/types/meeting";

interface HomeUpcomingSectionProps {
  schedules?: MeetingData[];
}

export const HomeUpcomingSection = ({
  schedules = [],
}: HomeUpcomingSectionProps) => {
  const isEmpty = schedules.length === 0;

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-6">
      <h2 className="h2 text-text-primary mb-4 shrink-0 font-bold">
        곧 시작되는 약속이에요
      </h2>

      {isEmpty ? (
        <HomeUpcomingEmpty />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
          {schedules.map((meeting) => (
            <ScheduleCard key={meeting.meetingId} meeting={meeting} />
          ))}
        </div>
      )}
    </section>
  );
};
