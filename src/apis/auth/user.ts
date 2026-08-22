import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type { UserDto } from "@/types/auth";

export const fetchCurrentUser = async (): Promise<UserDto> => {
  const result = await api.get<ApiResult<UserDto>>("/api/v1/users/me");
  return result.data;
};
