# 🎨 05. 디자인 시스템 및 스타일링

Tailwind CSS v4 및 shadcn/ui 기반의 스타일 작성 규칙을 정의합니다.

## 📐 단위 및 수치 규칙

- **수치(px) 직접 작성 금지**: `p-[4px]`나 `w-[100px]`처럼 픽셀을 직접 넣지 말아주세요.
- **Tailwind Spacing / rem 사용**: 기본 간격 클래스(`p-1`, `m-4` 등)나 `rem`/`em` 단위를 활용합니다.

---

## 🎨 디자인 토큰 사용

### 절대 규칙: 하드코딩 금지

```Typescript
// ❌ 하드코딩 금지
<div className="bg-[#f7f7f7] text-[#090909] p-[12px]" />
<p style={{ color: '#737373' }} />

// ✅ 디자인 토큰 사용
<div className="bg-muted text-foreground p-3" />
<p className="text-muted-foreground" />
```

## 🧩 shadcn/ui & Base UI 규칙

- **Radix UI 절대 금지**: shadcn/ui 사용 시 Radix UI 대신 @base-ui/react를 반드시 사용합니다.
- **컴포넌트 구현 패턴**: cva , Base UI Props 확장, cn() (clsx + tailwind-merge) 조합을 사용합니다.

### ✅ DO

```TypeScript
// src/components/common/Button.tsx
import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <BaseButton className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
};
```

## 💡 체크리스트

- [ ] 하드코딩된 색상(#ffffff) 대신 디자인 토큰을 사용했는가?
- [ ] 타이포그래피 토큰을 사용했는가? (예: Head1, Body2)
- [ ] 대괄호 표기법(p-[4px]) 대신 Tailwind 기본 간격 단위를 사용했는가?
