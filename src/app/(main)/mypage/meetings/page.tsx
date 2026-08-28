"use client";

import { useRouter } from "next/navigation";

import { DateFilterModal } from "@/components/common/DateFilterModal";
import { ScheduleCard } from "@/components/common/ScheduleCard";
import { MyPageListHeader } from "@/components/mypage/MyPageListHeader";
import { useDateFilter } from "@/hooks/mypage/useDateFilter";
import { useMeetingsQuery } from "@/hooks/meeting/shared/useMeetings";
import { isSameDay } from "@/utils/date";

const MeetingsPage = () => {
  const router = useRouter();
  const { data } = useMeetingsQuery("COMPLETED");
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

  return (
    <div className="h-screen scrollbar-none overflow-y-auto pb-12">
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
      <div className="flex flex-col gap-3 px-4">
        {sortedMeetings.map((meeting) => (
          <ScheduleCard
            key={meeting.meetingId}
            meeting={meeting}
            onClick={() => router.push(`/meeting/${meeting.meetingId}`)}
            showDDay={false}
          />
        ))}
      </div>

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
