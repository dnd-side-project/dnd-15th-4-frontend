import { InputLayout } from "@/components/common/InputLayout";

export interface RouteSelectTriggerProps {
  label?: string;
  value: string | null;
  placeholder: string;
  disabled?: boolean;
  onClick: () => void;
  containerClassName?: string;
}

export const RouteSelectTrigger = ({
  label,
  value,
  placeholder,
  disabled,
  onClick,
  containerClassName,
}: RouteSelectTriggerProps) => {
  return (
    <InputLayout
      label={label}
      hasValue={Boolean(value)}
      disabled={disabled}
      containerClassName={containerClassName}
      onClick={onClick}
    >
      <span
        className={`body3 break-all ${value ? "text-primary" : "text-disable"}`}
      >
        {value ?? placeholder}
      </span>
    </InputLayout>
  );
};
