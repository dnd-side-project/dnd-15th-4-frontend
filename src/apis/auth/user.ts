import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type { UserDto } from "@/types/auth";

export const fetchCurrentUser = async (): Promise<UserDto> => {
  const result = await api.get<ApiResult<UserDto>>("/users/me");
  return result.data;
};

export const withdrawUser = async (): Promise<void> => {
  await api.delete<ApiResult<null>>("/api/v1/users/me");
};
