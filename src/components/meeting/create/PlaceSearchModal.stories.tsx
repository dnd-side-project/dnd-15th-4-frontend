import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { PlaceDto, SelectedPlace } from "@/types/place";
import { PlaceResultList, type PlaceResultStatus } from "./PlaceResultList";
import { IcArrowBack, IcClose, IcSearch } from "@/components/icons";

const MOCK_PLACES: PlaceDto[] = [
  {
    placeId: "1",
    placeName: "강남역 2호선",
    roadAddressName: "서울 강남구 강남대로 396",
    addressName: "서울 강남구 역삼동 825",
    latitude: 37.497952,
    longitude: 127.027619,
  },
  {
    placeId: "2",
    placeName: "강남 카카오프렌즈샵",
    roadAddressName: "서울 강남구 강남대로 429",
    addressName: "서울 강남구 서초동 1305-7",
    latitude: 37.50081,
    longitude: 127.025737,
  },
  {
    placeId: "3",
    placeName: "홍대입구역 2호선",
    roadAddressName: "서울 마포구 양화로 160",
    addressName: "서울 마포구 동교동 165-5",
    latitude: 37.557527,
    longitude: 126.924466,
  },
];

interface DummyModalProps {
  initialHistory?: string[];
  initialKeyword?: string;
  onClose?: () => void;
  onSelect?: (place: SelectedPlace) => void;
}

const DummyPlaceSearchModal = ({
  initialHistory = [],
  initialKeyword = "",
  onClose = () => {},
  onSelect = () => {},
}: DummyModalProps) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [history, setHistory] = useState<string[]>(initialHistory);

  const filteredResults = keyword.trim()
    ? MOCK_PLACES.filter(
        (place) =>
          place.placeName.includes(keyword) ||
          place.addressName.includes(keyword) ||
          (place.roadAddressName && place.roadAddressName.includes(keyword))
      )
    : [];

  const status: PlaceResultStatus =
    keyword.trim().length === 0 ? "idle" : "success";

  const handleSelect = (place: PlaceDto) => {
    if (!history.includes(place.placeName)) {
      setHistory((prev) => [place.placeName, ...prev]);
    }
    onSelect({
      placeName: place.placeName,
      addressName: place.roadAddressName || place.addressName,
      latitude: place.latitude,
      longitude: place.longitude,
    });
  };

  return (
    <div
      data-testid="place-search-modal"
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col bg-white"
    >
      <div className="flex flex-col gap-4 px-4 pt-5">
        <div className="border-border-2 rounded-16 flex h-13.75 items-center gap-2 border px-2.5">
          <button type="button" onClick={onClose} aria-label="뒤로 가기">
            <IcArrowBack size={24} className="text-disable" />
          </button>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="장소 또는 지역을 검색하세요"
            className="body3 text-primary placeholder:text-disable flex-1 bg-transparent outline-none"
          />
          {keyword ? (
            <button
              type="button"
              onClick={() => setKeyword("")}
              aria-label="검색어 지우기"
            >
              <IcClose size={24} className="text-primary" />
            </button>
          ) : (
            <IcSearch size={24} className="text-primary" />
          )}
        </div>

        {history.length > 0 && (
          <div className="flex h-9.5 items-center gap-5">
            <div className="flex flex-1 items-center gap-2 overflow-x-auto">
              {history.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setKeyword(item)}
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
              onClick={() => setHistory([])}
              className="body3 text-disable shrink-0"
            >
              편집
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <PlaceResultList
          status={status}
          results={filteredResults}
          keyword={keyword}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

const meta = {
  title: "Meeting/Create/PlaceSearchModal",
  component: DummyPlaceSearchModal,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative mx-auto h-176 w-full max-w-md border border-gray-200">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof DummyPlaceSearchModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialHistory: [],
    initialKeyword: "",
  },
};

export const WithHistory: Story = {
  args: {
    initialHistory: ["강남역", "홍대입구", "성수동 맛집"],
    initialKeyword: "",
  },
};

export const WithSearchResults: Story = {
  args: {
    initialHistory: [],
    initialKeyword: "강남",
  },
};

export const WithHistoryAndResults: Story = {
  args: {
    initialHistory: ["강남역", "판교", "성수"],
    initialKeyword: "강남",
  },
};
