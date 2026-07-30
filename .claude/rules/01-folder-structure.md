# 📂 01. 폴더 구조 가이드

이 문서는 프로젝트의 디렉토리 구성 방식과 파일 배치 원칙을 정의합니다.

## 🏗️ 폴더 구조 채택 방식

기본적으로 **역할 기반(Role-based)** 구조를 채택하되, 파일 수 증가 및 모듈 엉킴을 방지하기 위해 `types/`, `hooks/`, `apis/` 내부에서는 **도메인별 서브 폴더**를 생성합니다.

```text
src/
├── app/             # Next.js App Router 페이지 및 프로바이더
├── apis/            # 도메인별 API 함수 및 쿼리 키
│   ├── auth/
│   └── user/
├── assets/          # 폰트 및 고정 이미지
│   ├── fonts/
│   └── images/
├── components/      # UI 컴포넌트
│   ├── icons/       # SVG 컴포넌트
│   └── ui/          # shadcn / Base UI 공통 컴포넌트
├── constants/       # 전역 상수
├── hooks/           # 도메인별/공통 커스텀 훅
│   ├── common/
│   └── map/
├── lib/             # 유틸리티 및 HTTP 클라이언트
├── stores/          # Zustand 스토어
└── types/           # TS 타입/DTO (도메인별 분리)
    ├── auth.ts
    └── user.ts
```

## 🔗 Import 경로 규칙

상위 디렉터리를 추적하는 상대 경로(`../../`) 사용을 금지하며, 아래 기준에 맞춰 경로를 작성합니다.

| 상황                      | ✅ 허용                                     | ❌ 금지                                                |
| :------------------------ | :------------------------------------------ | :----------------------------------------------------- |
| **같은 폴더 (상대 경로)** | `import { ComponentA } from './ComponentA'` | `import { ComponentA } from '@/components/ComponentA'` |
| **다른 폴더 (절대 경로)** | `import { cn } from '@/lib/utils'`          | `import { cn } from '../../lib/utils'`                 |

- **같은 디렉터리 내부**: 상대 경로(`./`) 사용
- **다른 디렉터리 참조**: 절대 경로 별칭(`@/`) 사용
