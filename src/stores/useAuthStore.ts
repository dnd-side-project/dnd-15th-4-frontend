import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  id: string;
  nickname: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: () =>
        set({
          isAuthenticated: true,
          user: { id: "mock-user-1", nickname: "퍼즐밋 유저" },
        }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: "puzzlemeet-auth" }
  )
);
