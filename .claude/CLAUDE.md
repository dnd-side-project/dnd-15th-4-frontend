# 🤖 Project Guidelines & Commands

이 프로젝트의 상세 개발 컨벤션 및 규칙은 `.claude/rules/` 디렉터리 내의 세부 문서에 정의되어 있습니다.

## 🚀 Quick Commands

### Development

- `pnpm dev` : 개발 서버 실행
- `pnpm build` : Production 빌드
- `pnpm start` : Production 서버 실행

### Code Quality & Linting

- `pnpm lint` : Oxlint 린트 검사 실행
- `pnpm format` : Oxfmt 코드 포맷팅 실행
- `pnpm type-check` : TypeScript 타입 검사

## 📚 Detailed Rules (.claude/rules/)

작업 시 아래 세부 컨벤션 문서를 반드시 참조하여 코드를 작성하세요.

| 문서명                         | 주요 내용                                                           |
| :----------------------------- | :------------------------------------------------------------------ |
| **`01-folder-structure.md`**   | 디렉터리 구조, FSD/도메인 분리 원칙, Import 경로 별칭(`@/`) 규칙    |
| **`02-naming-conventions.md`** | 케이스별 식별자 네이밍, 접두사, 줄임말 금지 규칙                    |
| **`03-api-conventions.md`**    | HTTP 클라이언트 사용법, DTO 정의, TanStack Query Key 패턴           |
| **`04-hooks-guide.md`**        | 커스텀 훅 위치(`src/hooks/도메인명/`), 작성 및 성능 최적화 패턴     |
| **`05-design-system.md`**      | Tailwind CSS v4, 디자인 토큰 사용법, `@base-ui/react` 및 `cva` 규칙 |
| **`06-icon-guide.md`**         | 아이콘 컴포넌트 사용 규칙, SVG 관리 및 네이밍 컨벤션                |
| **`07-commit-conventions.md`** | 커밋 타입, 작성 규칙, Husky 이슈 번호 자동 연동                     |

## 💡 Key Reminders

- **Strict TypeScript** : `any` 타입 사용을 금지하며 DTO 및 인터페이스를 명확히 선언합니다.
- **디자인 토큰 활용** : 인라인 스타일 및 임의 수치(`p-[4px]`)를 지양하고 `globals.css` 토큰을 참조합니다.
- **경로 별칭 준수** : 다른 디렉터리의 모듈 참조 시 상대 경로(`../../`) 대신 `@/` 절대 경로 별칭을 사용합니다.
