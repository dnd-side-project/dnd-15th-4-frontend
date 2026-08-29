"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { useAuthStore } from "@/stores/useAuthStore";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const _hasBootstrapped = useAuthStore((state) => state._hasBootstrapped);
  const isReady = _hasHydrated && _hasBootstrapped;

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/");
    }
  }, [isReady, isAuthenticated, router]);

  if (!isReady) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
