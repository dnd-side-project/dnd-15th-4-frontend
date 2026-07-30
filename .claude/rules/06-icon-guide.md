# 🖼️ 06. 아이콘 제작 및 사용 가이드

Figma MCP 활용 및 SVG 아이콘 컴포넌트 관리 가이드입니다.

## 📌 제작 순서

1. **Figma MCP 이용**: 피그마 디자인 요소에서 SVG 경로(Path) 추출.
2. **컴포넌트 생성**: `src/components/icons/` 위치에 `Ic[PascalCase].tsx` 파일 생성.
3. **Barrel Export**: `src/components/icons/index.ts`에 re-export 추가.

---

## 🏷️ 네이밍 규칙

- **접두사**: `Ic` + `PascalCase`
- Figma 레이어 이름 기반으로 작성 (예: `IcArrowRight.tsx`, `IcClose.tsx`)

---

## 💻 구현 및 사용 예시

### 1. 아이콘 컴포넌트 작성

```tsx
// src/components/icons/IcArrowRight.tsx
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const IcArrowRight = ({ size = 24, className, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);
```

2. Barrel Export 등록

```TypeScript
// src/components/icons/index.ts
export * from './IcArrowRight';
export * from './IcClose';
```

3. 컴포넌트 사용

```TypeScript
import { IcArrowRight } from '@/components/icons';

export const Example = () => (
  <button className="flex items-center gap-2">
    <span>다음</span>
    <IcArrowRight className="text-foreground" size="{20}"/>
  </button>
);
```

## 💡 체크리스트

- [ ] 컴포넌트명이 Ic 접두사로 시작하는가?
- [ ] index.ts에 barrel export를 등록하여 깔끔하게 불러올 수 있게 했는가?
