import type { IconProps } from "./icon.types";

interface BaseIconProps extends IconProps {
  children: React.ReactNode;
  viewBox?: string;
}

export const BaseIcon = ({
  size = 24,
  className,
  children,
  viewBox = "0 0 24 24",
  ...props
}: BaseIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    {children}
  </svg>
);
