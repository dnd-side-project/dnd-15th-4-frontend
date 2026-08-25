export const getIsoStringMinutesAgo = (minutes: number): string =>
  new Date(Date.now() - minutes * 60_000).toISOString();

export const getTimeLabel = (dateTime: string): string => {
  const date = new Date(dateTime);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const getRemainingTimeLabel = (dateTime: string): string => {
  const remainingMinutes = Math.max(
    0,
    Math.round((new Date(dateTime).getTime() - Date.now()) / 60_000)
  );
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
};

import type { MeetingData } from "@/types/meeting";

export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isPastDay = (date: Date, today = new Date()): boolean => {
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return startOfDate.getTime() < startOfToday.getTime();
};

export const getMonthWeeks = (
  year: number,
  month: number
): (Date | null)[][] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = new Date(year, month, 1).getDay();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++)
    cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
};

export type MeridiemPeriod = "오전" | "오후";

export const to12Hour = (
  hour24: number
): { period: MeridiemPeriod; hour12: number } => {
  const period: MeridiemPeriod = hour24 < 12 ? "오전" : "오후";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return { period, hour12 };
};

export const to24Hour = (period: MeridiemPeriod, hour12: number): number => {
  if (period === "오전") return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
};

export const formatDateTimeTrigger = (date: Date): string => {
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  const { period, hour12 } = to12Hour(date.getHours());
  const minute = String(date.getMinutes()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}.${month}.${day} (${dayOfWeek}) ${period} ${hour12}:${minute}`;
};

export const getMeetingsOnDate = (
  meetings: MeetingData[],
  date: Date
): MeetingData[] =>
  meetings.filter((meeting) => isSameDay(new Date(meeting.dateTime), date));

export const hasTimeConflict = (
  meetings: MeetingData[],
  date: Date,
  hour: number,
  minute: number
): boolean =>
  getMeetingsOnDate(meetings, date).some((meeting) => {
    const meetingDate = new Date(meeting.dateTime);
    return (
      meetingDate.getHours() === hour && meetingDate.getMinutes() === minute
    );
  });

export const isActiveOrUpcomingMeeting = (
  meeting: MeetingData,
  now = new Date()
): boolean =>
  meeting.status === "IN_PROGRESS" ||
  (meeting.status === "WAITING" &&
    new Date(meeting.dateTime).getTime() > now.getTime());

export const MIN_LEAD_TIME_MINUTES = 30;

export type DateTimeValidationResult = "valid" | "past" | "too-soon";

export const validateSelectedDateTime = (
  date: Date,
  hour: number,
  minute: number,
  now = new Date()
): DateTimeValidationResult => {
  const target = new Date(date);
  target.setHours(hour, minute, 0, 0);

  if (target.getTime() < now.getTime()) return "past";
  if (target.getTime() < now.getTime() + MIN_LEAD_TIME_MINUTES * 60_000)
    return "too-soon";
  return "valid";
};

export const formatDateTimeForApi = (date: Date): string => {
  const pad = (value: number) => String(value).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const formatMeetingDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);

  if (Number.isNaN(date.getTime())) {
    return { dateFormatted: "-", timeFormatted: "-", dDay: "" };
  }

  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let dDay = "";
  if (diffDays === 0) {
    dDay = "D-0";
  } else if (diffDays > 0) {
    dDay = `D-${diffDays}`;
  } else {
    dDay = `D+${Math.abs(diffDays)}`;
  }

  return {
    dateFormatted: `${month}월 ${day}일 (${dayOfWeek}요일)`,
    timeFormatted: `${hours}:${minutes}`,
    dDay,
  };
};
