"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AuthLoadingScreen } from "@/components/common/AuthLoadingScreen";
import { KakaoLoginButton } from "@/components/home/KakaoLoginButton";
import { useAuthStore } from "@/stores/useAuthStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const LandingPage = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const _hasBootstrapped = useAuthStore((state) => state._hasBootstrapped);
  const isReady = _hasHydrated && _hasBootstrapped;

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/home");
    }
  }, [isReady, isAuthenticated, router]);

  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/v1/auth/kakao/authorize`;
  };

  if (!isReady || isAuthenticated) {
    return <AuthLoadingScreen />;
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-end gap-6 px-4 pb-10">
      <KakaoLoginButton onClick={handleLogin} />
      <button type="button" className="body6 text-disable">
        퍼즐밋이란?
      </button>
    </main>
  );
};

export default LandingPage;
