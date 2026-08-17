import {
  PUZZLE_SHAPES,
  type PuzzleShape,
} from "@/components/icons/IcPuzzlePiece";

export interface PuzzleAppearance {
  shape: PuzzleShape;
  isPrimaryColor: boolean;
}

const hashString = (value: string): number => {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return Math.abs(hash);
};

export const getUserPuzzleAppearance = (userId: number): PuzzleAppearance => ({
  shape: PUZZLE_SHAPES[hashString(`shape-${userId}`) % PUZZLE_SHAPES.length],
  isPrimaryColor: hashString(`color-${userId}`) % 2 === 0,
});
