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
