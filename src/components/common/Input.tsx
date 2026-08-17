import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  maxLength?: number;
  containerClassName?: string;
}

export const Input = ({
  label,
  maxLength,
  className,
  containerClassName,
  value,
  ...props
}: InputProps) => {
  const length = typeof value === "string" ? value.length : 0;

  return (
    <div className={cn("flex w-full flex-col gap-3", containerClassName)}>
      {label && <label className="h4 text-primary font-bold">{label}</label>}
      <div className="border-border-1 rounded-16 flex w-full items-center border px-4 py-4.5">
        <input
          className={cn(
            "body3 text-primary placeholder:text-disable w-full bg-transparent outline-none",
            className
          )}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        {(maxLength !== undefined && (
          <span className="body3 text-disable shrink-0 pl-2">{`(${length}/${maxLength})`}</span>
        )) ||
          (value && (
            <span className="body3 text-disable shrink-0 pl-2">편집</span>
          ))}
      </div>
    </div>
  );
};
