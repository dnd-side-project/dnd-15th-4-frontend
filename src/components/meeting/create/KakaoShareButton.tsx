"use client";

import { useState } from "react";

import { IcKakao } from "@/components/icons";

export interface KakaoShareButtonProps {
  title: string;
  description: string;
  linkUrl: string;
}

export const KakaoShareButton = ({
  title,
  description,
  linkUrl,
}: KakaoShareButtonProps) => {
  const [error, setError] = useState<string | null>(null);

  // todo: 카카오톡 메시지 SDK가 MVP에서 밀려남에 따라 현재 카카오톡 공유는 연동하지 않고 링크 복사로 임시 구현합니다.
  const handleShare = async () => {
    setError(null);
    try {
      await navigator.clipboard.writeText(
        `${title}\n${description}\n${linkUrl}`
      );
    } catch {
      setError("링크 복사에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleShare}
        className="rounded-16 bg-kakao flex h-14 w-full items-center justify-center gap-2"
      >
        <IcKakao size={24} />
        <span className="body2 font-medium text-black">
          카카오톡으로 공유하기
        </span>
      </button>
      {error && <p className="body7 text-disable">{error}</p>}
    </div>
  );
};
