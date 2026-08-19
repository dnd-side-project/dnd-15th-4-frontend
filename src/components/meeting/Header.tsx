import { cn } from "@/lib/utils";

interface HeaderProps {
  icon?: React.ReactNode;
  iconAriaLabel?: string;
  onIconClick?: () => void;
  detailText?: string;
  onDetailClick?: () => void;
  className?: string;
}

export const Header = ({
  icon,
  iconAriaLabel,
  onIconClick,
  detailText,
  onDetailClick,
  className,
}: HeaderProps) => {
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
