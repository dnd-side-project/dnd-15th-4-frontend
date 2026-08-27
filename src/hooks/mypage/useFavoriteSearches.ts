"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addFavoriteSearch,
  deleteFavoriteSearch,
  fetchFavoriteSearches,
} from "@/apis/mypage/favoriteSearches";
import { mypageKeys } from "@/apis/mypage/keys";

export const useFavoriteSearchesQuery = () =>
  useQuery({
    queryKey: mypageKeys.favoriteSearches(),
    queryFn: fetchFavoriteSearches,
  });

export const useAddFavoriteSearchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavoriteSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mypageKeys.favoriteSearches(),
      });
    },
  });
};

export const useDeleteFavoriteSearchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavoriteSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mypageKeys.favoriteSearches(),
      });
    },
  });
};
