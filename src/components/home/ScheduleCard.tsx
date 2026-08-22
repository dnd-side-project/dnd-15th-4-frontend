"use client";

import { useRouter } from "next/navigation";

import { AvatarStack } from "@/components/home/AvatarStack";
import type { MeetingData } from "@/types/meeting";
import { formatMeetingDateTime } from "@/utils/date";

interface ScheduleCardProps {
  meeting: MeetingData;
}

export const ScheduleCard = ({ meeting }: ScheduleCardProps) => {
  const router = useRouter();
  const { dateFormatted, timeFormatted, dDay } = formatMeetingDateTime(
    meeting.dateTime
  );

  return (
    <button
      type="button"
      onClick={() => router.push(`#`)}
      className="rounded-20 shadow-3 relative flex w-full shrink-0 cursor-pointer items-center overflow-hidden bg-white p-5 text-left transition-transform active:scale-[0.99]"
    >
      <div className="relative z-10 flex min-w-0 flex-1 flex-col pb-1">
        <h3 className="body1 text-primary font-medium wrap-break-word break-keep">
          {meeting.title}
        </h3>

        <div className="body6 text-disable flex flex-wrap items-center overflow-hidden pb-5 font-normal">
          <span>{dateFormatted}</span>

          <span
            aria-hidden
            className="bg-divider-3 mx-1.5 h-2.5 w-px shrink-0"
          />

          <span className="mr-3.25">{timeFormatted}</span>

          <span className="-ml-1.75 inline-flex max-w-full min-w-0 items-center">
            <span aria-hidden className="bg-divider-3 h-2.5 w-px shrink-0" />
            <span className="line-clamp-2 pl-1.5 wrap-break-word break-keep">
              {meeting.place}
            </span>
          </span>
        </div>

        <div className="mt-1 flex shrink-0 items-center">
          <AvatarStack participants={meeting.participants} />
        </div>
      </div>

      <span
        aria-hidden
        className="text-disable pointer-events-none absolute right-4 bottom-4 z-0 shrink-0 text-6xl font-medium tracking-[-0.02rem] opacity-12 select-none"
      >
        {dDay}
      </span>
    </button>
  );
};
