export const formatMeetingDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);

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
    dateFormatted: `${month}월 ${day}일 (${dayOfWeek})`,
    timeFormatted: `${hours}:${minutes}`,
    dDay,
  };
};
