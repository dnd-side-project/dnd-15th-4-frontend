import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PillButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const PillButton = ({
  text,
  icon,
  onClick,
  className,
}: PillButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bg-primary-normal rounded-pill flex h-10 w-full items-center justify-center gap-1",
        className
      )}
    >
      {icon}
      <span className="body5 text-white">{text}</span>
    </button>
  );
};
