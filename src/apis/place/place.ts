import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type { PlaceDto } from "@/types/place";

interface PlaceSearchResult {
  places: PlaceDto[];
  page: number;
  size: number;
  hasNext: boolean;
  totalCount: number;
}

export const searchPlaces = async (keyword: string): Promise<PlaceDto[]> => {
  if (!keyword.trim()) return [];

  const result = await api.get<ApiResult<PlaceSearchResult>>("/api/v1/places", {
    params: { keyword },
  });

  const uniquePlaces = new Map(
    result.data.places.map((place) => [place.placeId, place])
  );
  return [...uniquePlaces.values()];
};
