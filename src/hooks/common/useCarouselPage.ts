import { useCallback, useRef, useState } from "react";

export const useCarouselPage = (pageCount: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.clientWidth === 0) return;

    const nextPage = Math.round(container.scrollLeft / container.clientWidth);
    const clampedPage = Math.min(Math.max(nextPage, 0), pageCount - 1);

    setCurrentPage(clampedPage);
  }, [pageCount]);

  return { containerRef, currentPage, handleScroll };
};
