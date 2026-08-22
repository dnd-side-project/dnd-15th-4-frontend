import Image from "next/image";

import pinImage from "@/assets/images/pin.png";
import { Toggle } from "@/components/common/Toggle";
import { IcDelete } from "@/components/icons";
import type { PlaceDto } from "@/types/place";

interface PlaceItemProps {
  place: PlaceDto;
  keyword: string;
  onSelect: (place: PlaceDto) => void;
  selected?: boolean;
  onDelete?: () => void;
}

const splitByKeyword = (text: string, keyword: string) => {
  if (!keyword) return [{ text, matched: false }];

  const index = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (index === -1) return [{ text, matched: false }];

  return [
    { text: text.slice(0, index), matched: false },
    { text: text.slice(index, index + keyword.length), matched: true },
    { text: text.slice(index + keyword.length), matched: false },
  ].filter((part) => part.text.length > 0);
};

export const PlaceItem = ({
  place,
  keyword,
  onSelect,
  selected,
  onDelete,
}: PlaceItemProps) => (
  <div className="flex w-full items-center gap-3 py-3">
    <button
      type="button"
      onClick={() => onSelect(place)}
      className="flex min-w-0 flex-1 items-center gap-3 text-left"
    >
      <span className="bg-surface-1 rounded-8 flex size-11 shrink-0 items-center justify-center">
        <Image src={pinImage} alt="" width={24} height={24} />
      </span>
      <span className="flex flex-col gap-1">
        <span className="body2 text-primary">
          {splitByKeyword(place.placeName, keyword).map((part, index) => (
            <span
              key={index}
              className={part.matched ? "text-primary-normal-hover" : undefined}
            >
              {part.text}
            </span>
          ))}
        </span>
        <span className="body6 text-disable">
          {place.roadAddressName || place.addressName}
        </span>
      </span>
    </button>

    {selected !== undefined && (
      <Toggle
        variant="radio"
        checked={selected}
        onCheckedChange={(checked) => checked && onSelect(place)}
      />
    )}

    {onDelete && (
      <button
        type="button"
        onClick={onDelete}
        aria-label="검색어 삭제"
        className="text-red-2 shrink-0"
      >
        <IcDelete size={24} />
      </button>
    )}
  </div>
);
