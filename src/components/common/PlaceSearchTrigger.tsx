import type { SelectedPlace } from "@/types/place";
import { InputLayout } from "@/components/common/InputLayout";

export interface PlaceSearchTriggerProps {
  label?: string;
  place: SelectedPlace | null;
  placeholder?: string;
  disabled?: boolean;
  onClick: () => void;
  containerClassName?: string;
}

export const PlaceSearchTrigger = ({
  label,
  place,
  placeholder = "장소를 선택하세요",
  disabled,
  onClick,
  containerClassName,
}: PlaceSearchTriggerProps) => {
  return (
    <InputLayout
      label={label}
      hasValue={Boolean(place)}
      disabled={disabled}
      containerClassName={containerClassName}
      onClick={onClick}
    >
      {place ? (
        <span className="body3 text-primary break-all">{place.placeName}</span>
      ) : (
        <span className="body3 text-disable">{placeholder}</span>
      )}
    </InputLayout>
  );
};
