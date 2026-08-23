export const urlToFile = async (
  url: string,
  filename: string
): Promise<File> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`이미지를 가져올 수 없습니다: ${response.status}`);
  }

  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type || "image/jpeg" });
};
