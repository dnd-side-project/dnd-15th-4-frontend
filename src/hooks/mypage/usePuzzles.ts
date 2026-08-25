"use client";

import { useQuery } from "@tanstack/react-query";

import { mypageKeys } from "@/apis/mypage/keys";
import { fetchPuzzles } from "@/apis/mypage/puzzles";

export const usePuzzlesQuery = () =>
  useQuery({
    queryKey: mypageKeys.puzzles(),
    queryFn: fetchPuzzles,
  });
