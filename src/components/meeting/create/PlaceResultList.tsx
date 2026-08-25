import { PlaceItem } from "./PlaceItem";
import type { PlaceDto } from "@/types/place";

export type PlaceResultStatus = "idle" | "loading" | "error" | "success";

export interface PlaceResultListProps {
  status: PlaceResultStatus;
  results: PlaceDto[];
  keyword: string;
  onSelect: (place: PlaceDto) => void;
  selectedPlace?: PlaceDto | null;
}

const PlaceResultMessage = ({ text }: { text: string }) => (
  <p className="body3 text-disable py-10 text-center">{text}</p>
);

export const PlaceResultList = ({
  status,
  results,
  keyword,
  onSelect,
  selectedPlace,
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
        <li key={place.placeId}>
          <PlaceItem
            place={place}
            keyword={keyword}
            onSelect={onSelect}
            selected={
              selectedPlace !== undefined
                ? selectedPlace?.placeId === place.placeId
                : undefined
            }
          />
        </li>
      ))}
    </ul>
  );
};
