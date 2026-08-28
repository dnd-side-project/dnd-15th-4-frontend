import { ArrivalRankingRow, MEDAL_ICONS } from "./ArrivalRankingRow";
import { MeetingArrivalSummary } from "./MeetingArrivalSummary";
import type { MeetingRankingItem } from "@/types/meeting";

interface MeetingArrivalPanelProps {
  rankings: MeetingRankingItem[];
  myDepartedAt: string | null;
}

export const MeetingArrivalPanel = ({
  rankings,
  myDepartedAt,
}: MeetingArrivalPanelProps) => {
  const onTimeRankings = rankings.filter((ranking) => !ranking.late);
  const lateRankings = rankings.filter((ranking) => ranking.late);
  const medalIconByUserId = new Map(
    rankings
      .slice(0, 3)
      .map((ranking, index) => [ranking.userId, MEDAL_ICONS[index]])
  );

  return (
    <div className="mb-12 flex w-full flex-col px-4">
      <MeetingArrivalSummary rankings={rankings} myDepartedAt={myDepartedAt} />

      <div className="mt-6 flex flex-col gap-6">
        {onTimeRankings.length > 0 && (
          <ul className="flex flex-col gap-8 px-5">
            {onTimeRankings.map((ranking) => (
              <ArrivalRankingRow
                key={ranking.userId}
                ranking={ranking}
                MedalIcon={medalIconByUserId.get(ranking.userId)}
              />
            ))}
          </ul>
        )}
        {lateRankings.length > 0 && (
          <ul className="bg-bg-gray rounded-16 flex flex-col gap-8 p-5">
            {lateRankings.map((ranking) => (
              <ArrivalRankingRow
                key={ranking.userId}
                ranking={ranking}
                MedalIcon={medalIconByUserId.get(ranking.userId)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
