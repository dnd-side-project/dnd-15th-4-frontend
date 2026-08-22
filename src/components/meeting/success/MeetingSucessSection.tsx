"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

import { IcCopy } from "@/components/icons";
import { formatMeetingDateTime } from "@/utils/date";
import { KakaoShareButton } from "@/components/meeting/create/KakaoShareButton";
import { ScheduleCard } from "@/components/common/ScheduleCard";
import { Toast } from "@/components/common/Toast";
import { useMeetingQuery } from "@/hooks/meeting/create/useCreateMeeting";

export const MeetingSucessSectoin = () => {
  const params = useParams<{ meetingId: string }>();
  const searchParams = useSearchParams();
  const meetingId = Number(params.meetingId) || 0;
  const capacityParam = searchParams.get("capacity");
  const capacity = capacityParam ? Number(capacityParam) : undefined;
  const [showToast, setShowToast] = useState(false);

  const { data: meeting, isLoading, isError } = useMeetingQuery(meetingId);

  const { dateFormatted, timeFormatted } = meeting
    ? formatMeetingDateTime(meeting.dateTime)
    : { dateFormatted: "", timeFormatted: "" };

  const inviteLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/meeting/${meetingId}`
      : "";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden px-4 py-6">
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto">
        {isLoading && (
          <p className="body3 text-disable py-10 text-center">
            약속 정보를 불러오는 중이에요
          </p>
        )}
        {isError && (
          <p className="body3 text-disable py-10 text-center">
            약속 정보를 불러오지 못했어요
          </p>
        )}
        {meeting && (
          <div className="pointer-events-none select-none">
            <ScheduleCard meeting={meeting} participantLimit={capacity} />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h2 className="h4 text-primary font-bold">초대 코드</h2>
          <div className="border-border-1 rounded-16 relative flex items-center border px-4 py-4.5">
            <p className="body3 text-primary truncate pr-8">{inviteLink}</p>
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="초대 링크 복사"
              className="text-disable pointer-events-auto absolute right-4"
            >
              <IcCopy size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-4">
        <KakaoShareButton
          title={meeting?.title || "약속"}
          description={dateFormatted ? `${dateFormatted} ${timeFormatted}` : ""}
          linkUrl={inviteLink}
        />
      </div>

      {showToast && <Toast message="초대 링크가 복사되었습니다!" />}
    </div>
  );
};
