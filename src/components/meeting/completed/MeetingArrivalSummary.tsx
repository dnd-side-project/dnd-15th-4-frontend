import { SummaryRow } from "@/components/common/SummaryRow";
import { getTimeLabel } from "@/utils/date";
import type { MeetingRankingItem } from "@/types/meeting";

interface MeetingArrivalSummaryProps {
  rankings: MeetingRankingItem[];
  myDepartedAt: string | null;
}

export const MeetingArrivalSummary = ({
  rankings,
  myDepartedAt,
}: MeetingArrivalSummaryProps) => {
  const arrivedCount = rankings.filter((ranking) => ranking.arrived).length;
  const lateCount = rankings.filter((ranking) => ranking.late).length;

  return (
    <SummaryRow
      items={[
        {
          label: "출발시작",
          value: myDepartedAt ? getTimeLabel(myDepartedAt) : "-",
        },
        { label: "도착자", value: `${arrivedCount}명` },
        { label: "지각자", value: `${lateCount}명` },
      ]}
    />
  );
};
