import { Fragment } from "react";

import { getTimeLabel } from "@/utils/date";
import type { MeetingRankingItem } from "@/types/meeting";

interface MeetingArrivalSummaryProps {
  rankings: MeetingRankingItem[];
  myDepartedAt: string | null;
}

interface SummaryItemProps {
  label: string;
  value: string;
}

const SummaryItem = ({ label, value }: SummaryItemProps) => (
  <div className="flex h-24 flex-1 flex-col items-center justify-center gap-3">
    <p className="body2 text-sub1-dark-hover">{label}</p>
    <p className="h3 text-primary">{value}</p>
  </div>
);

export const MeetingArrivalSummary = ({
  rankings,
  myDepartedAt,
}: MeetingArrivalSummaryProps) => {
  const arrivedCount = rankings.filter((ranking) => ranking.arrived).length;
  const lateCount = rankings.filter((ranking) => ranking.late).length;

  const summaryItems: SummaryItemProps[] = [
    {
      label: "출발시작",
      value: myDepartedAt ? getTimeLabel(myDepartedAt) : "-",
    },
    { label: "도착자", value: `${arrivedCount}명` },
    { label: "지각자", value: `${lateCount}명` },
  ];

  return (
    <div className="bg-surface-2 rounded-20 flex items-center">
      {summaryItems.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && (
            <span
              className="bg-primary-light-active h-14.75 w-px"
              aria-hidden
            />
          )}
          <SummaryItem {...item} />
        </Fragment>
      ))}
    </div>
  );
};
