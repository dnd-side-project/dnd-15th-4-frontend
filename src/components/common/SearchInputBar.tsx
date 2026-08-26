"use client";

import { IcArrowBack, IcClose, IcSearch } from "@/components/icons";
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
  TrailingIcon,
}: SearchInputBarProps) => {
  const isClearable = !TrailingIcon && value.length > 0;
  const ResolvedIcon = TrailingIcon ?? (isClearable ? IcClose : IcSearch);
  const handleTrailingIconClick = TrailingIcon
    ? onTrailingIconClick
    : isClearable
      ? () => onChange("")
      : onTrailingIconClick;

  return (
    <div
      className={cn(
        "border-border-2 rounded-16 flex h-13.75 items-center gap-1.75 border bg-white pl-4 pr-4.75",
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

      {handleTrailingIconClick ? (
        <button
          type="button"
          onClick={handleTrailingIconClick}
          aria-label={isClearable ? "검색어 지우기" : "검색"}
        >
          <ResolvedIcon size={24} className="text-border-4" />
        </button>
      ) : (
        <ResolvedIcon size={24} className="text-border-4" />
      )}
    </div>
  );
};
