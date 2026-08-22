import { cn } from "@/lib/utils";

export interface PuzzleSetIndicatorProps {
  pageCount: number;
  currentPage: number;
  className?: string;
  activeDotClassName?: string;
  inactiveDotClassName?: string;
}

export const PuzzleSetIndicator = ({
  pageCount,
  currentPage,
  className,
  activeDotClassName = "bg-surface-6 w-2.75",
  inactiveDotClassName = "bg-sub2-light-hover",
}: PuzzleSetIndicatorProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-1.75", className)}>
      {Array.from({ length: pageCount }).map((_, index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            "rounded-pill size-1.5 transition-colors",
            index === currentPage ? activeDotClassName : inactiveDotClassName
          )}
        />
      ))}
    </div>
  );
};
