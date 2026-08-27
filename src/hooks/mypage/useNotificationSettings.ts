"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchNotificationSettings,
  updateNotificationSettings,
} from "@/apis/auth/user";
import { mypageKeys } from "@/apis/mypage/keys";

export const useNotificationSettingsQuery = () =>
  useQuery({
    queryKey: mypageKeys.notificationSettings(),
    queryFn: fetchNotificationSettings,
  });

export const useUpdateNotificationSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(mypageKeys.notificationSettings(), data);
    },
  });
};
