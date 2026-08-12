"use client";

import { HomeUpcomingEmpty } from "@/components/home/schedule/HomeUpcomingEmpty";

interface HomeUpcomingSectionProps {
  schedules?: Array<{ id: string; title: string }>;
}

export const HomeUpcomingSection = ({
  schedules = [],
}: HomeUpcomingSectionProps) => {
  const isEmpty = schedules.length === 0;

  return (
    <section className="flex flex-1 flex-col px-4 py-6">
      <h2 className="h2 text-text-title self-start">곧 시작되는 약속이에요</h2>

      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center">
          <HomeUpcomingEmpty />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* todo: 약속이 있을 경우 */}
        </div>
      )}
    </section>
  );
};
