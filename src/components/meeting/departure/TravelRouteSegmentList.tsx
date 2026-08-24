import { IcArrivalDot, IcHome, IcPin } from "@/components/icons";
import { IcSubway } from "@/components/icons/IcSubway";
import { cn } from "@/lib/utils";
import type { TravelSegment, TravelSegmentType } from "@/types/meeting";

// todo: Walk와 Bus 아이콘이 없어서 Dot으로 임시 대체
const SEGMENT_ICON_MAP: Record<TravelSegmentType, React.ComponentType> = {
  SUBWAY: IcSubway,
  BUS: IcArrivalDot,
  WALK: IcArrivalDot,
};

export interface TravelRouteSegmentListProps {
  segments: TravelSegment[];
}

export const TravelRouteSegmentList = ({
  segments,
}: TravelRouteSegmentListProps) => {
  const lastIndex = segments.length - 1;

  return (
    <div className="flex flex-col">
      {segments.map((segment, index) => {
        const isFirst = index === 0;
        const isLast = index === lastIndex;
        const Icon = isFirst
          ? IcHome
          : isLast
            ? IcPin
            : SEGMENT_ICON_MAP[segment.type];

        return (
          <div key={`${segment.type}-${index}`} className="flex gap-2">
            <div className="relative flex w-5 shrink-0 flex-col items-center">
              {!isLast && (
                <div
                  className="absolute top-2.5 bottom-0 left-1/2 w-0.5 -translate-x-1/2"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, var(--Border-1, #E9E9EA) 4px, transparent 4px)`,
                    backgroundSize: `100% 8px`,
                    backgroundRepeat: `repeat-y`,
                  }}
                />
              )}

              <span
                className={cn(
                  "relative z-10 flex size-5 items-center justify-center bg-white",
                  isLast ? "text-primary-normal" : "text-primary"
                )}
              >
                <Icon size={20} />
              </span>
            </div>

            <div className={cn("flex-1 pt-0.5", !isLast && "pb-6")}>
              <p className="body6 text-secondary-1">{segment.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
