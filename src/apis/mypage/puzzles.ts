import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type { CollectedPuzzle } from "@/types/user";

export const fetchPuzzles = async (): Promise<CollectedPuzzle[]> => {
  const result =
    await api.get<ApiResult<CollectedPuzzle[]>>("/api/v1/puzzles/me");
  return result.data;
};
