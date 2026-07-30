# 🪪 02. 네이밍 컨벤션

변수, 함수, 파일, 폴더 등 식별자 작성 규칙을 정의합니다.

## 🔡 기본 케이스

| 대상              | 케이스             | 예시                               |
| :---------------- | :----------------- | :--------------------------------- |
| 변수 / 함수       | `camelCase`        | `currentUser`, `fetchMeets`        |
| 컴포넌트          | `PascalCase`       | `DeleteButton`, `MeetCard`         |
| 타입 / 인터페이스 | `PascalCase`       | `UserProfile`, `MeetDto`           |
| 하드코딩 상수     | `UPPER_SNAKE_CASE` | `COLOR_WHITE = "#ffffff"`          |
| 파일 (컴포넌트)   | `PascalCase.tsx`   | `DeleteButton.tsx`                 |
| 파일 (공통 UI)    | `kebab-case.tsx`   | `button.tsx`, `option-menu.tsx`    |
| 파일 (훅)         | `camelCase.ts`     | `useOnlineStatus.ts`               |
| 파일 (모듈/폴더)  | `kebab-case`       | `query-client.ts`, `user-profile/` |

---

## ✍️ 함수 및 변수 작성 규칙

- 선언은 **Arrow Function**을 표준으로 사용합니다.
- 반환 타입은 TS 추론에 맡기되, **외부 API 함수(`Promise<T>`)**나 **유니온 타입(`T | null`)**에만 명시합니다.

```ts
// ✅ DO: 화살표 함수 + 필요 시에만 반환 타입 명시
export const fetchMeets = async (query: string): Promise<Meet[]> => {
  const response = await api.get<Meet[]>(`/meets?q=${query}`);
  return response.data;
};

// ❌ DON'T: function 키워드 지양
export function fetchMeets(query) {
  return api.get(`/meets?q=${query}`).then((r) => r.data);
}
```

## 🧠 의도를 드러내는 네이밍 접두사

### boolean 은 `is` / `has` / `should` 로 시작

```ts
const isLoading = true;
const hasPermission = checkPermission(user);
const shouldRender = isVisible && hasData;
```

### 이벤트 핸들러는 `handle` / `on` 으로 시작

| 위치                            | 접두사   | 예시                            |
| ------------------------------- | -------- | ------------------------------- |
| 내부에서 정의/호출하는 함수     | `handle` | `const handleSubmit = () => {}` |
| props 로 외부에서 전달받는 콜백 | `on`     | `onClick`, `onChange`           |

```tsx
interface ButtonProps {
  onClick: () => void;
}

const SubmitButton = ({ onClick }: ButtonProps) => {
  const handleClick = () => {
    console.info("clicked");
    onClick();
  };

  return <button onClick={handleClick}>제출</button>;
};
```

### getter 함수는 `get` 으로 시작

```ts
const getUserName = (user: User) => user.name;
const getMeetById = (id: string) => ...;
```

### 비동기 함수는 동사형 + 대상

```ts
const fetchMeets = async (): Promise<Meet[]> => {...};
const saveMeet = async (meet: Meet) => {...};
const deleteMeet = async (id: string) => {...};
```

## 🚫 줄임말 지양

잘못된 이해를 유발할 수 있는 줄임말을 피합니다.

| ❌     | ✅            |
| ------ | ------------- |
| `btn`  | `button`      |
| `img`  | `image`       |
| `usr`  | `user`        |
| `desc` | `description` |
| `idx`  | `index`       |

예외적으로 업계에서 굳어진 약어(`id`, `url`, `api`, `dto`, `uuid` 등)는 사용합니다.

## 🎯 TanStack Query Key

```ts
// 튜플로 작성하고, 전용 상수로 관리한다.
export const meetKeys = {
  all: ["meets"] as const,
  lists: () => [...meetKeys.all, "list"] as const,
  list: (filters: MeetFilter) => [...meetKeys.lists(), filters] as const,
  details: () => [...meetKeys.all, "detail"] as const,
  detail: (id: string) => [...meetKeys.details(), id] as const,
};
```

## 💡 체크리스트

- [ ] 변수/함수는 `camelCase` 인가?
- [ ] 컴포넌트는 `PascalCase` 인가?
- [ ] 하드코딩 상수는 `UPPER_SNAKE_CASE` 인가?
- [ ] 외부 API 함수(`Promise<T>`)나 `T | null` 유니온에만 반환 타입을 명시했는가?
- [ ] boolean 변수는 `is` / `has` / `should` 로 시작하는가?
- [ ] 이벤트 핸들러는 `handle` / `on` 을 구분해서 사용하는가?
- [ ] 과도한 줄임말을 쓰지 않았는가?
