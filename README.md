# 🧩 퍼즐밋

모임을 퍼즐로 완성하는 약속 관리 웹 애플리케이션입니다.

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Linter / Formatter**: Oxlint & Oxfmt
- **Package Manager**: pnpm

## 🚀 Getting Started

이 프로젝트를 실행하기 위해서는 Node.js(`.nvmrc` 참고, 22 이상)와 `pnpm`이 필요합니다.

```bash
# 1. 패키지 설치
$ pnpm install

# 2. 환경 변수 설정
# .env.example 파일을 복사하여 .env.local 파일을 생성하고 필요한 값을 입력합니다.
$ cp .env.example .env.local

# 3. 개발 서버 실행
$ pnpm dev
```

앱이 실행되면 http://localhost:3000에서 확인할 수 있습니다.

## 🔍 Scripts

| 명령어                 | 설명                     |
| :--------------------- | :----------------------- |
| `pnpm dev`             | 개발 서버 실행           |
| `pnpm build`           | Production 빌드          |
| `pnpm start`           | Production 서버 실행     |
| `pnpm lint`            | Oxlint 린트 검사         |
| `pnpm format`          | Oxfmt 코드 포맷팅        |
| `pnpm format:check`    | 포맷팅 여부만 검사       |
| `pnpm type-check`      | TypeScript 타입 검사     |
| `pnpm test`            | Vitest 테스트 실행       |
| `pnpm storybook`       | Storybook 개발 서버 실행 |
| `pnpm build-storybook` | Storybook 정적 빌드      |

## 🔀 PR Merge 전략

- `feature → develop`: Squash and Merge
- `develop → main`: Merge Commit
- `hotfix → main`: Merge Commit

커밋, 브랜치 네이밍, Merge 전략에 대한 상세 규칙은 [`07-commit-conventions.md`](.claude/rules/07-commit-conventions.md) 를 참고하세요.
