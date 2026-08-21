"use client";

import { useEffect } from "react";

import { exchangeKakaoCode, reissueAccessToken } from "@/apis/auth/auth";
import { fetchCurrentUser } from "@/apis/auth/user";
import { useAuthStore } from "@/stores/useAuthStore";

const consumeKakaoCallbackParams = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");
  const error = params.get("error");

  if (!code && !state && !error) return null;

  window.history.replaceState({}, "", window.location.pathname);
  return { code, state, error };
};

export const useAuthBootstrap = () => {
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const hasBootstrapped = useAuthStore((state) => state._hasBootstrapped);
  const setHasBootstrapped = useAuthStore((state) => state.setHasBootstrapped);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!hasHydrated || hasBootstrapped) return;

    let isCancelled = false;

    const bootstrap = async () => {
      try {
        const kakaoParams = consumeKakaoCallbackParams();
        if (kakaoParams?.error) throw new Error(kakaoParams.error);
        if (kakaoParams?.code && kakaoParams?.state) {
          await exchangeKakaoCode(kakaoParams.code, kakaoParams.state);
        }

        const accessToken = await reissueAccessToken();
        useAuthStore.getState().setAccessToken(accessToken);
        const user = await fetchCurrentUser();
        if (!isCancelled) login(user, accessToken);
      } catch {
        if (!isCancelled) logout();
      } finally {
        if (!isCancelled) setHasBootstrapped(true);
      }
    };

    bootstrap();

    return () => {
      isCancelled = true;
    };
  }, [hasHydrated, hasBootstrapped, login, logout, setHasBootstrapped]);
};
