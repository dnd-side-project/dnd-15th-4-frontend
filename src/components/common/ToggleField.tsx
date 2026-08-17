import { Toggle, type ToggleProps } from "@/components/common/Toggle";

import { cn } from "@/lib/utils";

export interface ToggleFieldProps extends Omit<ToggleProps, "variant"> {
  label: string;
  className?: string;
}

export const ToggleField = ({
  label,
  className,
  ...toggleProps
}: ToggleFieldProps) => (
  <div className={cn("flex w-full items-center justify-between", className)}>
    <span className="h4 text-primary font-bold">{label}</span>
    <Toggle aria-label={label} {...toggleProps} />
  </div>
);
