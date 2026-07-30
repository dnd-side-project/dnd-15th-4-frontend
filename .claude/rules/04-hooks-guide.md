# ⚓ 04. 커스텀 훅 가이드

복잡한 비즈니스 로직과 상태 관리를 안전하게 분리하기 위한 가이드입니다.

## 📌 핵심 원칙

- **도메인별 폴더 관리**: `src/hooks/` 최상단에 훅을 직접 놓지 말고, 도메인별/기능별 서브 폴더(`src/hooks/map/`, `src/hooks/auth/`, `src/hooks/common/` 등)를 생성한 후 내부에 `useXxx.ts`를 작성합니다.
- **복잡한 로직 분리**: 컴포넌트 내 복잡한 UI/상태 로직(예: 지도 클러스터링)은 반드시 커스텀 훅으로 추출합니다.
- **네이밍**: `use[Feature]` 패턴 (`camelCase`)을 준수합니다.
- **성능 최적화**: 의존성 배열을 명확히 지정하고 불필요한 리렌더링을 방지합니다.

---

## 💻 작성 예시

```typescript
// src/hooks/map/useClustering.ts
import { useState, useCallback, useMemo } from "react";

interface Point {
  lat: number;
  lng: number;
}

export const useClustering = (points: Point[]) => {
  const [zoomLevel, setZoomLevel] = useState<number>(10);

  // 불필요한 연산 방지를 위해 useMemo 활용
  const clusters = useMemo(() => {
    return calculateClusters(points, zoomLevel);
  }, [points, zoomLevel]);

  // 핸들러 함수는 useCallback 적용
  const handleZoomChange = useCallback((newZoom: number) => {
    setZoomLevel(newZoom);
  }, []);

  return { clusters, zoomLevel, handleZoomChange };
};
```

## 💡 체크리스트

- [ ] 훅 이름이 use 접두사로 시작하는가?
- [ ] useEffect, useCallback 등의 의존성 배열(deps)이 빠짐없이 명시되었는가?
- [ ] 컴포넌트에 거대한 상태 로직이 남아있지 않고 훅으로 추출되었는가?
