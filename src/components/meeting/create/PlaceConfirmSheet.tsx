"use client";

import { useState } from "react";

import { Drawer } from "@base-ui/react/drawer";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

import { AlertModal } from "@/components/common/AlertModal";
import { BottomSheet } from "@/components/common/BottomSheet";
import { Button } from "@/components/common/Button";
import { IcStar } from "@/components/icons";
import { MeetingMap } from "@/components/meeting/progress/MeetingMap";
import {
  MAX_FAVORITE_PLACE_COUNT,
  usePlaceSearchFavorites,
} from "@/hooks/place/usePlaceSearchFavorites";
import type { PlaceDto } from "@/types/place";

export interface PlaceConfirmSheetProps {
  place: PlaceDto;
  onClose: () => void;
  onConfirm: (place: PlaceDto) => void;
}

export const PlaceConfirmSheet = ({
  place,
  onClose,
  onConfirm,
}: PlaceConfirmSheetProps) => {
  const { favorites, isFavorite, addFavorite, removeFavorite } =
    usePlaceSearchFavorites();
  const [isLimitAlertOpen, setIsLimitAlertOpen] = useState(false);

  const favorited = isFavorite(place.placeId);
  const position = { lat: place.latitude, lng: place.longitude };

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(place.placeId);
      return;
    }
    if (favorites.length >= MAX_FAVORITE_PLACE_COUNT) {
      setIsLimitAlertOpen(true);
      return;
    }
    addFavorite(place);
  };

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="relative flex-1">
        <MeetingMap center={position} zoom={16} className="size-full">
          <AdvancedMarker position={position} />
        </MeetingMap>
      </div>

      <BottomSheet
        open
        onOpenChange={(open) => !open && onClose()}
        shouldShowBackdrop={false}
      >
        <Drawer.Title className="sr-only">
          {place.placeName} 장소 확인
        </Drawer.Title>
        <div className="flex w-full flex-col gap-5 px-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="h4 text-primary wrap-break-word break-keep">
                <span className="text-primary-normal">{place.placeName}</span>로
                모일까요?
              </p>
              <p className="body6 text-disable">
                {place.roadAddressName || place.addressName}
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleFavorite}
              aria-label={favorited ? "즐겨찾기 해제" : "즐겨찾기 추가"}
              className="shrink-0 p-1"
            >
              {favorited ? (
                <IcStar size={32} className="text-primary-normal" />
              ) : (
                <IcStar size={32} className="text-disable" />
              )}
            </button>
          </div>

          <Button
            type="button"
            onClick={() => onConfirm(place)}
            className="bg-sub2-normal hover:bg-sub2-normal-hover"
          >
            확인
          </Button>
        </div>
      </BottomSheet>

      {isLimitAlertOpen && (
        <AlertModal
          message={`검색어 저장은 ${MAX_FAVORITE_PLACE_COUNT}개까지 가능합니다`}
          onConfirm={() => setIsLimitAlertOpen(false)}
        />
      )}
    </div>
  );
};
