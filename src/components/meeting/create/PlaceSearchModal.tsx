"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IcSearch } from "@/components/icons";
import { SearchInputBar } from "@/components/common/SearchInputBar";
import { usePlaceSearchQuery } from "@/hooks/place/usePlaceSearch";
import { usePlaceSearchFavorites } from "@/hooks/place/usePlaceSearchFavorites";
import type { PlaceDto, SelectedPlace } from "@/types/place";

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
  const { favorites, addFavorite } = usePlaceSearchFavorites();
  const { data, isLoading, isError } = usePlaceSearchQuery(keyword);

  const status: PlaceResultStatus =
    keyword.trim().length === 0
      ? "idle"
      : isLoading
        ? "loading"
        : isError
          ? "error"
          : "success";

  const handleSelect = (place: PlaceDto) => {
    addFavorite(place.placeName);
    onSelect(toSelectedPlace(place));
  };

  const handleFavoriteClick = (item: string) => {
    setKeyword(item);
  };

  return (
    <div
      data-testid="place-search-modal"
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col bg-white"
    >
      <div className="flex flex-col gap-4 px-4 pt-5">
        <SearchInputBar
          value={keyword}
          onChange={setKeyword}
          onBack={onClose}
          placeholder="장소 또는 지역을 검색하세요"
        />

        {favorites.length > 0 && (
          <div className="flex h-9.5 items-center gap-5">
            <div className="flex flex-1 items-center gap-2 overflow-x-auto">
              {favorites.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleFavoriteClick(item)}
                  className="bg-primary-light border-primary-normal text-primary-dark speech-bubble flex shrink-0 items-center gap-px rounded-full border px-4 py-2.25 tracking-[-0.3px]"
                >
                  <IcSearch size={20} />
                  {item}
                </button>
              ))}
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

      <div
        className={`flex-1 overflow-y-auto px-5 ${
          favorites.length === 0 ? "mt-6" : ""
        }`}
      >
        <PlaceResultList
          status={status}
          results={data ?? []}
          keyword={keyword}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};
