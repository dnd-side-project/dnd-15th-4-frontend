"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import errorCharacter from "@/assets/images/error-character.png";
import { IcHome } from "@/components/icons";

interface ErrorScreenProps {
  title?: string;
  retryLabel?: string;
  onRetry?: () => void;
}

export const ErrorScreen = ({
  title = "페이지를\n찾을 수 없습니다",
  retryLabel = "다시시도",
  onRetry,
}: ErrorScreenProps) => {
  const router = useRouter();

  const handleRetry = onRetry ?? (() => window.location.reload());

  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center bg-white">
      <button
        type="button"
        aria-label="홈으로"
        onClick={() => router.push("/home")}
        className="text-primary absolute top-11 left-4 cursor-pointer"
      >
        <IcHome size={24} />
      </button>

      <p className="text-primary text-center text-2xl leading-tight font-semibold whitespace-pre-line">
        {title}
      </p>

      <Image
        src={errorCharacter}
        alt=""
        priority
        className="mt-8 h-60 w-auto object-contain"
      />

      <button
        type="button"
        onClick={handleRetry}
        className="body2 text-disable absolute bottom-16 cursor-pointer underline"
      >
        {retryLabel}
      </button>
    </div>
  );
};
