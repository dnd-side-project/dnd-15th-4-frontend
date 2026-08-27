"use client";

import { withdrawUser } from "@/apis/auth/user";
import { useAuthStore } from "@/stores/useAuthStore";

export const useWithdraw = () => {
  const logout = useAuthStore((state) => state.logout);

  return async () => {
    await withdrawUser();
    logout();
  };
};
