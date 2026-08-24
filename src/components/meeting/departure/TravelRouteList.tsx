"use client";

import { useState } from "react";

import { Toggle } from "@/components/common/Toggle";
import type { TravelRouteOption } from "@/types/meeting";

import { TravelRouteSegmentList } from "./TravelRouteSegmentList";

export interface TravelRouteListProps {
  routes: TravelRouteOption[];
  selectedRouteId: string | null;
  onSelect: (route: TravelRouteOption) => void;
}

export const TravelRouteList = ({
  routes,
  selectedRouteId,
  onSelect,
}: TravelRouteListProps) => {
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);

  return (
    <div className="bg-bg-gray rounded-16 flex w-full flex-col gap-1 p-4">
      <p className="body8 text-disable pb-2">결과 {routes.length}개</p>

      <ul className="flex w-full flex-col gap-3">
        {routes.map((route) => {
          const isSelected = route.routeId === selectedRouteId;
          const isExpanded = route.routeId === expandedRouteId;

          return (
            <li key={route.routeId} className="rounded-16 bg-white p-4">
              <div className="flex w-full flex-col gap-3 py-3">
                <div className="flex w-full items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedRouteId((prev) =>
                        prev === route.routeId ? null : route.routeId
                      )
                    }
                    className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                  >
                    <span className="body1 text-primary font-medium">
                      {route.durationMinutes}분
                    </span>
                    {route.isFastest && (
                      <span className="bg-primary-light text-primary-normal-hover rounded-4 px-1.5 py-0.5 text-xs font-medium">
                        최단시간
                      </span>
                    )}
                  </button>

                  <Toggle
                    variant="radio"
                    checked={isSelected}
                    onCheckedChange={(checked) => checked && onSelect(route)}
                    aria-label={`${route.durationMinutes}분 경로 선택`}
                  />
                </div>

                {isExpanded && (
                  <div className="border-border-1 border-t py-3">
                    <TravelRouteSegmentList segments={route.segments} />
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
