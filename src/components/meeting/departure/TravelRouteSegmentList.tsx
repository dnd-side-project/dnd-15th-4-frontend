import { IcArrivalDot, IcHome, IcPin } from "@/components/icons";
import { IcBus, IcSubway, IcWalk } from "@/components/icons";
import type { IconProps } from "@/components/icons/icon.types";
import { cn } from "@/lib/utils";
import type { MeetingRouteStep } from "@/types/meeting";

const STEP_ICON_MAP: Record<
  MeetingRouteStep["type"],
  React.ComponentType<IconProps>
> = {
  SUBWAY: IcSubway,
  BUS: IcBus,
  WALK: IcWalk,
  ETC: IcArrivalDot,
};

const MOVEMENT_SUFFIX_PATTERN = /\s*이동$/;

const stripMovementSuffix = (text: string): string =>
  text.replace(MOVEMENT_SUFFIX_PATTERN, "");

const getEuroParticle = (text: string): "로" | "으로" => {
  const trimmed = text.trim();
  const lastChar = trimmed.at(-1);
  if (!lastChar) return "으로";

  if (/\d/.test(lastChar)) {
    return ["1", "2", "4", "5", "7", "8", "9"].includes(lastChar)
      ? "로"
      : "으로";
  }

  const code = lastChar.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return "으로";

  const jongseongIndex = (code - 0xac00) % 28;
  return jongseongIndex === 0 || jongseongIndex === 8 ? "로" : "으로";
};

const getBoardingStopLabel = (step: MeetingRouteStep): string =>
  step.type === "BUS"
    ? `${step.station?.start} 정거장`
    : `${step.station?.start}${step.line ? ` ${step.line}` : ""}`;

interface RouteRow {
  key: string;
  label: string;
  icon: React.ComponentType<IconProps>;
}

const buildStepRows = (
  steps: MeetingRouteStep[],
  index: number,
  destinationName: string
): RouteRow[] => {
  const step = steps[index];
  const icon = STEP_ICON_MAP[step.type];

  if (step.station) {
    const isBus = step.type === "BUS";
    const boardLabel = isBus
      ? `${step.station.start} 정거장${step.line ? ` ${step.line}번` : ""} 버스승차`
      : step.line
        ? `${step.station.start} ${step.line} 승차`
        : `${step.station.start} 승차`;

    return [
      { key: `${index}-board`, label: boardLabel, icon },
      { key: `${index}-alight`, label: `${step.station.end} 하차`, icon },
    ];
  }

  if (step.stations?.length) {
    return [{ key: `${index}`, label: step.stations.join(" - "), icon }];
  }

  const nextStep = steps[index + 1];

  if (nextStep?.station) {
    const target = getBoardingStopLabel(nextStep);
    return [
      {
        key: `${index}`,
        label: `${target}${getEuroParticle(target)} 이동`,
        icon,
      },
    ];
  }

  if (!nextStep) {
    return [
      {
        key: `${index}`,
        label: `${destinationName}${getEuroParticle(destinationName)} 이동`,
        icon,
      },
    ];
  }

  return [
    { key: `${index}`, label: step.description ?? destinationName, icon },
  ];
};

export const buildRouteRows = (
  steps: MeetingRouteStep[],
  originName: string,
  destinationName: string
): RouteRow[] => [
  { key: "origin", label: originName, icon: IcHome },
  ...steps.flatMap((_, index) => buildStepRows(steps, index, destinationName)),
  { key: "destination", label: destinationName, icon: IcPin },
];

export const getTotalWalkDistance = (steps: MeetingRouteStep[]): number =>
  steps
    .filter((step) => step.type === "WALK")
    .reduce((sum, step) => sum + step.distance, 0);

const getStepWaypoint = (step: MeetingRouteStep): string => {
  if (step.station) return step.station.end;
  if (step.description) return stripMovementSuffix(step.description);
  if (step.stations?.length) return step.stations[step.stations.length - 1];
  return "";
};

export const getRouteSummary = (
  steps: MeetingRouteStep[],
  originName: string,
  destinationName: string
): string => {
  const waypoints = steps.map(getStepWaypoint).filter(Boolean);
  return [originName, ...waypoints, destinationName].join(" - ");
};

export interface TravelRouteSegmentListProps {
  steps: MeetingRouteStep[];
  originName: string;
  destinationName: string;
}

export const TravelRouteSegmentList = ({
  steps,
  originName,
  destinationName,
}: TravelRouteSegmentListProps) => {
  const rows = buildRouteRows(steps, originName, destinationName);
  const lastIndex = rows.length - 1;

  return (
    <div className="flex flex-col">
      {rows.map((row, index) => {
        const isLast = index === lastIndex;

        return (
          <div key={row.key} className="flex gap-2">
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
                <row.icon size={20} />
              </span>
            </div>

            <div className={cn("flex-1 pt-0.5", !isLast && "pb-6")}>
              <p className="body6 text-secondary-1">{row.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
