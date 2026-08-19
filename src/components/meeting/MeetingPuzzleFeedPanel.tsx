import type { CompletedPuzzleFeedItem } from "@/types/meeting";

interface MeetingPuzzleFeedPanelProps {
  puzzleFeed: CompletedPuzzleFeedItem[];
}

export const MeetingPuzzleFeedPanel = ({
  puzzleFeed,
}: MeetingPuzzleFeedPanelProps) => {
  return <div>{puzzleFeed.length}개의 퍼즐이 완료되었습니다.</div>;
};
