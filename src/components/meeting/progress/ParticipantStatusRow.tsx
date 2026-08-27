import { Fragment } from "react";

import { ParticipantStatusAvatar } from "./ParticipantStatusAvatar";
import { CHARACTER_FALLBACK_IMAGE } from "@/constants/character-images";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { getElapsedMinutes } from "@/utils/date";
import { sortParticipantsByProgress } from "@/utils/participant-order";
import type { PuzzleGroupParticipant } from "@/types/meeting";

export interface ParticipantStatusRowProps {
  participants: PuzzleGroupParticipant[];
  onParticipantFocus?: (participant: PuzzleGroupParticipant) => void;
  className?: string;
}

// 위치는 1분마다 전송되는데, 폴링 주기(1분)와 타이밍이 어긋나면 계속 접속 중이어도
// 최신 위치가 1분보다 살짝 더 지난 것처럼 보일 수 있어 여유를 두고 2분부터 표시한다
const MINUTES_AGO_DISPLAY_THRESHOLD = 2;

const getMinutesAgoLabel = (participant: PuzzleGroupParticipant) => {
  if (participant.arrived || !participant.locationUpdatedAt) return undefined;

  const elapsedMinutes = getElapsedMinutes(participant.locationUpdatedAt);
  if (elapsedMinutes < MINUTES_AGO_DISPLAY_THRESHOLD) return undefined;

  return `${elapsedMinutes}분전`;
};

export const ParticipantStatusRow = ({
  participants,
  onParticipantFocus,
  className,
}: ParticipantStatusRowProps) => {
  const currentUserId = useAuthStore((state) => state.user?.id);
  const sortedParticipants = sortParticipantsByProgress(
    participants,
    currentUserId
  );

  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 overflow-x-auto pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {sortedParticipants.map((participant, index) => (
        <Fragment key={participant.userId}>
          {index === 1 && (
            <span className="bg-border-1 h-9 w-px shrink-0" aria-hidden />
          )}
          <ParticipantStatusAvatar
            image={
              participant.profileImageUrl?.trim() || CHARACTER_FALLBACK_IMAGE
            }
            nickname={participant.nickname ?? ""}
            minutesAgoLabel={getMinutesAgoLabel(participant)}
            hasDeparted={participant.departed}
            onClick={() => onParticipantFocus?.(participant)}
          />
        </Fragment>
      ))}
    </div>
  );
};
