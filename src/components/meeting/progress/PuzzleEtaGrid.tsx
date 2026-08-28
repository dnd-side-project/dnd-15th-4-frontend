import { PuzzleEtaCard } from "./PuzzleEtaCard";
import type { PuzzleEtaCardPosition } from "./PuzzleEtaCard";
import { PuzzleEtaEmptyCard } from "./PuzzleEtaEmptyCard";
import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import type { ArrivalConfirmationStep } from "@/hooks/meeting/progress/useArrivalConfirmation";
import { useAuthStore } from "@/stores/useAuthStore";
import { getRemainingMinutes } from "@/utils/date";
import type { PuzzleGroupParticipant } from "@/types/meeting";

interface PuzzleCardStyle {
  position: PuzzleEtaCardPosition;
  backgroundClassName: string;
  textClassName?: string;
}

const GRID_STYLES: PuzzleCardStyle[] = [
  {
    position: "top-left",
    backgroundClassName: "bg-primary-light-active",
  },
  {
    position: "top-right",
    backgroundClassName: "bg-sub1-light-active",
  },
  {
    position: "bottom-left",
    backgroundClassName: "bg-sub2-normal",
    textClassName: "text-white",
  },
  {
    position: "bottom-right",
    backgroundClassName: "bg-point-normal",
  },
];

export interface PuzzleEtaGridProps {
  members: PuzzleGroupParticipant[];
  puzzleImageUrl: string;
  canConfirmArrival?: boolean;
  confirmationStep?: ArrivalConfirmationStep;
  remainingSeconds?: number;
  isConfirmed?: boolean;
  onStartConfirmation?: () => void;
  onCancelConfirmation?: () => void;
}

export const PuzzleEtaGrid = ({
  members,
  puzzleImageUrl,
  canConfirmArrival = false,
  confirmationStep = "pending",
  remainingSeconds = 0,
  isConfirmed = false,
  onStartConfirmation,
  onCancelConfirmation,
}: PuzzleEtaGridProps) => {
  const currentUserId = useAuthStore((state) => state.user?.id);

  const realMembers = members.filter((member) => member.userId !== null);
  const isGroupComplete =
    realMembers.length > 0 && realMembers.every((member) => member.arrived);

  return (
    <div className="grid aspect-square w-full grid-cols-2 grid-rows-2">
      {GRID_STYLES.map((style, index) => {
        const pieceIndex = index + 1;
        const member = members.findLast(
          (candidate) => candidate.pieceIndex === pieceIndex
        );

        if (!member || member.userId === null) {
          return (
            <PuzzleEtaEmptyCard
              key={style.position}
              position={style.position}
              backgroundClassName={style.backgroundClassName}
              puzzleImageUrl={puzzleImageUrl}
              isRevealed={isGroupComplete}
            />
          );
        }

        const isMe = member.userId === currentUserId;

        return (
          <PuzzleEtaCard
            key={member.userId}
            position={style.position}
            backgroundClassName={style.backgroundClassName}
            textClassName={style.textClassName}
            image={member.profileImageUrl?.trim() || CHARACTER_FALLBACK_IMAGE}
            puzzleImageUrl={puzzleImageUrl}
            nickname={member.nickname ?? ""}
            hasDeparted={member.departed}
            remainingMinutes={
              member.estimatedArrivalTime
                ? getRemainingMinutes(member.estimatedArrivalTime)
                : 0
            }
            isArrived={member.arrived}
            showConfirmButton={isMe && canConfirmArrival && !isConfirmed}
            confirmationStep={isMe ? confirmationStep : "pending"}
            remainingSeconds={remainingSeconds}
            isConfirmed={isMe && isConfirmed}
            onStartConfirmation={onStartConfirmation}
            onCancelConfirmation={onCancelConfirmation}
          />
        );
      })}
    </div>
  );
};
