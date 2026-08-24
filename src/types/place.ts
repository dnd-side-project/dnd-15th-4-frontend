export interface PlaceDto {
  placeId: string;
  placeName: string;
  addressName: string;
  roadAddressName: string | null;
  latitude: number;
  longitude: number;
}

export interface FavoriteSearchDto {
  id: number;
  keyword: string;
}

export interface SelectedPlace {
  placeName: string;
  addressName: string;
  latitude: number;
  longitude: number;
}
