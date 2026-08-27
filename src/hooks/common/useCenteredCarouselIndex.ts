import { useEffect, useRef, useState } from "react";

export const useCenteredCarouselIndex = (itemCount: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centeredIndex, setCenteredIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = itemRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (index !== -1) setCenteredIndex(index);
        });
      },
      { root: container, rootMargin: "0px -50% 0px -50%", threshold: 0 }
    );

    itemRefs.current.slice(0, itemCount).forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [itemCount]);

  const setItemRef = (index: number) => (node: HTMLDivElement | null) => {
    itemRefs.current[index] = node;
  };

  return { containerRef, setItemRef, centeredIndex };
};
