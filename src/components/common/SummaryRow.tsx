import { Fragment } from "react";

import { cn } from "@/lib/utils";

interface SummaryRowItem {
  label: string;
  value: string;
  onClick?: () => void;
}

interface SummaryRowProps {
  items: SummaryRowItem[];
  className?: string;
}

const SUMMARY_ITEM_CLASS_NAME =
  "flex h-24 flex-1 flex-col items-center justify-center gap-3";

export const SummaryRow = ({ items, className }: SummaryRowProps) => (
  <div className={cn("bg-surface-2 rounded-20 flex items-center", className)}>
    {items.map((item, index) => (
      <Fragment key={item.label}>
        {index > 0 && (
          <span className="bg-primary-light-active h-14.75 w-px" aria-hidden />
        )}
        {item.onClick ? (
          <button
            type="button"
            onClick={item.onClick}
            className={SUMMARY_ITEM_CLASS_NAME}
          >
            <p className="body2 text-sub1-dark-hover">{item.label}</p>
            <p className="h3 text-primary">{item.value}</p>
          </button>
        ) : (
          <div className={SUMMARY_ITEM_CLASS_NAME}>
            <p className="body2 text-sub1-dark-hover">{item.label}</p>
            <p className="h3 text-primary">{item.value}</p>
          </div>
        )}
      </Fragment>
    ))}
  </div>
);
