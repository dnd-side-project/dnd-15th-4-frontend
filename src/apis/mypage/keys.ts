export const mypageKeys = {
  all: ["mypage"] as const,
  favoriteSearches: () => [...mypageKeys.all, "favorite-searches"] as const,
};
