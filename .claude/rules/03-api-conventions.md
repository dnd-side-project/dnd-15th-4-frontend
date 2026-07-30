# 🌐 03. API 통신 컨벤션

API 요청, DTO 정의, TanStack Query 훅 구성 및 에러 처리 가이드입니다.

## 📌 핵심 원칙

1. Native `fetch` 래퍼인 `src/lib/api/http-client.ts`만 사용합니다. (`axios` 사용 금지)
2. 모든 통신 요청/응답 타입은 **DTO** 형태로 명시 정의합니다.
3. Query Key는 **전역 상수 객체**로 튜플 형태로 관리합니다.

---

## 🔑 Query Key 관리 패턴

```typescript
// src/apis/meet/keys.ts
export const meetKeys = {
  all: ["meets"] as const,
  lists: () => [...meetKeys.all, "list"] as const,
  list: (filters: MeetFilter) => [...meetKeys.lists(), filters] as const,
  details: () => [...meetKeys.all, "detail"] as const,
  detail: (id: string) => [...meetKeys.details(), id] as const,
};
```

## 💻 API & Custom Hook 패턴

```typescript
// 1. DTO 정의
export interface FetchMeetRequest {
  category: string;
}

export interface MeetDto {
  id: string;
  title: string;
}

// 2. API 통신 함수
export const fetchMeets = async (
  params: FetchMeetRequest
): Promise<MeetDto[]> => {
  return api.get<MeetDto[]>("/meets", { params });
};

// 3. Query / Mutation 훅 분리
export const useMeetsQuery = (params: FetchMeetRequest) => {
  return useQuery({
    queryKey: meetKeys.list(params),
    queryFn: () => fetchMeets(params),
  });
};
```

## ⚠️ 에러 핸들링 및 UX 분기

API 에러 발생 시 HttpError의 status 코드별 대응책을 마련합니다.

- 401 Unauthorized: 로그인 페이지 이동 / 토큰 재발급
- 404 Not Found: 에러 페이지 연출 또는 Toast 알림
- 500 Internal Server: 공통 에러 바운더리(Error Boundary) 처리

## 💡 체크리스트

- [ ] Request / Response DTO 타입을 명확히 정의했는가?
- [ ] useXxxQuery / useXxxMutation 규칙으로 훅을 작성했는가?
- [ ] Query Key를 튜플 기반 상수 객체로 구성했는가?
- [ ] 에러 코드별 UX 분기(Toast, Fallback UI)를 고려했는가?
