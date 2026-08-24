"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { SearchInputBar } from "@/components/common/SearchInputBar";
import { IcSearch } from "@/components/icons";
import { PlaceResultList } from "@/components/meeting/create/PlaceResultList";
import type { PlaceResultStatus } from "@/components/meeting/create/PlaceResultList";
import { MeetingMap } from "@/components/meeting/progress/MeetingMap";
import { usePlaceSearchFavorites } from "@/hooks/place/usePlaceSearchFavorites";
import { usePlaceSearchQuery } from "@/hooks/place/usePlaceSearch";
import type { DepartureOrigin } from "@/types/meeting";
import type { PlaceDto } from "@/types/place";

export interface DepartureOriginSearchOverlayProps {
  onClose: () => void;
  onSelect: (origin: DepartureOrigin) => void;
}

const DEFAULT_MAP_CENTER = { lat: 37.5283, lng: 126.932 };

const toDepartureOrigin = (place: PlaceDto): DepartureOrigin => ({
  placeName: place.placeName,
  addressName: place.roadAddressName || place.addressName,
  latitude: place.latitude,
  longitude: place.longitude,
});

const getMapCenter = (places: PlaceDto[]) => {
  if (places.length === 0) return DEFAULT_MAP_CENTER;

  const total = places.reduce(
    (sum, place) => ({
      lat: sum.lat + place.latitude,
      lng: sum.lng + place.longitude,
    }),
    { lat: 0, lng: 0 }
  );

  return { lat: total.lat / places.length, lng: total.lng / places.length };
};

export const DepartureOriginSearchOverlay = ({
  onClose,
  onSelect,
}: DepartureOriginSearchOverlayProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceDto | null>(null);
  const { favorites } = usePlaceSearchFavorites();
  const { data, isLoading, isError } = usePlaceSearchQuery(keyword);

  const results = data ?? [];

  const status: PlaceResultStatus =
    keyword.trim().length === 0
      ? "idle"
      : isLoading
        ? "loading"
        : isError
          ? "error"
          : "success";

  const handleConfirm = () => {
    if (!selectedPlace) return;
    onSelect(toDepartureOrigin(selectedPlace));
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setSelectedPlace(null);
  };

  const handleFavoriteClick = (place: PlaceDto) => {
    setKeyword(place.placeName);
    setSelectedPlace(place);
  };

  const mapPlaces = selectedPlace ? [selectedPlace] : results;
  const mapCenter = selectedPlace
    ? { lat: selectedPlace.latitude, lng: selectedPlace.longitude }
    : getMapCenter(results);

  return (
    <div
      data-testid="departure-origin-search-overlay"
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col bg-white"
    >
      <Header title="출발지 선택" onBack={onClose} />

      <div className="flex flex-col gap-4 px-4 pt-4">
        <SearchInputBar
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="출발지를 검색하세요"
        />

        {favorites.length > 0 && (
          <div className="flex h-9.5 items-center gap-5">
            <div className="flex flex-1 items-center gap-2 overflow-x-auto">
              {favorites.map((place) => (
                <button
                  key={place.placeId}
                  type="button"
                  onClick={() => handleFavoriteClick(place)}
                  className="bg-primary-light border-primary-normal text-primary-dark speech-bubble flex shrink-0 items-center gap-px rounded-full border px-4 py-2.25 tracking-[-0.3px]"
                >
                  <IcSearch size={20} />
                  {place.placeName}
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

      {status !== "idle" && (
        <div className="mt-4 h-44 w-full shrink-0 px-4">
          <div className="rounded-16 size-full overflow-hidden">
            <MeetingMap
              center={mapCenter}
              zoom={14}
              focusLocation={mapCenter}
              className="size-full"
            >
              {mapPlaces.map((place) => (
                <AdvancedMarker
                  key={place.placeId}
                  position={{ lat: place.latitude, lng: place.longitude }}
                />
              ))}
            </MeetingMap>
          </div>
        </div>
      )}

      {status === "success" && (
        <p className="body8 text-disable px-4 pt-4 pb-1">
          결과 {results.length}개
        </p>
      )}

      <div className="flex-1 overflow-y-auto px-5 pb-24">
        <PlaceResultList
          status={status}
          results={results}
          keyword={keyword}
          onSelect={setSelectedPlace}
          selectedPlace={selectedPlace}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-md bg-white px-4 pt-4 pb-8">
        <Button
          type="button"
          size="cta"
          disabled={!selectedPlace}
          onClick={handleConfirm}
          className={
            selectedPlace
              ? "bg-sub2-normal hover:bg-sub2-normal-hover"
              : "bg-disable"
          }
        >
          선택완료
        </Button>
      </div>
    </div>
  );
};
