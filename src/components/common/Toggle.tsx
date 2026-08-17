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
        icon: "h-10 w-20 justify-between gap-0.5 rounded-pill border border-border-1 bg-bg-normal p-0.5",
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
  };

export const Toggle = ({
  className,
  variant = "pill",
  iconOff,
  iconOn,
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
          className="rounded-pill text-border-2 group-data-unchecked/toggle:bg-surface-6 flex size-9 items-center justify-center transition-colors group-data-unchecked/toggle:text-white"
        >
          {iconOff}
        </span>
        <span
          data-slot="toggle-icon-on"
          className="rounded-pill text-border-2 group-data-checked/toggle:bg-surface-6 flex size-9 items-center justify-center transition-colors group-data-checked/toggle:text-white"
        >
          {iconOn}
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
