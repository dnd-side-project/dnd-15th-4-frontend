"use client";

import { logoutRequest } from "@/apis/auth/auth";
import { useAuthStore } from "@/stores/useAuthStore";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  return async () => {
    try {
      await logoutRequest();
    } finally {
      logout();
    }
  };
};
