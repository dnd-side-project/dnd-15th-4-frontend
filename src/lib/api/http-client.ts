import { HttpError } from "@/lib/api/http-error";
import { useAuthStore } from "@/stores/useAuthStore";
import type { ApiResult } from "@/types/api";
import type { ReissueResponseDto } from "@/types/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type QueryParams = Record<string, string | number | boolean | undefined | null>;

interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: QueryParams;
  body?: unknown;
}

const buildQueryString = (params?: QueryParams) => {
  if (!params) return "";

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

const buildUrl = (path: string, params?: QueryParams) =>
  `${BASE_URL}${path}${buildQueryString(params)}`;

const parseResponseBody = async (response: Response) => {
  if (response.status === 204) return undefined;

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || undefined;
};

async function request<T>(
  path: string,
  { params, body, headers, ...init }: RequestOptions = {}
): Promise<T> {
  const isJsonBody = body !== undefined && !(body instanceof FormData);
  const accessToken = useAuthStore.getState().accessToken;

  const response = await fetch(buildUrl(path, params), {
    ...init,
    credentials: "include",
    headers: {
      ...(isJsonBody && { "Content-Type": "application/json" }),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...headers,
    },
    body: isJsonBody ? JSON.stringify(body) : (body as BodyInit | undefined),
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    throw new HttpError(
      response.status,
      response.statusText || "Request failed",
      data
    );
  }

  return data as T;
}

let reissuePromise: Promise<boolean> | null = null;

const tryReissue = (): Promise<boolean> => {
  if (!reissuePromise) {
    reissuePromise = request<ApiResult<ReissueResponseDto>>("/auth/reissue", {
      method: "POST",
      credentials: "include",
    })
      .then((result) => {
        useAuthStore.getState().setAccessToken(result.data.accessToken);
        return true;
      })
      .catch(() => {
        useAuthStore.getState().logout();
        return false;
      })
      .finally(() => {
        reissuePromise = null;
      });
  }
  return reissuePromise;
};

async function requestWithAuthRetry<T>(
  path: string,
  options?: RequestOptions
): Promise<T> {
  try {
    return await request<T>(path, options);
  } catch (error) {
    const isExpiredToken =
      error instanceof HttpError &&
      error.status === 401 &&
      useAuthStore.getState().accessToken !== null;

    if (isExpiredToken && (await tryReissue())) {
      return request<T>(path, options);
    }
    throw error;
  }
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, "body">) =>
    requestWithAuthRetry<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    requestWithAuthRetry<T>(path, { ...options, method: "POST", body }),

  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    requestWithAuthRetry<T>(path, { ...options, method: "PUT", body }),

  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    requestWithAuthRetry<T>(path, { ...options, method: "PATCH", body }),

  delete: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    requestWithAuthRetry<T>(path, { ...options, method: "DELETE", body }),
};
