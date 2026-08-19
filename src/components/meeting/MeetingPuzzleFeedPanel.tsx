"use client";

import Image from "next/image";
import { useState } from "react";

import { ImageDetailModal } from "./ImageDetailModal";
import { IcInfo } from "@/components/icons";
import type { CompletedPuzzleFeedItem } from "@/types/meeting";

interface MeetingPuzzleFeedPanelProps {
  puzzleFeed: CompletedPuzzleFeedItem[];
}

export const MeetingPuzzleFeedPanel = ({
  puzzleFeed,
}: MeetingPuzzleFeedPanelProps) => {
  const [selectedFeedItem, setSelectedFeedItem] =
    useState<CompletedPuzzleFeedItem | null>(null);

  return (
    <div className="mb-12 flex w-full flex-col">
      <div className="bg-sub1-light-hover rounded-8 mx-4 flex items-center gap-1.75 px-2.25 py-2.75">
        <IcInfo size={20} className="text-sub1-dark-hover shrink-0" />
        <p className="body7 text-sub1-dark-hover">
          맞춰진 퍼즐 이외 다른 친구들이 등록한 사진 퍼즐이에요
        </p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-x-1 gap-y-2">
        {puzzleFeed.map((feedItem, index) => (
          <button
            key={`${feedItem.uploaderId}-${index}`}
            type="button"
            onClick={() => setSelectedFeedItem(feedItem)}
            className="bg-sub2-light relative aspect-square overflow-hidden"
          >
            <Image
              src={feedItem.imageUrl}
              alt={`${feedItem.uploaderNickname}님이 등록한 사진`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {selectedFeedItem && (
        <ImageDetailModal
          open
          onOpenChange={(open) => !open && setSelectedFeedItem(null)}
          imageUrl={selectedFeedItem.imageUrl}
          imageAlt={`${selectedFeedItem.uploaderNickname}님이 등록한 사진`}
          uploaderNickname={selectedFeedItem.uploaderNickname}
          uploaderProfileImageUrl={selectedFeedItem.uploaderProfileImageUrl}
        />
      )}
    </div>
  );
};
