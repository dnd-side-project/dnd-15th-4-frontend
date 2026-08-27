export interface VapidPublicKeyDto {
  publicKey: string;
}

export interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface RegisterPushSubscriptionRequest {
  endpoint: string;
  keys: PushSubscriptionKeys;
}

export interface UnregisterPushSubscriptionRequest {
  endpoint: string;
}
