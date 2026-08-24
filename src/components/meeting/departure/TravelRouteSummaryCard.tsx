import { TravelRouteSegmentList } from "./TravelRouteSegmentList";
import type { TravelRouteOption } from "@/types/meeting";

export interface TravelRouteSummaryCardProps {
  route: TravelRouteOption;
}

export const TravelRouteSummaryCard = ({
  route,
}: TravelRouteSummaryCardProps) => {
  return (
    <div className={`rounded-16 flex w-full flex-col gap-3 px-4`}>
      <p className="h3 text-primary border-border-1 border-b py-3">
        {route.durationMinutes}분
      </p>
      <TravelRouteSegmentList segments={route.segments} />
    </div>
  );
};
