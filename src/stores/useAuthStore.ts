import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserDto } from "@/types/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: UserDto | null;
  accessToken: string | null;
  _hasHydrated: boolean;
  _hasBootstrapped: boolean;
  setHasHydrated: (state: boolean) => void;
  setHasBootstrapped: (state: boolean) => void;
  setAccessToken: (accessToken: string | null) => void;
  login: (user: UserDto, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      _hasHydrated: false,
      _hasBootstrapped: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setHasBootstrapped: (state) => set({ _hasBootstrapped: state }),
      setAccessToken: (accessToken) => set({ accessToken }),

      login: (user, accessToken) =>
        set({
          isAuthenticated: true,
          user,
          accessToken,
        }),
      logout: () =>
        set({ isAuthenticated: false, user: null, accessToken: null }),
    }),
    {
      name: "puzzlemeet-auth",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      onRehydrateStorage: () => () => {
        queueMicrotask(() => {
          useAuthStore.getState().setHasHydrated(true);
        });
      },
    }
  )
);
