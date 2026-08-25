"use client";

import { useState } from "react";

import { useAddFavoriteSearchMutation } from "@/hooks/mypage/useFavoriteSearches";
import type { PlaceDto } from "@/types/place";

export const useAddFavoriteSearch = (
  favoriteSearchCount: number,
  maxFavoriteSearchCount: number
) => {
  const [selectedPlace, setSelectedPlace] = useState<PlaceDto | null>(null);
  const [isAddConfirmOpen, setIsAddConfirmOpen] = useState(false);
  const [isAddErrorOpen, setIsAddErrorOpen] = useState(false);
  const addFavoriteSearchMutation = useAddFavoriteSearchMutation();

  const handleAddClick = () => {
    if (!selectedPlace) return;

    if (favoriteSearchCount >= maxFavoriteSearchCount) {
      setIsAddConfirmOpen(true);
      return;
    }

    const requestedPlaceId = selectedPlace.placeId;

    addFavoriteSearchMutation.mutate(
      {
        keyword: selectedPlace.placeName,
        roadAddressName:
          selectedPlace.roadAddressName || selectedPlace.addressName,
      },
      {
        onSuccess: () => {
          setSelectedPlace((current) =>
            current?.placeId === requestedPlaceId ? null : current
          );
        },
        onError: () => setIsAddErrorOpen(true),
      }
    );
  };

  return {
    selectedPlace,
    setSelectedPlace,
    isAddConfirmOpen,
    setIsAddConfirmOpen,
    isAddErrorOpen,
    setIsAddErrorOpen,
    handleAddClick,
  };
};
