import { IcPin } from "@/components/icons";
import type { PlaceDto } from "@/types/place";

export type PlaceResultStatus = "idle" | "loading" | "error" | "success";

export interface PlaceResultListProps {
  status: PlaceResultStatus;
  results: PlaceDto[];
  keyword: string;
  onSelect: (place: PlaceDto) => void;
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

const PlaceResultMessage = ({ text }: { text: string }) => (
  <p className="body3 text-disable py-10 text-center">{text}</p>
);

export const PlaceResultList = ({
  status,
  results,
  keyword,
  onSelect,
}: PlaceResultListProps) => {
  if (status === "idle") return null;
  if (status === "loading") return <PlaceResultMessage text="검색 중이에요" />;
  if (status === "error")
    return <PlaceResultMessage text="검색 중 문제가 발생했어요" />;
  if (results.length === 0)
    return <PlaceResultMessage text="검색 결과가 없어요" />;

  return (
    <ul className="flex w-full flex-col">
      {results.map((place) => (
        <li
          key={place.placeId}
          className="border-border-1 border-b last:border-b-0"
        >
          <button
            type="button"
            onClick={() => onSelect(place)}
            className="flex w-full items-center gap-3 py-3 text-left"
          >
            <span className="bg-surface-1 rounded-8 flex size-11 shrink-0 items-center justify-center">
              <IcPin size={24} className="text-disable" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="body2 text-primary">
                {splitByKeyword(place.placeName, keyword).map((part, index) => (
                  <span
                    key={index}
                    className={
                      part.matched ? "text-primary-normal-hover" : undefined
                    }
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
        </li>
      ))}
    </ul>
  );
};
