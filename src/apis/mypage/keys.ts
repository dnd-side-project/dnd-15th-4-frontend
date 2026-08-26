export const mypageKeys = {
  all: ["mypage"] as const,
  puzzles: () => [...mypageKeys.all, "puzzles"] as const,
  favoriteSearches: () => [...mypageKeys.all, "favorite-searches"] as const,
};
