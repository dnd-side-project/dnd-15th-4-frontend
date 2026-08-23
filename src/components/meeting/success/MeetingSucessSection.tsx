"use client";

import { useParams, useSearchParams } from "next/navigation";

import { ScheduleCard } from "@/components/common/ScheduleCard";
import { InviteCodeField } from "@/components/meeting/create/InviteCodeField";
import { KakaoShareButton } from "@/components/meeting/create/KakaoShareButton";
import {
  useInviteCodeQuery,
  useMeetingQuery,
} from "@/hooks/meeting/create/useCreateMeeting";
import { formatMeetingDateTime } from "@/utils/date";

export const MeetingSucessSectoin = () => {
  const params = useParams<{ meetingId: string }>();
  const searchParams = useSearchParams();
  const meetingId = Number(params.meetingId) || 0;
  const capacityParam = searchParams.get("capacity");
  const capacity = capacityParam ? Number(capacityParam) : undefined;

  const { data: meeting, isLoading, isError } = useMeetingQuery(meetingId);
  const {
    data: inviteCodeData,
    isLoading: isInviteCodeLoading,
    isError: isInviteCodeError,
    refetch: refetchInviteCode,
  } = useInviteCodeQuery(meetingId);

  const inviteCode = inviteCodeData ?? "";

  const { dateFormatted, timeFormatted } = meeting
    ? formatMeetingDateTime(meeting.dateTime)
    : { dateFormatted: "", timeFormatted: "" };

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

        {isInviteCodeLoading && (
          <div className="flex flex-col gap-3">
            <h2 className="h4 text-primary font-bold">초대 코드</h2>
            <div className="border-border-1 rounded-16 flex w-full items-center border px-4 py-4.5">
              <div className="bg-surface-1 rounded-4 h-5 w-32 animate-pulse" />
            </div>
          </div>
        )}

        {isInviteCodeError && (
          <div className="flex flex-col gap-3">
            <h2 className="h4 text-primary font-bold">초대 코드</h2>
            <div className="border-border-1 rounded-16 flex w-full flex-col items-center gap-2 border px-4 py-4.5">
              <p className="body6 text-disable">
                초대 코드를 불러오지 못했어요
              </p>
              <button
                type="button"
                onClick={() => refetchInviteCode()}
                className="body6 text-sub1-dark-hover font-medium cursor-pointer"
              >
                다시 시도
              </button>
            </div>
          </div>
        )}

        {inviteCode && (
          <InviteCodeField
            inviteCode={inviteCode}
          />
        )}
      </div>

      <div className="shrink-0 pt-4">
        {inviteCode && (
          <KakaoShareButton
            title={meeting?.title || "약속"}
            description={
              dateFormatted ? `${dateFormatted} ${timeFormatted}` : ""
            }
            linkUrl={inviteCode}
          />
        )}
      </div>
    </div>
  );
};