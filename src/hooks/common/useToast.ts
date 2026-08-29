"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_DURATION_MS = 2000;

export const useToast = (durationMs = DEFAULT_DURATION_MS) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setToastMessage(message);
      timerRef.current = setTimeout(() => setToastMessage(null), durationMs);
    },
    [durationMs]
  );

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  return { toastMessage, showToast };
};
