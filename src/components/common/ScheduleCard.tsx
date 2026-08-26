"use client";

import { useRouter } from "next/navigation";

import { AvatarStack } from "@/components/home/AvatarStack";
import type { MeetingData, MeetingPreviewResponse } from "@/types/meeting";
import { formatMeetingDateTime } from "@/utils/date";

interface ScheduleCardProps {
  meeting: MeetingData | MeetingPreviewResponse;
  participantLimit?: number;
  onClick?: () => void;
  showDDay?: boolean;
  interactive?: boolean;
}

export const ScheduleCard = ({
  meeting,
  participantLimit,
  onClick,
  showDDay = true,
  interactive = true,
}: ScheduleCardProps) => {
  const router = useRouter();
  const { dateFormatted, timeFormatted, dDay } = formatMeetingDateTime(
    meeting.dateTime
  );

  if (!interactive) {
    return (
      <div className="rounded-20 shadow-3 relative flex w-full shrink-0 items-center overflow-hidden bg-white px-4.5 pt-4.5 pb-5.5 text-left">
        <ScheduleCardContent
          meeting={meeting}
          participantLimit={participantLimit}
          showDDay={showDDay}
          dateFormatted={dateFormatted}
          timeFormatted={timeFormatted}
          dDay={dDay}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick ?? (() => router.push(`#`))}
      className="rounded-20 shadow-3 relative flex w-full shrink-0 cursor-pointer items-center overflow-hidden bg-white px-4.5 pt-4.5 pb-5.5 text-left"
    >
      <ScheduleCardContent
        meeting={meeting}
        participantLimit={participantLimit}
        showDDay={showDDay}
        dateFormatted={dateFormatted}
        timeFormatted={timeFormatted}
        dDay={dDay}
      />
    </button>
  );
};

interface ScheduleCardContentProps {
  meeting: MeetingData | MeetingPreviewResponse;
  participantLimit?: number;
  showDDay: boolean;
  dateFormatted: string;
  timeFormatted: string;
  dDay: string;
}

const ScheduleCardContent = ({
  meeting,
  participantLimit,
  showDDay,
  dateFormatted,
  timeFormatted,
  dDay,
}: ScheduleCardContentProps) => {
  return (
    <>
      <div className="relative z-10 flex min-w-0 flex-1 flex-col pb-1">
        <h3 className="body1 text-primary mb-1 wrap-break-word break-keep">
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

        {participantLimit == undefined ? (
          <div className="flex shrink-0 items-center">
            <AvatarStack participants={meeting.participants} />
          </div>
        ) : (
          <p className="body1 text-sub1-normal mt-2.5 font-medium">
            {participantLimit}인 약속
          </p>
        )}
      </div>

      {showDDay && (
        <span
          aria-hidden
          className="text-disable pointer-events-none absolute right-4 bottom-4 z-0 shrink-0 text-6xl font-medium tracking-[-0.02rem] opacity-12 select-none"
        >
          {dDay}
        </span>
      )}
    </>
  );
};
