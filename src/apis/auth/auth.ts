import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type { ReissueResponseDto } from "@/types/auth";

const JSON_CONTENT_TYPE_HEADERS = { "Content-Type": "application/json" };

export const exchangeKakaoCode = async (
  code: string,
  state: string
): Promise<void> => {
  try {
    await api.get("/api/v1/auth/kakao/callback", {
      params: { code, state },
      redirect: "manual",
    });
  } catch {
    // memo: 응답 사항은 고려사항이 아닙니다.
  }
};

export const reissueAccessToken = async (): Promise<string> => {
  const result = await api.post<ApiResult<ReissueResponseDto>>(
    "/api/v1/auth/reissue",
    undefined,
    { headers: JSON_CONTENT_TYPE_HEADERS }
  );
  return result.data.accessToken;
};

export const logoutRequest = async (): Promise<void> => {
  await api.post<ApiResult<null>>("/api/v1/auth/logout", undefined, {
    headers: JSON_CONTENT_TYPE_HEADERS,
  });
};
