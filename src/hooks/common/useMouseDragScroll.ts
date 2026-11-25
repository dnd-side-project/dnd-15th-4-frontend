import {
  type PointerEvent,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from "react";

const DRAG_THRESHOLD_RATIO = 0.15;
const SNAP_RESTORE_FALLBACK_MS = 500;

interface DragState {
  startX: number;
  startScrollLeft: number;
  startPage: number;
}

interface UseMouseDragScrollParams {
  containerRef: RefObject<HTMLDivElement | null>;
  goToPage: (page: number) => void;
}

const getTargetPage = (
  startPage: number,
  deltaX: number,
  threshold: number
) => {
  if (deltaX <= -threshold) return startPage + 1;
  if (deltaX >= threshold) return startPage - 1;
  return startPage;
};

export const useMouseDragScroll = ({
  containerRef,
  goToPage,
}: UseMouseDragScrollParams) => {
  const dragStateRef = useRef<DragState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapDisabled, setIsSnapDisabled] = useState(false);

  const restoreSnapAfterScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      setIsSnapDisabled(false);
      return;
    }

    let timerId = 0;
    const handleScrollEnd = () => {
      window.clearTimeout(timerId);
      container.removeEventListener("scrollend", handleScrollEnd);
      setIsSnapDisabled(false);
    };

    // scrollend 미지원 브라우저 및 이동 거리 0인 경우 대비
    timerId = window.setTimeout(handleScrollEnd, SNAP_RESTORE_FALLBACK_MS);
    container.addEventListener("scrollend", handleScrollEnd);
  }, [containerRef]);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;

      const container = containerRef.current;
      if (!container || container.clientWidth === 0) return;

      dragStateRef.current = {
        startX: event.clientX,
        startScrollLeft: container.scrollLeft,
        startPage: Math.round(container.scrollLeft / container.clientWidth),
      };
      container.setPointerCapture(event.pointerId);
      setIsDragging(true);
      setIsSnapDisabled(true);
    },
    [containerRef]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current;
      const container = containerRef.current;
      if (!dragState || !container) return;

      container.scrollLeft =
        dragState.startScrollLeft - (event.clientX - dragState.startX);
    },
    [containerRef]
  );

  const handlePointerEnd = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current;
      const container = containerRef.current;
      if (!dragState || !container) return;

      dragStateRef.current = null;
      setIsDragging(false);

      const deltaX = event.clientX - dragState.startX;
      const threshold = container.clientWidth * DRAG_THRESHOLD_RATIO;

      goToPage(getTargetPage(dragState.startPage, deltaX, threshold));
      restoreSnapAfterScroll();
    },
    [containerRef, goToPage, restoreSnapAfterScroll]
  );

  return {
    isDragging,
    isSnapDisabled,
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
    },
  };
};
