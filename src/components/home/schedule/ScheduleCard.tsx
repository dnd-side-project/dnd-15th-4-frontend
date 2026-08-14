"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  CHARACTER_FALLBACK_IMAGE,
  getCharacterImage,
} from "@/constants/character-images";
import type { MeetingData, Participant } from "@/types/meeting";
import { formatMeetingDateTime } from "@/utils/date";

interface ScheduleCardProps {
  meeting: MeetingData;
}

const ParticipantAvatar = ({
  participant,
  zIndex,
  hiddenCount,
}: {
  participant: Participant;
  zIndex: number;
  hiddenCount?: number;
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{ zIndex }}
      className="border-border-4 rounded-8 relative size-9 shrink-0 overflow-hidden border bg-white"
    >
      <Image
        src={
          hasError
            ? CHARACTER_FALLBACK_IMAGE
            : getCharacterImage(participant.profileImageNumber)
        }
        alt={participant.name}
        fill
        sizes="38px"
        className="object-cover"
        onError={() => setHasError(true)}
      />

      {hiddenCount ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/51 text-[14px] font-semibold text-white">
          +{hiddenCount}
        </div>
      ) : null}
    </div>
  );
};

export const ScheduleCard = ({ meeting }: ScheduleCardProps) => {
  const router = useRouter();
  const { dateFormatted, timeFormatted, dDay } = formatMeetingDateTime(
    meeting.dateTime
  );
  const visibleParticipants = meeting.participants.slice(0, 3);
  const hiddenCount = meeting.participants.length - visibleParticipants.length;

  return (
    <button
      type="button"
      onClick={() => router.push(`#`)}
      className="rounded-20 relative flex w-full shrink-0 cursor-pointer items-center overflow-hidden bg-white p-5 text-left shadow-[0_2px_12px_#00000012] transition-transform active:scale-[0.99]"
    >
      <div className="relative z-10 flex min-w-0 flex-1 flex-col pb-1">
        <h3 className="body1 text-text-primary truncate font-medium">
          {meeting.title}
        </h3>

        <p className="body6 text-text-disable truncate pb-5 font-normal whitespace-nowrap">
          {dateFormatted} | {timeFormatted} | {meeting.place}
        </p>

        <div className="mt-1 flex shrink-0 items-center">
          <div className="flex -space-x-2">
            {visibleParticipants.map((participant, index) => (
              <ParticipantAvatar
                key={participant.id}
                participant={participant}
                zIndex={10 - index}
                hiddenCount={index === 0 ? hiddenCount : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      <span
        aria-hidden
        className="text-text-disable pointer-events-none absolute right-4 bottom-4 z-0 shrink-0 text-6xl font-medium tracking-[-0.02rem] opacity-12 select-none"
      >
        {dDay}
      </span>
    </button>
  );
};
