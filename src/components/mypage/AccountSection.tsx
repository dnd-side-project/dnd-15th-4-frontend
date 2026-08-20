import { cn } from "@/lib/utils";

interface MenuButtonProps {
  label: string;
  className?: string;
}

const MenuButton = ({ label, className }: MenuButtonProps) => (
  <button
    type="button"
    className={cn("body2 text-primary py-4 pl-4 text-left", className)}
  >
    {label}
  </button>
);

interface AccountSectionProps {
  kakaoId: string;
}

export const AccountSection = ({ kakaoId }: AccountSectionProps) => (
  <div className="flex flex-col">
    <MenuButton label="즐겨찾기한 검색어" />

    <span className="bg-divider-2 h-2 w-full" />

    <div className="flex items-center justify-between px-4 py-4">
      <p className="body2 text-primary">카카오 아이디</p>
      <p className="body3 text-secondary-3">{kakaoId}</p>
    </div>

    <MenuButton label="로그아웃" />

    <MenuButton className="text-red" label="회원 탈퇴" />
  </div>
);
