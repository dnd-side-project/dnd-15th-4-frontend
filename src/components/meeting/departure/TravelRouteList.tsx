"use client";

import { useState } from "react";

import { Toggle } from "@/components/common/Toggle";
import type { MeetingRoute } from "@/types/meeting";

import {
  TravelRouteSegmentList,
  getTotalWalkDistance,
} from "./TravelRouteSegmentList";

export interface TravelRouteListProps {
  routes: MeetingRoute[];
  selectedRoute: MeetingRoute | null;
  originName: string;
  destinationName: string;
  onSelect: (route: MeetingRoute) => void;
}

export const TravelRouteList = ({
  routes,
  selectedRoute,
  originName,
  destinationName,
  onSelect,
}: TravelRouteListProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const fastestTime =
    routes.length > 0
      ? Math.min(...routes.map((route) => route.totalTime))
      : null;
  const leastWalkDistance =
    routes.length > 0
      ? Math.min(...routes.map((route) => getTotalWalkDistance(route.steps)))
      : null;

  return (
    <div className="bg-bg-gray rounded-16 flex w-full flex-col gap-1 p-4">
      <p className="body8 text-disable pb-2">결과 {routes.length}개</p>

      <ul className="flex w-full flex-col gap-3">
        {routes.map((route, index) => {
          const isSelected = route === selectedRoute;
          const isExpanded = index === expandedIndex;
          const isFastest = route.totalTime === fastestTime;
          const isLeastWalk =
            getTotalWalkDistance(route.steps) === leastWalkDistance;
          const durationMinutes = Math.round(route.totalTime / 60);

          return (
            <li key={index} className="rounded-16 bg-white p-4">
              <div className="flex w-full flex-col gap-3 py-3">
                <div className="flex w-full items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedIndex((prev) =>
                        prev === index ? null : index
                      )
                    }
                    className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                  >
                    <span className="body1 text-primary font-medium">
                      {durationMinutes}분
                    </span>
                    {isFastest && (
                      <span className="bg-primary-light rounded-4 border-sub1-normal text-primary-normal-hover border px-1 py-0.5 text-[10px] font-medium">
                        최단시간
                      </span>
                    )}
                    {isLeastWalk && (
                      <span className="bg-primary-light rounded-4 border-sub1-normal text-primary-normal-hover border px-1 py-0.5 text-[10px] font-medium">
                        최소도보
                      </span>
                    )}
                  </button>

                  <Toggle
                    variant="radio"
                    checked={isSelected}
                    onCheckedChange={(checked) => checked && onSelect(route)}
                    aria-label={`${durationMinutes}분 경로 선택`}
                  />
                </div>

                {isExpanded && (
                  <div className="border-border-1 border-t py-3">
                    <TravelRouteSegmentList
                      steps={route.steps}
                      originName={originName}
                      destinationName={destinationName}
                    />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
