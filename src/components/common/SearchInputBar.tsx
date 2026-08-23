"use client";

import { IcArrowBack, IcSearch } from "@/components/icons";
import type { IconProps } from "@/components/icons/icon.types";
import { cn } from "@/lib/utils";

export interface SearchInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onBack?: () => void;
  onTrailingIconClick?: () => void;
  placeholder?: string;
  className?: string;
  TrailingIcon?: (props: IconProps) => React.ReactNode;
}

export const SearchInputBar = ({
  value,
  onChange,
  onBack,
  onTrailingIconClick,
  placeholder,
  className,
  TrailingIcon = IcSearch,
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
    {onTrailingIconClick ? (
      <button type="button" onClick={onTrailingIconClick} aria-label="검색">
        <TrailingIcon size={24} className="text-border-4" />
      </button>
    ) : (
      <TrailingIcon size={24} className="text-border-4" />
    )}
  </div>
);
