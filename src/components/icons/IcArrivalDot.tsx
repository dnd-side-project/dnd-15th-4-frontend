interface IcArrivalDotProps {
  className?: string;
}

export const IcArrivalDot = ({
  className = "text-primary-normal",
}: IcArrivalDotProps) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    style={{ overflow: "visible" }}
  >
    <circle
      cx="5"
      cy="5"
      r="4.25"
      fill="currentColor"
      stroke="var(--color-border-4)"
      strokeWidth="1.5"
    />
  </svg>
);
