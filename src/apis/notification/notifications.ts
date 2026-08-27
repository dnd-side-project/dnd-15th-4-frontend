import { api } from "@/lib/api/http-client";
import type { ApiResult } from "@/types/api";
import type {
  RegisterPushSubscriptionRequest,
  UnregisterPushSubscriptionRequest,
  VapidPublicKeyDto,
} from "@/types/notification";

export const fetchVapidPublicKey = async (): Promise<string> => {
  const result = await api.get<ApiResult<VapidPublicKeyDto>>(
    "/notifications/vapid-public-key"
  );
  return result.data.publicKey;
};

export const registerPushSubscription = async (
  request: RegisterPushSubscriptionRequest
): Promise<void> => {
  await api.post<ApiResult<null>>("/notifications/push-subscriptions", request);
};

export const unregisterPushSubscription = async (
  request: UnregisterPushSubscriptionRequest
): Promise<void> => {
  await api.delete<ApiResult<null>>(
    "/notifications/push-subscriptions",
    request
  );
};
