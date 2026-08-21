import * as React from "react";
import { cn } from "@/lib/utils";
import { InputLayout, type InputLayoutProps } from "./InputLayout";

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    Omit<InputLayoutProps, "children" | "hasValue" | "currentLength"> {}

export const Input = ({
  label,
  maxLength,
  containerClassName,
  className,
  value,
  ...props
}: InputProps) => {
  const length = typeof value === "string" ? value.length : 0;
  const hasValue = Boolean(value);

  return (
    <InputLayout
      label={label}
      hasValue={hasValue}
      maxLength={maxLength}
      currentLength={length}
      containerClassName={containerClassName}
    >
      <input
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
