import { InputLayout } from "@/components/common/InputLayout";

export interface CapacityFieldProps {
  label?: string;
  value: number | null;
  placeholder: string;
  onClick: () => void;
  containerClassName?: string;
}

export const CapacityField = ({
  label,
  value,
  placeholder,
  onClick,
  containerClassName,
}: CapacityFieldProps) => {
  const hasValue = value !== null;

  return (
    <InputLayout
      label={label}
      hasValue={hasValue}
      containerClassName={containerClassName}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center text-left outline-none"
      >
        <span className={`body3 ${hasValue ? "text-primary" : "text-disable"}`}>
          {hasValue ? `${value}명` : placeholder}
        </span>
      </button>
    </InputLayout>
  );
};
