"use client";

import { useState } from "react";

import { ConfirmModal } from "@/components/common/ConfirmModal";
import { useLogout } from "@/hooks/auth/useLogout";
import { cn } from "@/lib/utils";

interface MenuButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

const MenuButton = ({ label, className, onClick }: MenuButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn("body2 text-primary py-4 pl-4 text-left", className)}
  >
    {label}
  </button>
);

interface AccountSectionProps {
  kakaoId?: string;
}

export const AccountSection = ({ kakaoId }: AccountSectionProps) => {
  const logout = useLogout();
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isWithdrawConfirmOpen, setIsWithdrawConfirmOpen] = useState(false);

  const handleConfirmLogout = () => {
    setIsLogoutConfirmOpen(false);
    logout().catch(() => {});
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-4">
        <p className="body2 text-primary">카카오 아이디</p>
        <p className="body3 text-secondary-3">{kakaoId}</p>
      </div>
      <MenuButton
        label="로그아웃"
        onClick={() => setIsLogoutConfirmOpen(true)}
      />
      <MenuButton
        className="text-red"
        label="회원 탈퇴"
        onClick={() => setIsWithdrawConfirmOpen(true)}
      />
      <p className="body7 text-secondary-4 mt-12 text-center">
        askpuzzlemeet@gmail.com
      </p>
      {isLogoutConfirmOpen && (
        <ConfirmModal
          title="로그아웃 할까요?"
          description="로그인한 카카오계정을 로그아웃 합니다"
          cancelLabel="취소"
          onCancel={() => setIsLogoutConfirmOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
      {isWithdrawConfirmOpen && (
        <ConfirmModal
          title="회원 탈퇴를 하시겠습니까?"
          description="저장된 정보가 모두 사라지고 복구할 수 없습니다"
          cancelLabel="취소"
          onCancel={() => setIsWithdrawConfirmOpen(false)}
          onConfirm={() => setIsWithdrawConfirmOpen(false)}
        />
      )}
    </div>
  );
};
