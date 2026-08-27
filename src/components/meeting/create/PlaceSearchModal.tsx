"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { searchPlaces } from "@/apis/place/place";
import { IcSearch } from "@/components/icons";
import { SearchInputBar } from "@/components/common/SearchInputBar";
import { cn } from "@/lib/utils";
import { useFavoriteSearchesQuery } from "@/hooks/mypage/useFavoriteSearches";
import { usePlaceSearchQuery } from "@/hooks/place/usePlaceSearch";
import type { FavoriteSearchDto, PlaceDto, SelectedPlace } from "@/types/place";

import { PlaceConfirmSheet } from "./PlaceConfirmSheet";
import { PlaceResultList, type PlaceResultStatus } from "./PlaceResultList";

export interface PlaceSearchModalProps {
  onClose: () => void;
  onSelect: (place: SelectedPlace) => void;
}

const toSelectedPlace = (place: PlaceDto): SelectedPlace => ({
  placeName: place.placeName,
  addressName: place.roadAddressName || place.addressName,
  latitude: place.latitude,
  longitude: place.longitude,
});

export const PlaceSearchModal = ({
  onClose,
  onSelect,
}: PlaceSearchModalProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [pendingPlace, setPendingPlace] = useState<PlaceDto | null>(null);
  const favoriteRequestIdRef = useRef(0);
  const { data: favoriteSearchData } = useFavoriteSearchesQuery();
  const favoriteSearches = favoriteSearchData ?? [];
  const { data, isLoading, isError, isDebouncing } =
    usePlaceSearchQuery(keyword);

  const status: PlaceResultStatus =
    keyword.trim().length === 0
      ? "idle"
      : isLoading || isDebouncing
        ? "loading"
        : isError
          ? "error"
          : "success";

  const handleKeywordChange = (value: string) => {
    favoriteRequestIdRef.current += 1;
    setKeyword(value);
    setPendingPlace(null);
  };

  const handleSelect = (place: PlaceDto) => {
    setPendingPlace(place);
    setKeyword(place.placeName);
  };

  const handleFavoriteClick = async (favoriteSearch: FavoriteSearchDto) => {
    const requestId = ++favoriteRequestIdRef.current;

    let matchedPlace: PlaceDto | undefined;
    try {
      [matchedPlace] = await searchPlaces(favoriteSearch.roadAddressName);
    } catch {
      // 검색 실패 시 아래에서 수동 검색으로 대체
    }

    if (favoriteRequestIdRef.current !== requestId) return;

    if (matchedPlace) {
      setPendingPlace({
        ...matchedPlace,
        placeName: favoriteSearch.keyword,
        roadAddressName: favoriteSearch.roadAddressName,
      });
    }
    setKeyword(favoriteSearch.keyword);
  };

  const handleConfirmPlace = (place: PlaceDto) => {
    onSelect(toSelectedPlace(place));
  };

  return (
    <div
      data-testid="place-search-modal"
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col bg-white"
    >
      <div
        className={cn(
          "flex flex-col gap-4 px-4 pt-5",
          pendingPlace && "absolute inset-x-0 top-0 z-20"
        )}
      >
        <SearchInputBar
          value={keyword}
          onChange={handleKeywordChange}
          onBack={pendingPlace ? () => setPendingPlace(null) : onClose}
          placeholder="장소 또는 지역을 검색하세요"
        />

        {!pendingPlace && favoriteSearches.length > 0 && (
          <div className="flex h-9.5 items-center gap-5">
            <div className="relative flex flex-1 items-center overflow-hidden">
              <div className="flex w-full scrollbar-none items-center gap-2 overflow-x-auto pr-8">
                {favoriteSearches.map((favoriteSearch) => (
                  <button
                    key={favoriteSearch.id}
                    type="button"
                    onClick={() => handleFavoriteClick(favoriteSearch)}
                    className="bg-primary-light border-primary-normal text-primary-dark speech-bubble flex shrink-0 items-center gap-px rounded-full border px-4 py-2.25 tracking-[-0.3px]"
                  >
                    <IcSearch size={20} />
                    {favoriteSearch.keyword}
                  </button>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-white to-transparent" />
            </div>
            <div className="bg-border-2 h-3.5 w-px shrink-0" />
            <button
              type="button"
              onClick={() => router.push("/mypage/favorites")}
              className="body3 text-disable shrink-0"
            >
              편집
            </button>
          </div>
        )}
      </div>

      {pendingPlace ? (
        <PlaceConfirmSheet
          place={pendingPlace}
          onClose={() => setPendingPlace(null)}
          onConfirm={handleConfirmPlace}
        />
      ) : (
        <div
          className={`flex-1 scrollbar-none overflow-y-auto px-5 ${
            favoriteSearches.length === 0 ? "mt-6" : ""
          }`}
        >
          <PlaceResultList
            status={status}
            results={data ?? []}
            keyword={keyword}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
};
