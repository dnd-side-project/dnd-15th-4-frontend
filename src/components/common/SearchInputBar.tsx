"use client";

import { IcArrowBack, IcClose, IcSearch } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SearchInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onBack?: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchInputBar = ({
  value,
  onChange,
  onBack,
  placeholder,
  className,
}: SearchInputBarProps) => (
  <div
    className={cn(
      "border-border-2 rounded-16 flex h-13.75 items-center gap-1.75 border pl-4 pr-4.75",
      className
    )}
  >
    {onBack && (
      <button type="button" onClick={onBack} aria-label="뒤로 가기">
        <IcArrowBack size={24} className="text-disable" />
      </button>
    )}
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="body3 text-primary placeholder:text-disable flex-1 bg-transparent outline-none"
    />
    {value ? (
      <button
        type="button"
        onClick={() => onChange("")}
        aria-label="검색어 지우기"
      >
        <IcClose size={24} className="text-border-4" />
      </button>
    ) : (
      <IcSearch size={24} className="text-border-4" />
    )}
  </div>
);
