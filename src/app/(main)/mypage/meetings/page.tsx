"use client";

import { useRouter } from "next/navigation";

import { DateFilterModal } from "@/components/common/DateFilterModal";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorScreen } from "@/components/common/ErrorScreen";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { ScheduleCard } from "@/components/common/ScheduleCard";
import { MyPageListHeader } from "@/components/mypage/MyPageListHeader";
import { useDateFilter } from "@/hooks/mypage/useDateFilter";
import { useMeetingsQuery } from "@/hooks/meeting/shared/useMeetings";
import { isSameDay } from "@/utils/date";

const MeetingsPage = () => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useMeetingsQuery("COMPLETED");
  const meetings = data ?? [];

  const {
    sortOrder,
    handleToggleSortOrder,
    filterDate,
    setFilterDate,
    isDateFilterOpen,
    setIsDateFilterOpen,
    filteredItems: sortedMeetings,
  } = useDateFilter(meetings, (meeting) => meeting.dateTime);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError && !data) {
    return (
      <ErrorScreen
        title={"지난 약속을\n불러오지 못했어요"}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="flex h-screen scrollbar-none flex-col overflow-y-auto pb-12">
      <MyPageListHeader
        title="지난 약속"
        onBack={() => router.back()}
        resultCount={sortedMeetings.length}
        sortOrder={sortOrder}
        onToggleSort={handleToggleSortOrder}
        onCalendarClick={() => setIsDateFilterOpen(true)}
        isFiltered={filterDate !== null}
        onResetFilter={() => setFilterDate(null)}
      />
      {sortedMeetings.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState message="기록된 약속이 없습니다" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-4">
          {sortedMeetings.map((meeting) => (
            <ScheduleCard
              key={meeting.meetingId}
              meeting={meeting}
              onClick={() =>
                router.push(
                  `/meeting/${meeting.meetingId}/completed?view=history`
                )
              }
              showDDay={false}
              showFullDate
            />
          ))}
        </div>
      )}

      {isDateFilterOpen && (
        <DateFilterModal
          initialDate={filterDate}
          hasEventOnDate={(date) =>
            meetings.some((meeting) =>
              isSameDay(new Date(meeting.dateTime), date)
            )
          }
          onSelectDate={setFilterDate}
          onClose={() => setIsDateFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default MeetingsPage;
