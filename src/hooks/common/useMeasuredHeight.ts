import { useEffect, useState, type RefObject } from "react";

export const useMeasuredHeight = (ref: RefObject<HTMLElement | null>) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateHeight = () => setHeight(element.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return height;
};
