"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import typographyLogo from "@/assets/images/typography-logo.png";
import brandingImg from "@/assets/images/branding/branding-23.png";
import landingImage1 from "@/assets/images/landing/landing-1.png";
import landingImage2 from "@/assets/images/landing/landing-2.png";
import landingImage3 from "@/assets/images/landing/landing-3.png";
import landingImage4 from "@/assets/images/landing/landing-4.png";
import landingImage5 from "@/assets/images/landing/landing-5.png";
import landingImage6 from "@/assets/images/landing/landing-6.png";
import puzzle from "@/assets/images/puzzle-2.png";
import { AuthLoadingScreen } from "@/components/common/AuthLoadingScreen";
import {
  OnboardingCarousel,
  type OnboardingSlide,
} from "@/components/auth/OnboardingCarousel";
import { KakaoLoginButton } from "@/components/home/KakaoLoginButton";
import { useAuthStore } from "@/stores/useAuthStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const SPLASH_DURATION_MS = 500;

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    title: (
      <>
        약속을 만들고, 함께하는 순간을
        <br />
        <span className="text-primary-normal">퍼즐밋</span>과 완성하세요!
      </>
    ),
    image: landingImage1,
  },
  {
    title: (
      <>
        <span className="text-primary-normal">초대코드</span>를 입력하고
        <br />
        약속을 시작해요!
      </>
    ),
    image: landingImage2,
  },
  {
    title: (
      <>
        퍼즐 사진을 올리고
        <br />
        우리만의 <span className="text-primary-normal">약속방</span>을
        만들어보세요!
      </>
    ),
    image: landingImage3,
  },
  {
    title: (
      <>
        출발 후 친구들의 <span className="text-primary-normal">도착정보</span>를
        <br />
        한눈에 확인해요!
      </>
    ),
    image: landingImage4,
  },
  {
    title: (
      <>
        약속 시간까지
        <br />
        우리만의 <span className="text-primary-normal">약속퍼즐</span>을
        맞춰가요!
      </>
    ),
    image: landingImage5,
  },
  {
    title: (
      <>
        약속을 위한 우리만의 도전과제!
        <br />
        <span className="text-primary-normal">재밌고 편한</span> 퍼즐밋!
      </>
    ),
    image: landingImage6,
  },
];

const LandingPage = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const _hasBootstrapped = useAuthStore((state) => state._hasBootstrapped);
  const isReady = _hasHydrated && _hasBootstrapped;
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsSplashVisible(false),
      SPLASH_DURATION_MS
    );
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/home");
    }
  }, [isReady, isAuthenticated, router]);

  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/kakao/authorize`;
  };

  if (isSplashVisible) {
    return (
      <main className="bg-primary-normal relative flex h-dvh flex-col items-center overflow-hidden">
        <div className="absolute inset-x-0 top-[13.625rem] flex flex-col items-center">
          <p className="h4 mb-4.5 text-white">약속을 더 쉽고 재밌게,</p>
          <Image
            src={typographyLogo}
            alt="퍼즐밋"
            priority
            className="w-56.5"
          />
        </div>
        <Image
          src={brandingImg}
          alt="퍼즐밋 브랜드 일러스트"
          className="absolute inset-x-0 -bottom-44"
        />
        <Image
          src={puzzle}
          alt="퍼즐 일러스트"
          className="absolute inset-x-0 bottom-22.5 -left-43 size-98.5 -rotate-[162.96deg] mix-blend-soft-light"
        />
        <Image
          src={puzzle}
          alt="퍼즐 일러스트"
          className="absolute top-0 -right-20 size-98.5 -rotate-[8.32deg] mix-blend-soft-light"
        />
      </main>
    );
  }

  if (!isReady || isAuthenticated) {
    return <AuthLoadingScreen />;
  }

  return (
    <main className="flex h-dvh flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
        <OnboardingCarousel slides={ONBOARDING_SLIDES} />
      </div>
      <div className="flex flex-col items-center gap-6 px-4 pb-10">
        <KakaoLoginButton onClick={handleLogin} />
      </div>
    </main>
  );
};

export default LandingPage;
