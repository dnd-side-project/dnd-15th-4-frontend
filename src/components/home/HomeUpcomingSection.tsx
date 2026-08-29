"use client";

import { EmptyState } from "@/components/common/EmptyState";
import { ScheduleCard } from "@/components/common/ScheduleCard";
import type { MeetingData } from "@/types/meeting";

interface HomeUpcomingSectionProps {
  schedules?: MeetingData[];
  onScheduleClick?: (meeting: MeetingData) => void;
}

export const HomeUpcomingSection = ({
  schedules = [],
  onScheduleClick,
}: HomeUpcomingSectionProps) => {
  const isEmpty = schedules.length === 0;

  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-4 pt-6">
      <h2 className="h2 text-primary mb-4 shrink-0 font-bold">
        곧 시작되는 약속이에요
      </h2>

      {isEmpty ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <EmptyState
            message={"예정된 약속이 없습니다.\n약속을 생성해 보세요!"}
          />
        </div>
      ) : (
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 scrollbar-none flex-col gap-3 overflow-y-auto pb-24">
            {schedules.map((meeting, index) => (
              <ScheduleCard
                key={`${meeting.meetingId}-${index}`}
                meeting={meeting}
                onClick={() => onScheduleClick?.(meeting)}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-linear-to-b from-transparent via-white/80 to-white" />
        </div>
      )}
    </section>
  );
};
