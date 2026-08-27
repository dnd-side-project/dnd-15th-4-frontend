"use client";

import Image from "next/image";

import { ImageActionButtons } from "@/components/common/ImageActionButtons";
import { Modal } from "@/components/common/Modal";
import { AvatarStack } from "@/components/home/AvatarStack";
import {
  ArrivalRankingRow,
  MEDAL_ICONS,
} from "@/components/meeting/completed/ArrivalRankingRow";
import { formatMeetingDateTime } from "@/utils/date";
import type { CollectedPuzzle } from "@/types/user";

interface PuzzleMeetingDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  puzzle: CollectedPuzzle;
  initialIndex?: number;
}

export const PuzzleMeetingDetailModal = ({
  open,
  onOpenChange,
  puzzle,
  initialIndex = 0,
}: PuzzleMeetingDetailModalProps) => {
  const currentImageUrl =
    puzzle.puzzleImageUrls[initialIndex] ?? puzzle.puzzleImageUrls[0];
  const { dateFormatted, timeFormatted } = formatMeetingDateTime(
    puzzle.meetingAt
  );
  const medalIconByUserId = new Map(
    puzzle.rankings
      .slice(0, 3)
      .map((ranking, index) => [ranking.userId, MEDAL_ICONS[index]])
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={puzzle.title}
      className="max-h-150.5 max-w-90.25 overflow-hidden px-5 pt-8.75 pb-8"
    >
      <div className="rounded-20 bg-surface-1 relative aspect-square w-full max-w-66.25 shrink-0 overflow-hidden">
        {currentImageUrl && (
          <Image
            src={currentImageUrl}
            alt={puzzle.title}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="mt-9.5 mb-4 flex w-full shrink-0 items-center justify-between">
        <AvatarStack
          participants={puzzle.rankings.map((ranking) => ({
            id: ranking.userId,
            name: ranking.nickname,
            profileImageUrl: ranking.profileImageUrl,
          }))}
        />
        {currentImageUrl && (
          <ImageActionButtons imageUrl={currentImageUrl} className="ml-auto" />
        )}
      </div>
      <div className="flex w-full shrink-0 flex-col gap-1">
        <p className="body1 text-black">{puzzle.title}</p>
        <p className="body6 text-disable flex items-center gap-0.5">
          <span>{dateFormatted}</span>
          <span className="bg-divider-3 h-2.25 w-px shrink-0" aria-hidden />
          <span>{timeFormatted}</span>
          <span className="bg-divider-3 h-2.25 w-px shrink-0" aria-hidden />
          <span>{puzzle.destination}</span>
        </p>
      </div>
      <div className="bg-divider mt-6 h-px w-full shrink-0" />
      <ul className="flex min-h-0 w-full flex-1 scrollbar-none flex-col gap-6 overflow-y-auto pt-6">
        {puzzle.rankings.map((ranking) => (
          <ArrivalRankingRow
            key={ranking.userId}
            ranking={ranking}
            MedalIcon={medalIconByUserId.get(ranking.userId)}
          />
        ))}
      </ul>
    </Modal>
  );
};
