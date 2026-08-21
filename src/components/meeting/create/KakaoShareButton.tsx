"use client";

import { useState } from "react";

import { IcKakao } from "@/components/icons";
import { loadKakaoSdk } from "@/lib/kakao";

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

  const handleShare = async () => {
    setError(null);
    const kakao = await loadKakaoSdk();

    if (!kakao) {
      setError("카카오톡 공유를 사용할 수 없어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    kakao.Share.sendDefault({
      objectType: "text",
      text: `${title}\n${description}`,
      link: { mobileWebUrl: linkUrl, webUrl: linkUrl },
    });
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
