import { cn } from "@/lib/utils";

export interface TabMenuProps {
  leftLabel: string;
  rightLabel: string;
  selectedTab: "left" | "right";
  onLeftClick?: () => void;
  onRightClick?: () => void;
  className?: string;
}

export const TabMenu = ({
  leftLabel,
  rightLabel,
  selectedTab,
  onLeftClick,
  onRightClick,
  className,
}: TabMenuProps) => {
  return (
    <div className={cn("relative flex w-full", className)}>
      <button
        type="button"
        onClick={onLeftClick}
        aria-pressed={selectedTab === "left"}
        className={cn(
          "menu flex-1 pb-3.25 text-center text-disable transition-colors",
          selectedTab === "left" && "menu-select text-primary"
        )}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={onRightClick}
        aria-pressed={selectedTab === "right"}
        className={cn(
          "menu flex-1 pb-3.25 text-center text-disable transition-colors",
          selectedTab === "right" && "menu-select text-primary"
        )}
      >
        {rightLabel}
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
