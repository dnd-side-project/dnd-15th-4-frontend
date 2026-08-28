"use client";

import { IcKakao } from "@/components/icons";
import { Toast } from "@/components/common/Toast";
import { useToast } from "@/hooks/common/useToast";

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
  const { toastMessage, showToast } = useToast();

  // todo: 카카오톡 메시지 SDK가 MVP에서 밀려남에 따라 현재 카카오톡 공유는 연동하지 않고 링크 복사로 임시 구현합니다.
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${title}\n${description}\n${linkUrl}`
      );
      showToast("공유 내용이 복사되었습니다!");
    } catch {
      showToast("링크 복사에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center gap-2">
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
      {toastMessage && <Toast message={toastMessage} position="top" />}
    </div>
  );
};
