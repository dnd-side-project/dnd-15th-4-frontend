import Image from "next/image";

import emptyImage from "@/assets/images/home-empty-schedule.png";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  message: string;
  className?: string;
}

export const EmptyState = ({ message, className }: EmptyStateProps) => (
  <div
    className={cn("flex flex-col items-center gap-3.5 opacity-46", className)}
  >
    <Image
      src={emptyImage}
      alt=""
      width={99}
      height={99}
      className="opacity-30"
    />
    <p className="body2 text-secondary-1 text-center whitespace-pre-line">
      {message}
    </p>
  </div>
);
