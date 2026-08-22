import { cn } from "@/lib/utils";

interface IconActionHeaderProps {
  icon?: React.ReactNode;
  iconAriaLabel?: string;
  onIconClick?: () => void;
  detailText?: string;
  onDetailClick?: () => void;
  className?: string;
}

export const IconActionHeader = ({
  icon,
  iconAriaLabel,
  onIconClick,
  detailText,
  onDetailClick,
  className,
}: IconActionHeaderProps) => {
  return (
    <div
      className={cn("flex w-full items-center p-4 justify-between", className)}
    >
      {icon && (
        <button
          type="button"
          onClick={onIconClick}
          aria-label={iconAriaLabel}
          className="text-primary flex size-6 items-center justify-center"
        >
          {icon}
        </button>
      )}
      {detailText && (
        <button
          type="button"
          onClick={onDetailClick}
          className="body3 text-primary ml-auto"
        >
          {detailText}
        </button>
      )}
    </div>
  );
};
