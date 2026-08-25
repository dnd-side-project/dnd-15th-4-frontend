"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InfoBanner } from "@/components/common/InfoBanner";

import { AlertModal } from "@/components/common/AlertModal";
import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { SearchInputBar } from "@/components/common/SearchInputBar";
import { PlaceItem } from "@/components/meeting/create/PlaceItem";
import {
  PlaceResultList,
  type PlaceResultStatus,
} from "@/components/meeting/create/PlaceResultList";
import { usePlaceSearchQuery } from "@/hooks/place/usePlaceSearch";
import { useAddFavoriteSearch } from "@/hooks/mypage/useAddFavoriteSearch";
import {
  useDeleteFavoriteSearchMutation,
  useFavoriteSearchesQuery,
} from "@/hooks/mypage/useFavoriteSearches";
import { cn } from "@/lib/utils";
import type { FavoriteSearchDto, PlaceDto } from "@/types/place";

const toPlaceDto = (favoriteSearch: FavoriteSearchDto): PlaceDto => ({
  placeId: String(favoriteSearch.id),
  placeName: favoriteSearch.keyword,
  addressName: favoriteSearch.roadAddressName,
  roadAddressName: favoriteSearch.roadAddressName,
  latitude: 0,
  longitude: 0,
});

const RESULT_PAGE_SIZE = 8;
const MAX_FAVORITE_SEARCH_COUNT = 5;

const FavoritesPage = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [visibleCount, setVisibleCount] = useState(RESULT_PAGE_SIZE);
  const { data: favoriteSearchData } = useFavoriteSearchesQuery();
  const favoriteSearches = favoriteSearchData ?? [];
  const {
    selectedPlace,
    setSelectedPlace,
    isAddConfirmOpen,
    setIsAddConfirmOpen,
    isAddErrorOpen,
    setIsAddErrorOpen,
    handleAddClick,
  } = useAddFavoriteSearch(favoriteSearches.length, MAX_FAVORITE_SEARCH_COUNT);
  const deleteFavoriteSearchMutation = useDeleteFavoriteSearchMutation();
  const { data, isLoading, isError, isDebouncing } =
    usePlaceSearchQuery(keyword);
  const results = data ?? [];
  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  const status: PlaceResultStatus =
    keyword.trim().length === 0
      ? "idle"
      : isLoading || isDebouncing
        ? "loading"
        : isError
          ? "error"
          : "success";

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setVisibleCount(RESULT_PAGE_SIZE);
    setSelectedPlace(null);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + RESULT_PAGE_SIZE);
  };

  const handleDelete = (favoriteSearchId: number) => {
    deleteFavoriteSearchMutation.mutate(favoriteSearchId);
  };

  return (
    <div className="h-screen scrollbar-none overflow-y-auto">
      <div className="bg-bg-normal sticky top-0 z-10">
        <Header title="내 검색어" onBack={() => router.back()} />
        <div className="mt-1.5 px-4">
          <SearchInputBar
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="저장하려는 검색어를 입력하세요"
          />
        </div>
        {status === "success" && (
          <p className="body8 text-disable px-4 pt-6">
            결과 {results.length}개
          </p>
        )}
      </div>
      <div
        className={cn(
          "flex flex-col px-4",
          (status === "idle" || visibleResults.length === 0) &&
            "min-h-53 items-center justify-center"
        )}
      >
        <PlaceResultList
          status={status}
          results={visibleResults}
          keyword={keyword}
          onSelect={setSelectedPlace}
          selectedPlace={selectedPlace}
        />
        {hasMore && (
          <button
            type="button"
            onClick={handleShowMore}
            className="body3 text-disable w-full pt-6 text-center"
          >
            더보기
          </button>
        )}
      </div>
      <div className="bg-divider-2 mt-6 mb-6.25 h-2 w-full" />
      <div className="px-4">
        <div className="mb-3 flex items-center gap-1">
          <p className="h4 text-primary">저장된 검색어</p>
          <p className="puzzle-process text-disable">
            ({favoriteSearches.length}/{MAX_FAVORITE_SEARCH_COUNT})
          </p>
        </div>
        <InfoBanner
          text="장소 선택시 검색없이 바로 선택할 수 있어요. "
          className="mb-3"
        />
        <ul
          className={cn(
            "flex w-full flex-col",
            status === "idle" ? "mb-3" : "mb-20"
          )}
        >
          {favoriteSearches.map((favoriteSearch) => (
            <li key={favoriteSearch.id}>
              <PlaceItem
                place={toPlaceDto(favoriteSearch)}
                keyword=""
                onSelect={() => {}}
                onDelete={() => handleDelete(favoriteSearch.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      {selectedPlace && (
        <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-md bg-white px-3 py-4">
          <Button
            type="button"
            size="cta"
            onClick={handleAddClick}
            className="bg-sub2-normal hover:bg-transport rounded-16 h-14"
          >
            추가하기
          </Button>
        </div>
      )}

      {isAddConfirmOpen && (
        <AlertModal
          message={`검색어 저장은 ${MAX_FAVORITE_SEARCH_COUNT}개까지 가능합니다`}
          onConfirm={() => setIsAddConfirmOpen(false)}
        />
      )}

      {isAddErrorOpen && (
        <AlertModal
          message="검색어 저장에 실패했어요. 다시 시도해주세요."
          onConfirm={() => setIsAddErrorOpen(false)}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
