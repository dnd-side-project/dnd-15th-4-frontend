import { Toggle, type ToggleProps } from "@/components/common/Toggle";

import { cn } from "@/lib/utils";

export interface ToggleFieldProps extends Omit<ToggleProps, "variant"> {
  label: string;
  isBold?: boolean;
  className?: string;
}

export const ToggleField = ({
  label,
  isBold = false,
  className,
  ...toggleProps
}: ToggleFieldProps) => (
  <div className={cn("flex w-full items-center justify-between", className)}>
    <span className={cn("text-primary", isBold ? "h4 font-bold" : "body2")}>
      {label}
    </span>
    <Toggle aria-label={label} {...toggleProps} />
  </div>
);
