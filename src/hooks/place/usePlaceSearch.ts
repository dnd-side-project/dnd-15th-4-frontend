"use client";

import { useQuery } from "@tanstack/react-query";

import { placeKeys } from "@/apis/place/keys";
import { searchPlaces } from "@/apis/place/place";
import { useDebounce } from "@/hooks/common/useDebounce";

export const usePlaceSearchQuery = (keyword: string) => {
  const debouncedKeyword = useDebounce(keyword.trim(), 500);

  return useQuery({
    queryKey: placeKeys.search(debouncedKeyword),
    queryFn: () => searchPlaces(debouncedKeyword),
    enabled: debouncedKeyword.length > 0,
    retry: false,
  });
};
