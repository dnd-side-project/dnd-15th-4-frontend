import * as React from "react";
import { cn } from "@/lib/utils";
import { InputLayout, type InputLayoutProps } from "./InputLayout";

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    Omit<
      InputLayoutProps,
      "children" | "hasValue" | "currentLength" | "onClick"
    > {}

export const Input = ({
  label,
  maxLength,
  containerClassName,
  className,
  value,
  id,
  onChange,
  ...props
}: InputProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const normalizedValue = value == null ? "" : String(value);
  const length = normalizedValue.length;
  const hasValue = length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    onChange?.(e);
  };

  return (
    <InputLayout
      id={inputId}
      label={label}
      hasValue={hasValue}
      maxLength={maxLength}
      currentLength={length}
      containerClassName={containerClassName}
    >
      <input
        id={inputId}
        className={cn(
          "body3 text-primary placeholder:text-disable w-full bg-transparent outline-none",
          className
        )}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </InputLayout>
  );
};
