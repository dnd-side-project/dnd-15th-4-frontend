import { getElapsedMinutes } from "@/utils/date";
import type { PuzzleGroupParticipant } from "@/types/meeting";

// 0: 도착, 1: 이동중(경과시간 있음), 2: 출발 전 순으로 우선순위를 매긴다
const getProgressTier = (participant: PuzzleGroupParticipant) => {
  if (participant.arrived) return 0;
  if (participant.departed) return 1;
  return 2;
};

const compareByProgress = (
  a: PuzzleGroupParticipant,
  b: PuzzleGroupParticipant
) => {
  const tierDiff = getProgressTier(a) - getProgressTier(b);
  if (tierDiff !== 0) return tierDiff;

  if (a.departed && !a.arrived && b.departed && !b.arrived) {
    const elapsedA = a.departedAt ? getElapsedMinutes(a.departedAt) : 0;
    const elapsedB = b.departedAt ? getElapsedMinutes(b.departedAt) : 0;
    if (elapsedA !== elapsedB) return elapsedB - elapsedA;
  }

  return (a.nickname ?? "").localeCompare(b.nickname ?? "", "ko");
};

// 나 최상단 > 도착 > 이동중(경과시간 긴 순) > 출발 전, 비교 불가능하면 가나다순
export const sortParticipantsByProgress = (
  participants: PuzzleGroupParticipant[],
  currentUserId: number | undefined
): PuzzleGroupParticipant[] =>
  [...participants].sort((a, b) => {
    if (a.userId === currentUserId) return -1;
    if (b.userId === currentUserId) return 1;
    return compareByProgress(a, b);
  });
