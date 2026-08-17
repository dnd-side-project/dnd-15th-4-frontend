import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const toggleVariants = cva(
  "group/toggle relative inline-flex shrink-0 cursor-pointer items-center outline-none transition-colors focus-visible:ring-3 focus-visible:ring-primary-normal/50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        pill: "h-7 w-14 rounded-pill p-0.5 data-[checked]:bg-surface-6 data-[unchecked]:bg-surface-1",
        radio:
          "size-6 justify-center rounded-pill border-2 bg-transparent data-[checked]:border-primary-normal data-[unchecked]:border-border-1",
        icon: "h-10 w-21.25 rounded-pill border border-border-1 bg-bg-normal",
      },
    },
    defaultVariants: {
      variant: "pill",
    },
  }
);

export type ToggleProps = Omit<SwitchPrimitive.Root.Props, "render"> &
  VariantProps<typeof toggleVariants> & {
    iconOff?: React.ReactNode;
    iconOn?: React.ReactNode;
    /** Shown instead of `iconOff` while this side is the active (selected) one. */
    iconOffFilled?: React.ReactNode;
    /** Shown instead of `iconOn` while this side is the active (selected) one. */
    iconOnFilled?: React.ReactNode;
  };

export const Toggle = ({
  className,
  variant = "pill",
  iconOff,
  iconOn,
  iconOffFilled,
  iconOnFilled,
  ...props
}: ToggleProps) => {
  if (variant === "icon") {
    return (
      <SwitchPrimitive.Root
        data-slot="toggle"
        className={cn(toggleVariants({ variant, className }))}
        {...props}
      >
        <span
          data-slot="toggle-icon-off"
          className="rounded-pill text-border-2 group-data-[unchecked]/toggle:bg-surface-6 absolute top-0.5 left-0.5 flex h-8.5 w-10.75 items-center justify-center transition-colors group-data-[unchecked]/toggle:text-white"
        >
          <span className="group-data-[unchecked]/toggle:hidden">
            {iconOff}
          </span>
          <span className="hidden group-data-[unchecked]/toggle:block">
            {iconOffFilled ?? iconOff}
          </span>
        </span>
        <span
          data-slot="toggle-icon-on"
          className="rounded-pill text-border-2 group-data-[checked]/toggle:bg-surface-6 absolute top-0.5 left-9.5 flex h-8.5 w-10.75 items-center justify-center transition-colors group-data-[checked]/toggle:text-white"
        >
          <span className="group-data-[checked]/toggle:hidden">{iconOn}</span>
          <span className="hidden group-data-[checked]/toggle:block">
            {iconOnFilled ?? iconOn}
          </span>
        </span>
      </SwitchPrimitive.Root>
    );
  }

  return (
    <SwitchPrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="toggle-thumb"
        className={cn(
          "block rounded-pill transition-transform",
          variant === "radio"
            ? "size-3.5 scale-0 bg-primary-normal data-checked:scale-100"
            : "size-6 bg-white data-checked:translate-x-7 data-checked:bg-point-normal"
        )}
      />
    </SwitchPrimitive.Root>
  );
};
