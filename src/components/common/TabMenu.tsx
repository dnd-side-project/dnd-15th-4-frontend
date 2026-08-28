import { cn } from "@/lib/utils";

export interface TabMenuProps {
  leftLabel: string;
  rightLabel: string;
  selectedTab: "left" | "right";
  onLeftClick?: () => void;
  onRightClick?: () => void;
  leftBadge?: boolean;
  rightBadge?: boolean;
  className?: string;
}

export const TabMenu = ({
  leftLabel,
  rightLabel,
  selectedTab,
  onLeftClick,
  onRightClick,
  leftBadge,
  rightBadge,
  className,
}: TabMenuProps) => {
  return (
    <div className={cn("relative flex w-full", className)}>
      <button
        type="button"
        onClick={onLeftClick}
        aria-pressed={selectedTab === "left"}
        aria-label={leftBadge ? `${leftLabel}, 변경 사항 있음` : leftLabel}
        className={cn(
          "menu relative flex-1 pb-3.25 text-center text-disable transition-colors pt-1",
          selectedTab === "left" && "menu-select text-primary"
        )}
      >
        <span className="relative inline-flex items-center">
          {leftLabel}
          {leftBadge && (
            <span className="bg-red absolute -top-0.5 -right-2 size-1.5 rounded-full" />
          )}
        </span>
      </button>
      <button
        type="button"
        onClick={onRightClick}
        aria-pressed={selectedTab === "right"}
        aria-label={rightBadge ? `${rightLabel}, 변경 사항 있음` : rightLabel}
        className={cn(
          "menu relative flex-1 pb-3.25 text-center text-disable transition-colors pt-1",
          selectedTab === "right" && "menu-select text-primary"
        )}
      >
        <span className="relative inline-flex items-center">
          {rightLabel}
          {rightBadge && (
            <span className="bg-red absolute top-0.5 -right-2 size-1.5 rounded-full" />
          )}
        </span>
      </button>
      <span className="bg-border-1 absolute inset-x-0 bottom-0 h-px" />
      <span
        className={cn(
          "absolute bottom-0 h-0.5 w-1/2 bg-border-4 transition-all",
          selectedTab === "right" && "left-1/2"
        )}
      />
    </div>
  );
};
