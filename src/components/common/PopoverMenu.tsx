"use client";

import type { ReactNode } from "react";
import { Popover } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";

export interface PopoverMenuItem {
  label: string;
  onClick: () => void;
}

export interface PopoverMenuProps {
  triggerAriaLabel: string;
  triggerClassName?: string;
  triggerContent: ReactNode;
  items: PopoverMenuItem[];
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  menuWidthClassName?: string;
}

export const PopoverMenu = ({
  triggerAriaLabel,
  triggerClassName,
  triggerContent,
  items,
  side = "bottom",
  align = "end",
  sideOffset = 8,
  menuWidthClassName = "w-48.25",
}: PopoverMenuProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label={triggerAriaLabel}
        className={triggerClassName}
      >
        {triggerContent}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          className="z-50"
        >
          <Popover.Popup
            className={cn(
              "rounded-16 divide-divider-4 flex flex-col divide-y overflow-hidden bg-white px-4.5 py-0 shadow-4",
              menuWidthClassName
            )}
          >
            {items.map(({ label, onClick }) => (
              <Popover.Close
                key={label}
                onClick={onClick}
                className="body2 text-primary cursor-pointer py-4 text-left font-semibold transition-colors"
              >
                {label}
              </Popover.Close>
            ))}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
