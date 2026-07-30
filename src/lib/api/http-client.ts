import { HttpError } from "@/lib/api/http-error";

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

  const response = await fetch(buildUrl(path, params), {
    ...init,
    headers: {
      ...(isJsonBody && { "Content-Type": "application/json" }),
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

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, "body">) =>
    request<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),

  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),

  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),

  delete: <T>(path: string, options?: Omit<RequestOptions, "body">) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
