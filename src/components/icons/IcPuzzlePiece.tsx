interface PuzzleShapeConfig {
  path: string;
  height: number;
  dotCy: number;
}

export const PUZZLE_SHAPES = [
  "shape-1",
  "shape-2",
  "shape-3",
  "shape-4",
  "shape-5",
] as const;

export type PuzzleShape = (typeof PUZZLE_SHAPES)[number];

const PUZZLE_SHAPE_CONFIG: Record<PuzzleShape, PuzzleShapeConfig> = {
  "shape-1": {
    path: "M24 20C24 22.2091 22.2091 24 20 24L16.9717 24C16.9898 23.8358 17 23.669 17 23.5C17 21.0147 14.9853 19 12.5 19C10.0147 19 8 21.0147 8 23.5C8 23.6691 8.01113 23.8358 8.0293 24L4 24C1.79086 24 0 22.2091 0 20L0 4C0 1.79086 1.79086 0 4 0L20 0C22.2091 0 24 1.79086 24 4L24 20Z",
    height: 35,
    dotCy: 31.5,
  },
  "shape-2": {
    path: "M11.5 0C13.8162 0 15.7229 1.75007 15.9717 4H20C22.2091 4 24 5.79086 24 8V11.0283C23.8358 11.0102 23.669 11 23.5 11C21.0147 11 19 13.0147 19 15.5C19 17.9853 21.0147 20 23.5 20C23.6691 20 23.8358 19.9889 24 19.9707V24C24 26.2091 22.2091 28 20 28H4C1.79086 28 0 26.2091 0 24V8C0 5.79086 1.79086 4 4 4H7.02832C7.27708 1.75007 9.18375 0 11.5 0Z",
    height: 39,
    dotCy: 35.5,
  },
  "shape-3": {
    path: "M20 0C22.2091 0 24 1.79086 24 4V7.02832C23.8358 7.01017 23.669 7 23.5 7C21.0147 7 19 9.01472 19 11.5C19 13.9853 21.0147 16 23.5 16C23.6691 16 23.8358 15.9889 24 15.9707V20C24 22.2091 22.2091 24 20 24L4 24C1.79086 24 0 22.2091 0 20L0 4C0 1.79086 1.79086 0 4 0L20 0Z",
    height: 35,
    dotCy: 31.5,
  },
  "shape-4": {
    path: "M4 24C1.79086 24 0 22.2091 0 20L0 16.9717C0.164199 16.9898 0.330964 17 0.5 17C2.98528 17 5 14.9853 5 12.5C5 10.0147 2.98528 8 0.5 8C0.330928 8 0.164234 8.01113 0 8.02929L0 4C0 1.79086 1.79086 0 4 0L20 0C22.2091 0 24 1.79086 24 4L24 20C24 22.2091 22.2091 24 20 24L4 24Z",
    height: 35,
    dotCy: 31.5,
  },
  "shape-5": {
    path: "M12.5 0C10.1838 0 8.27709 1.75007 8.02832 4H4C1.79086 4 0 5.79086 0 8V11.0283C0.164198 11.0102 0.330963 11 0.5 11C2.98528 11 5 13.0147 5 15.5C5 17.9853 2.98528 20 0.5 20C0.330927 20 0.164232 19.9889 0 19.9707V24C0 26.2091 1.79086 28 4 28H20C22.2091 28 24 26.2091 24 24V8C24 5.79086 22.2091 4 20 4H16.9717C16.7229 1.75007 14.8162 0 12.5 0Z",
    height: 39,
    dotCy: 35.5,
  },
};

interface IcPuzzlePieceProps {
  shape?: PuzzleShape;
  className?: string;
}

export const IcPuzzlePiece = ({
  shape = "shape-1",
  className,
}: IcPuzzlePieceProps) => {
  const { path, height, dotCy } = PUZZLE_SHAPE_CONFIG[shape];

  return (
    <svg
      width="24"
      height={height}
      viewBox={`0 0 24 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible" }}
    >
      <path
        d={path}
        fill="currentColor"
        stroke="var(--color-border-4)"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy={dotCy}
        r="2.75"
        fill="currentColor"
        stroke="var(--color-border-4)"
        strokeWidth="1.5"
      />
    </svg>
  );
};
