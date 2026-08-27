import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface DoubleButtonProps {
  secondaryLabel: string;
  primaryLabel: string;
  onSecondaryClick?: () => void;
  onPrimaryClick?: () => void;
  isSecondaryDisabled?: boolean;
  isPrimaryDisabled?: boolean;
  className?: string;
  secondaryClassName?: string;
}

export const DoubleButton = ({
  secondaryLabel,
  primaryLabel,
  onSecondaryClick,
  onPrimaryClick,
  isSecondaryDisabled,
  isPrimaryDisabled,
  className,
  secondaryClassName,
}: DoubleButtonProps) => {
  return (
    <div className={cn("flex w-full items-center gap-2", className)}>
      <Button
        variant="secondary"
        className={cn("w-29.25", secondaryClassName)}
        onClick={onSecondaryClick}
        disabled={isSecondaryDisabled}
      >
        {secondaryLabel}
      </Button>
      <Button
        variant="default"
        className="flex-1"
        onClick={onPrimaryClick}
        disabled={isPrimaryDisabled}
      >
        {primaryLabel}
      </Button>
    </div>
  );
};
