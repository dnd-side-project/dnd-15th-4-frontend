import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputLayoutProps {
  id?: string;
  label?: string;
  hasValue?: boolean;
  maxLength?: number;
  currentLength?: number;
  disabled?: boolean;
  containerClassName?: string;
  children: React.ReactNode;
}

export const InputLayout = ({
  id,
  label,
  hasValue,
  maxLength,
  currentLength = 0,
  disabled = false,
  containerClassName,
  children,
}: InputLayoutProps) => {
  return (
    <div className={cn("flex w-full flex-col gap-3", containerClassName)}>
      {label && (
        <label htmlFor={id} className="h4 text-primary font-bold">
          {label}
        </label>
      )}
      <div
        className={cn(
          "rounded-16 flex min-h-13.75 w-full items-center justify-between px-4 py-4.5",
          disabled
            ? "bg-surface-1 border border-transparent"
            : "border-border-1 border"
        )}
      >
        <div className="flex-1 pr-2">{children}</div>

        {maxLength !== undefined ? (
          <span className="body3 text-disable shrink-0 pl-2">{`(${currentLength}/${maxLength})`}</span>
        ) : (
          hasValue && (
            <span className="body3 text-disable shrink-0 pl-2">편집</span>
          )
        )}
      </div>
    </div>
  );
};
