"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { KakaoLoginButton } from "@/components/common/KakaoLoginButton";
import { useAuthStore } from "@/stores/useAuthStore";

const LandingPage = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (_hasHydrated && isAuthenticated) {
      router.replace("/home");
    }
  }, [_hasHydrated, isAuthenticated, router]);

  const handleLogin = () => {
    login({ id: "mock-id", nickname: "퍼즐밋 유저" });
    router.replace("/home");
  };

  if (!_hasHydrated || isAuthenticated) {
    return null;
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
