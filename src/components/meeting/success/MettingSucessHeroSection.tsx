"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

import successHeroImage from "@/assets/images/meeting-success-hero.png";

import { IcHome } from "@/components/icons";

export const MeetingSucessHeroSectoin = () => {
  const router = useRouter();

  return (
    <section className="bg-primary-light-active relative flex h-[54dvh] max-h-80 min-h-100 w-full flex-col items-center justify-center overflow-hidden pt-12">
      <button
        type="button"
        onClick={() => router.push("/home")}
        aria-label="홈으로"
        className="text-primary absolute top-11 left-4"
      >
        <IcHome size={24} />
      </button>

      <Image
        src={successHeroImage}
        alt="약속 생성 완료"
        priority
        className="h-auto w-[40vw] object-contain"
      />

      <h1 className="h2 text-primary mt-4 text-center tracking-[-0.02em]">
        약속 생성이
        <br />
        완료되었습니다!
      </h1>
      <p className="body2 text-primary mt-3 text-center">
        초대 코드를 공유해보세요
      </p>
    </section>
  );
};
