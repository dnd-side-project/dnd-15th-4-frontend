"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Header } from "@/components/common/Header";
import { SummaryRow } from "@/components/common/SummaryRow";
import { getCharacterImage } from "@/constants/character-images";
import { AccountSection } from "@/components/mypage/AccountSection";
import { NotificationSettingsSection } from "@/components/mypage/NotificationSettingsSection";
import { MOCK_USER } from "@/mocks/mockUser";

const MyPage = () => {
  const router = useRouter();

  return (
    <div className="h-screen scrollbar-none overflow-y-auto pb-12">
      <Header
        title="마이페이지"
        onBack={() => router.back()}
        className="bg-bg-normal sticky top-0 z-10"
      />
      <div className="mt-5.5 flex flex-col items-center gap-2.75">
        <Image
          src={getCharacterImage(MOCK_USER.profileImageNumber)}
          alt={MOCK_USER.nickname}
          className="rounded-12 size-25.5 border-[0.1875rem] border-black object-cover"
        />
        <p className="h4 text-primary">{MOCK_USER.nickname}</p>
      </div>
      <SummaryRow
        className="mx-4 mt-8.75 mb-8"
        items={[
          {
            label: "지난 약속",
            value: `${MOCK_USER.previousAppointmentCount}개`,
            onClick: () => router.push("/mypage/meetings"),
          },
          {
            label: "모은 퍼즐",
            value: `${MOCK_USER.collectedPuzzleCount}개`,
            onClick: () => router.push("/mypage/puzzles"),
          },
          {
            label: "내 검색어",
            value: `${MOCK_USER.favoritePlaceCount}개`,
            onClick: () => router.push("/mypage/favorites"),
          },
        ]}
      />
      <NotificationSettingsSection
        notificationSettings={MOCK_USER.notificationSettings}
      />
      <div className="bg-divider-2 mt-6 h-2 w-full" />
      <AccountSection kakaoId={MOCK_USER.kakaoId} />
    </div>
  );
};

export default MyPage;
