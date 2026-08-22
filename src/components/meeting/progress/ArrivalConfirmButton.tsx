import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ArrivalConfirmButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ArrivalConfirmButton = ({
  text,
  icon,
  onClick,
  className,
}: ArrivalConfirmButtonProps) => {
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
