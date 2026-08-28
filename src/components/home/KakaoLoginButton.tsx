import { IcKakao } from "@/components/icons";

export interface KakaoLoginButtonProps {
  onClick?: () => void;
}

export const KakaoLoginButton = ({ onClick }: KakaoLoginButtonProps) => (
  <div className="flex w-full flex-col items-center gap-2">
    <button
      type="button"
      onClick={onClick}
      className="rounded-16 bg-kakao flex h-14 w-full items-center justify-center gap-2"
    >
      <IcKakao size={24} />
      <span className="body2 bottom-button">카카오로 시작하기</span>
    </button>
  </div>
);
