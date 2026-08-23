import type { ReactNode, Ref } from "react";
import { Drawer } from "@base-ui/react/drawer";

import { cn } from "@/lib/utils";

export interface BottomSheetProps extends Omit<Drawer.Root.Props, "children"> {
  children?: ReactNode;
  className?: string;
  backdropClassName?: string;
  shouldShowBackdrop?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export const BottomSheet = ({
  children,
  className,
  backdropClassName,
  shouldShowBackdrop = true,
  ref,
  ...props
}: BottomSheetProps) => {
  return (
    <Drawer.Root {...props}>
      <Drawer.Portal>
        {shouldShowBackdrop && (
          <Drawer.Backdrop
            className={cn(
              "fixed inset-0 bg-black/40 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0",
              backdropClassName
            )}
          />
        )}
        <Drawer.Viewport className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center">
          <Drawer.Popup
            ref={ref}
            className={cn(
              "rounded-t-20 pointer-events-auto flex w-full max-w-md flex-col items-center gap-4 bg-white pt-5 transition-transform duration-300",
              "[transform:translateY(calc(var(--drawer-swipe-movement-y,0px)+var(--drawer-snap-point-offset,0px)))]",
              "data-ending-style:[transform:translateY(100%)] data-starting-style:[transform:translateY(100%)]",
              className
            )}
          >
            <span
              aria-hidden
              className="rounded-pill bg-handle h-1 w-18 shrink-0"
            />
            <Drawer.Content className="w-full flex-1 overflow-y-auto">
              {children}
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
