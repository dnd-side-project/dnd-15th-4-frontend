import { IcKakao } from "@/components/icons";
import { Button, type ButtonProps } from "@/components/common/Button";

export type KakaoLoginButtonProps = Omit<ButtonProps, "variant" | "size">;

export const KakaoLoginButton = (props: KakaoLoginButtonProps) => (
  <Button variant="kakao" size="cta" {...props}>
    <IcKakao size={20} />
    카카오로 시작하기
  </Button>
);
