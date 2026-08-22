import { useCallback, useEffect, useRef, useState } from "react";

export const useCarouselPage = (pageCount: number, initialPage = 0) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || initialPage === 0 || container.clientWidth === 0) {
      return;
    }

    container.scrollLeft = container.clientWidth * initialPage;
  }, [initialPage]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.clientWidth === 0) return;

    const nextPage = Math.round(container.scrollLeft / container.clientWidth);
    const clampedPage = Math.min(Math.max(nextPage, 0), pageCount - 1);

    setCurrentPage(clampedPage);
  }, [pageCount]);

  return { containerRef, currentPage, handleScroll };
};
