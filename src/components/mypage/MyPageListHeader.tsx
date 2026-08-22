"use client";

import { Header } from "@/components/common/Header";
import { IcCalendarMonth } from "@/components/icons";
import {
  SortToggleButton,
  type SortOrder,
} from "@/components/mypage/SortToggleButton";

interface MyPageListHeaderProps {
  title: string;
  onBack: () => void;
  resultCount: number;
  sortOrder: SortOrder;
  onToggleSort: () => void;
  onCalendarClick: () => void;
  onResetFilter: () => void;
}

export const MyPageListHeader = ({
  title,
  onBack,
  resultCount,
  sortOrder,
  onToggleSort,
  onCalendarClick,
  onResetFilter,
}: MyPageListHeaderProps) => (
  <>
    <Header
      title={title}
      onBack={onBack}
      rightActionLabel="전체보기"
      onRightActionClick={onResetFilter}
      className="bg-bg-normal sticky top-0 z-10"
    />
    <div className="mt-5.5 mb-4 flex justify-between px-4">
      <div className="flex items-center gap-2">
        <p className="body8 text-disable">결과 {resultCount}개</p>
        <SortToggleButton sortOrder={sortOrder} onToggle={onToggleSort} />
      </div>
      <button type="button" onClick={onCalendarClick}>
        <IcCalendarMonth size={24} />
      </button>
    </div>
  </>
);
