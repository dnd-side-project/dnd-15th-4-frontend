// 배열을 size 개수만큼씩 잘라 2차원 배열로 반환
export const chunkArray = <T>(items: T[], size: number): T[][] => {
  if (size <= 0) return [items];

  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};
