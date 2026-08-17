// key 기준으로 묶어 key 오름차순으로 정렬된 2차원 배열로 반환
export const groupBy = <T>(items: T[], getKey: (item: T) => number): T[][] => {
  const groups = new Map<number, T[]>();

  for (const item of items) {
    const key = getKey(item);
    const group = groups.get(key);
    if (group) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, group]) => group);
};
