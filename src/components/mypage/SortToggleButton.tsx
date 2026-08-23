import { IcSyncAlt } from "@/components/icons";
import { cn } from "@/lib/utils";

export type SortOrder = "latest" | "oldest";

const SORT_ORDER_LABEL: Record<SortOrder, string> = {
  latest: "최신순",
  oldest: "오래된순",
};

interface SortToggleButtonProps {
  sortOrder: SortOrder;
  onToggle: () => void;
  className?: string;
}

export const SortToggleButton = ({
  sortOrder,
  onToggle,
  className,
}: SortToggleButtonProps) => (
  <button
    type="button"
    onClick={onToggle}
    className={cn("body8 text-disable flex items-center gap-0.75", className)}
  >
    {SORT_ORDER_LABEL[sortOrder]}
    <IcSyncAlt size={14} />
  </button>
);
