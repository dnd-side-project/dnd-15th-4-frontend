"use client";

import { useCallback, useState } from "react";

import {
  fetchVapidPublicKey,
  registerPushSubscription,
  unregisterPushSubscription,
} from "@/apis/notification/notifications";
import { urlBase64ToUint8Array } from "@/utils/web-push";

export type PushSubscriptionStatus =
  | "idle"
  | "subscribing"
  | "subscribed"
  | "unsupported"
  | "denied"
  | "error";

const isPushSupported = () =>
  typeof window !== "undefined" &&
  "serviceWorker" in navigator &&
  "PushManager" in window &&
  "Notification" in window;

export const usePushSubscription = () => {
  const [status, setStatus] = useState<PushSubscriptionStatus>("idle");

  const subscribe = useCallback(async () => {
    if (!isPushSupported()) {
      setStatus("unsupported");
      return;
    }

    setStatus("subscribing");

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("denied");
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      const existingSubscription =
        await registration.pushManager.getSubscription();
      const publicKey = await fetchVapidPublicKey();

      const subscription =
        existingSubscription ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            publicKey
          ) as BufferSource,
        }));

      const { endpoint, keys } = subscription.toJSON();
      if (!endpoint || !keys?.p256dh || !keys.auth) {
        throw new Error("푸시 구독 키를 가져오지 못했습니다.");
      }

      await registerPushSubscription({
        endpoint,
        keys: { p256dh: keys.p256dh, auth: keys.auth },
      });

      setStatus("subscribed");
    } catch {
      setStatus("error");
    }
  }, []);

  const unsubscribe = useCallback(async () => {
    if (!isPushSupported()) return;

    try {
      const registration =
        await navigator.serviceWorker.getRegistration("/sw.js");
      const subscription = await registration?.pushManager.getSubscription();
      if (!subscription) {
        setStatus("idle");
        return;
      }

      await unregisterPushSubscription({ endpoint: subscription.endpoint });
      await subscription.unsubscribe();
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, []);

  return { status, subscribe, unsubscribe };
};
