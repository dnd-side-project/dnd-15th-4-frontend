"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InfoBanner } from "@/components/common/InfoBanner";

import { AlertModal } from "@/components/common/AlertModal";
import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { SearchInputBar } from "@/components/common/SearchInputBar";
import { IcAdd } from "@/components/icons";
import { PlaceItem } from "@/components/meeting/create/PlaceItem";
import {
  PlaceResultList,
  type PlaceResultStatus,
} from "@/components/meeting/create/PlaceResultList";
import {
  MAX_FAVORITE_PLACE_COUNT,
  usePlaceSearchFavorites,
} from "@/hooks/place/usePlaceSearchFavorites";
import { usePlaceSearchQuery } from "@/hooks/place/usePlaceSearch";
import { cn } from "@/lib/utils";
import type { PlaceDto } from "@/types/place";

const RESULT_PAGE_SIZE = 8;

const FavoritesPage = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [visibleCount, setVisibleCount] = useState(RESULT_PAGE_SIZE);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDto | null>(null);
  const [isAddConfirmOpen, setIsAddConfirmOpen] = useState(false);
  const {
    favorites: savedPlaces,
    addFavorite,
    removeFavorite,
  } = usePlaceSearchFavorites();
  const { data, isLoading, isError } = usePlaceSearchQuery(submittedKeyword);
  const results = data ?? [];
  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  const status: PlaceResultStatus =
    submittedKeyword.trim().length === 0
      ? "idle"
      : isLoading
        ? "loading"
        : isError
          ? "error"
          : "success";

  const handleSearch = () => {
    setSubmittedKeyword(keyword.trim());
    setVisibleCount(RESULT_PAGE_SIZE);
  };

  const handleRestorePreviousSearch = () => {
    setKeyword(submittedKeyword);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + RESULT_PAGE_SIZE);
  };

  const handleAddClick = () => {
    if (!selectedPlace) return;

    if (savedPlaces.length >= MAX_FAVORITE_PLACE_COUNT) {
      setIsAddConfirmOpen(true);
      return;
    }

    addFavorite(selectedPlace);
    setSelectedPlace(null);
  };

  const handleDelete = (place: PlaceDto) => {
    removeFavorite(place.placeId);
  };

  return (
    <div className="h-screen scrollbar-none overflow-y-auto pb-12">
      <div className="bg-bg-normal sticky top-0 z-10">
        <Header title="내 검색어" onBack={() => router.back()} />
        <div className="mb-6 px-4">
          <SearchInputBar
            value={keyword}
            onChange={setKeyword}
            onBack={submittedKeyword ? handleRestorePreviousSearch : undefined}
            onTrailingIconClick={handleSearch}
            placeholder="저장하려는 검색어를 입력하세요"
            TrailingIcon={IcAdd}
          />
        </div>
        {status !== "idle" && (
          <p className="body8 text-disable px-4 pb-3">
            결과 {results.length}개
          </p>
        )}
      </div>
      <div className={cn("px-4", status === "idle" && "mb-53")}>
        <PlaceResultList
          status={status}
          results={visibleResults}
          keyword={submittedKeyword}
          onSelect={setSelectedPlace}
          selectedPlace={selectedPlace}
        />
        {hasMore && (
          <button
            type="button"
            onClick={handleShowMore}
            className="body3 text-disable w-full py-6 text-center"
          >
            더보기
          </button>
        )}
      </div>
      <div className="bg-divider-2 mb-6.25 h-2 w-full" />
      <div className="px-4">
        <div className="mb-3 flex items-center gap-1">
          <p className="h4 text-primary">저장된 검색어</p>
          <p className="puzzle-process text-disable">
            ({savedPlaces.length}/{MAX_FAVORITE_PLACE_COUNT})
          </p>
        </div>
        <InfoBanner
          text="장소 선택시 검색없이 바로 선택 할 수 있어요. "
          className="mb-3"
        />
        <ul
          className={cn("flex w-full flex-col", status === "idle" && "mb-12")}
        >
          {savedPlaces.map((place) => (
            <li
              key={place.placeId}
              className="border-border-1 border-b last:border-b-0"
            >
              <PlaceItem
                place={place}
                keyword=""
                onSelect={() => {}}
                onDelete={() => handleDelete(place)}
              />
            </li>
          ))}
        </ul>
        {status !== "idle" && (
          <Button
            type="button"
            size="cta"
            disabled={!selectedPlace}
            onClick={handleAddClick}
            className="bg-sub2-normal hover:bg-transport rounded-16 mt-12 h-14"
          >
            추가하기
          </Button>
        )}
      </div>

      {isAddConfirmOpen && (
        <AlertModal
          message={`검색어 저장은 ${MAX_FAVORITE_PLACE_COUNT}개까지 가능합니다`}
          onConfirm={() => setIsAddConfirmOpen(false)}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
