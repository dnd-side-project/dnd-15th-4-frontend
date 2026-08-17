import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  id: string;
  nickname: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      login: (userData) =>
        set({
          isAuthenticated: true,
          user: userData,
        }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "puzzlemeet-auth",
      onRehydrateStorage: () => () => {
        queueMicrotask(() => {
          useAuthStore.getState().setHasHydrated(true);
        });
      },
    }
  )
);
