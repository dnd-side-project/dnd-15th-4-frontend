export const placeKeys = {
  all: ["places"] as const,
  search: (query: string) => [...placeKeys.all, "search", query] as const,
};
