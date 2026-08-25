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
  ...props
}: InputProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const normalizedValue = value == null ? "" : String(value);
  const length = normalizedValue.length;
  const hasValue = length > 0;

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
        {...props}
      />
    </InputLayout>
  );
};
