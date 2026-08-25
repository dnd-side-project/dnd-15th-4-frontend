import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type {
  AddFavoriteSearchRequest,
  FavoriteSearchDto,
} from "@/types/place";

export const fetchFavoriteSearches = async (): Promise<FavoriteSearchDto[]> => {
  const result = await api.get<ApiResult<FavoriteSearchDto[]>>(
    "/api/v1/users/me/favorite-searches"
  );
  return result.data;
};

export const addFavoriteSearch = async (
  request: AddFavoriteSearchRequest
): Promise<FavoriteSearchDto> => {
  const result = await api.post<ApiResult<FavoriteSearchDto>>(
    "/api/v1/users/me/favorite-searches",
    request
  );
  return result.data;
};

export const deleteFavoriteSearch = async (
  favoriteSearchId: number
): Promise<void> => {
  await api.delete(`/api/v1/users/me/favorite-searches/${favoriteSearchId}`);
};
