import Image from "next/image";

import { IcMedalBronze, IcMedalGold, IcMedalSilver } from "@/components/icons";
import { cn } from "@/lib/utils";
import { getTimeLabel } from "@/utils/date";
import type { MeetingRankingItem } from "@/types/meeting";

export const MEDAL_ICONS = [IcMedalGold, IcMedalSilver, IcMedalBronze];

const getArrivalBadge = (ranking: MeetingRankingItem) => {
  if (ranking.late) {
    return { label: "지각했어요", className: "bg-red/12 text-red border-red" };
  }
  if (ranking.earlyArrivalMinutes) {
    return {
      label: `${ranking.earlyArrivalMinutes}분 일찍 도착`,
      className: "bg-primary-light text-primary-dark border-primary-normal",
    };
  }
  return {
    label: "정각에 도착했어요",
    className: "bg-primary-light text-primary-dark border-primary-normal",
  };
};

interface ArrivalRankingRowProps {
  ranking: MeetingRankingItem;
  MedalIcon?: (typeof MEDAL_ICONS)[number];
}

export const ArrivalRankingRow = ({
  ranking,
  MedalIcon,
}: ArrivalRankingRowProps) => {
  const badge = getArrivalBadge(ranking);

  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative shrink-0">
          <div
            className={cn(
              "rounded-8 bg-white border-border-4 relative size-8.5 overflow-hidden border",
              MedalIcon && "mt-1.75"
            )}
          >
            <Image
              src={ranking.profileImageUrl}
              alt={ranking.nickname}
              fill
              className="object-cover"
            />
          </div>
          {MedalIcon && (
            <MedalIcon size={16} className="absolute top-0 -right-1.5" />
          )}
        </div>
        <div>
          <p className="body1 text-primary">{ranking.nickname}</p>
          {!ranking.late && (
            <p className="body6 text-secondary-2">
              {ranking.arrivedAt
                ? `${getTimeLabel(ranking.arrivedAt)} 도착`
                : "지각"}
            </p>
          )}
        </div>
      </div>
      <span
        className={cn(
          "rounded-8 body7 border px-2.5 py-1 px-4 h-7.5 flex items-center justify-center",
          badge.className
        )}
      >
        {badge.label}
      </span>
    </li>
  );
};
