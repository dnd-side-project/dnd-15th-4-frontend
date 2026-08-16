"use client";

import Image from "next/image";

import searchImage from "@/assets/images/home-empty-schedule.png";
import { ScheduleCard } from "@/components/home/ScheduleCard";
import type { MeetingData } from "@/types/meeting";

interface HomeUpcomingSectionProps {
  schedules?: MeetingData[];
}

export const HomeUpcomingSection = ({
  schedules = [],
}: HomeUpcomingSectionProps) => {
  const isEmpty = schedules.length === 0;

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pt-6">
      <h2 className="h2 text-primary mb-4 shrink-0 font-bold">
        곧 시작되는 약속이에요
      </h2>

      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3.5 opacity-46">
          <Image src={searchImage} alt="" width={72} height={77} />
          <p className="body2 text-secondary-1 text-center">
            예정된 약속이 없습니다.
            <br />
            약속을 생성해 보세요!
          </p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
          {schedules.map((meeting, index) => (
            <ScheduleCard
              key={`${meeting.meetingId}-${index}`}
              meeting={meeting}
            />
          ))}
        </div>
      )}
    </section>
  );
};
