"use client";

import { Popover } from "@base-ui/react/popover";

import { IcProfile } from "@/components/icons";
import { useLogout } from "@/hooks/auth/useLogout";
import { useAuthStore } from "@/stores/useAuthStore";

export const ProfileMenu = () => {
  const user = useAuthStore((state) => state.user);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const logout = useLogout();

  const id = _hasHydrated ? user?.id : "";
  const nickname = _hasHydrated ? user?.nickname : "";

  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="프로필 메뉴"
        className="text-primary cursor-pointer"
      >
        <IcProfile size={24} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          side="bottom"
          align="end"
          sideOffset={8}
          className="z-60"
        >
          <Popover.Popup className="rounded-16 divide-border-1 flex w-48.25 flex-col divide-y bg-white px-4.5 py-0 shadow-lg">
            <div className="py-4">
              <p className="body2 text-primary truncate font-semibold">{id}</p>
              <p className="body2 text-primary truncate font-semibold">
                {nickname}님
              </p>
            </div>

            <Popover.Close
              onClick={logout}
              className="body2 text-primary hover:text-secondary-1 cursor-pointer py-4 text-left transition-colors"
            >
              로그아웃
            </Popover.Close>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
