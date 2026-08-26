"use client";

import { useQuery } from "@tanstack/react-query";

import { placeKeys } from "@/apis/place/keys";
import { searchPlaces } from "@/apis/place/place";
import { useDebounce } from "@/hooks/common/useDebounce";

export const usePlaceSearchQuery = (keyword: string) => {
  const trimmedKeyword = keyword.trim();
  const debouncedKeyword = useDebounce(trimmedKeyword, 500);
  const isDebouncing = trimmedKeyword !== debouncedKeyword;

  const query = useQuery({
    queryKey: placeKeys.search(debouncedKeyword),
    queryFn: () => searchPlaces(debouncedKeyword),
    enabled: debouncedKeyword.length > 0,
    retry: false,
  });

  return { ...query, isDebouncing };
};
