import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type { UserDto } from "@/types/auth";
import type { NotificationSettings } from "@/types/user";

export const fetchCurrentUser = async (): Promise<UserDto> => {
  const result = await api.get<ApiResult<UserDto>>("/users/me");
  return result.data;
};

export const withdrawUser = async (): Promise<void> => {
  await api.delete<ApiResult<null>>("/users/me");
};

export const fetchNotificationSettings =
  async (): Promise<NotificationSettings> => {
    const result = await api.get<ApiResult<NotificationSettings>>(
      "/users/me/notification-settings"
    );
    return result.data;
  };

export const updateNotificationSettings = async (
  settings: NotificationSettings
): Promise<NotificationSettings> => {
  const result = await api.patch<ApiResult<NotificationSettings>>(
    "/users/me/notification-settings",
    settings
  );
  return result.data;
};
