export const checkIsHost = (
  hostId: number | undefined,
  userId: number | undefined
): boolean => hostId !== undefined && hostId === userId;
