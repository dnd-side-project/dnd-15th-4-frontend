import { TravelRouteSegmentList } from "./TravelRouteSegmentList";
import type { MeetingRoute } from "@/types/meeting";

export interface TravelRouteSummaryCardProps {
  route: MeetingRoute;
  originName: string;
  destinationName: string;
  isFastest?: boolean;
  isLeastWalk?: boolean;
}

export const TravelRouteSummaryCard = ({
  route,
  originName,
  destinationName,
}: TravelRouteSummaryCardProps) => {
  const durationMinutes = Math.round(route.totalTime / 60);

  return (
    <div className="rounded-16 flex w-full flex-col gap-3 px-4">
      <p className="h3 text-primary border-border-1 flex items-center gap-1.5 border-b py-3">
        {durationMinutes}분
      </p>
      <TravelRouteSegmentList
        steps={route.steps}
        originName={originName}
        destinationName={destinationName}
      />
    </div>
  );
};
