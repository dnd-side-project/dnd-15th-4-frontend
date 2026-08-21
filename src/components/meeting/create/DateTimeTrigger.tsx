import { formatDateTimeTrigger } from "@/utils/date";
import { InputLayout } from "@/components/common/InputLayout";

export interface DateTimeFieldProps {
  label?: string;
  value: Date | null;
  placeholder: string;
  onClick: () => void;
  containerClassName?: string;
}

export const DateTimeTrigger = ({
  label,
  value,
  placeholder,
  onClick,
  containerClassName,
}: DateTimeFieldProps) => {
  return (
    <InputLayout
      label={label}
      hasValue={Boolean(value)}
      containerClassName={containerClassName}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center text-left outline-none"
      >
        <span className={`body3 ${value ? "text-primary" : "text-disable"}`}>
          {value ? formatDateTimeTrigger(value) : placeholder}
        </span>
      </button>
    </InputLayout>
  );
};
