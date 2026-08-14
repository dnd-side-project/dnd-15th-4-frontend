"use client";

import Image from "next/image";

import heroImage from "@/assets/images/home-empty-hero.png";
import { ProfileMenu } from "@/components/home/ProfileMenu";
import type { MeetingData } from "@/types/meeting";

interface HomeHeroSectionProps {
  meeting?: MeetingData | null;
}

export const HomeHeroSection = ({ meeting }: HomeHeroSectionProps) => {
  return (
    <section className="bg-primary-light-active relative h-[54dvh] max-h-80 min-h-100 w-full overflow-hidden">
      <div className="absolute top-11 right-4 z-20">
        <ProfileMenu />
      </div>
      {meeting ? (
        <>
          <div>{meeting.title}</div>
        </>
      ) : (
        <>
          <Image
            src={heroImage}
            alt="진행중인 약속이 없습니다"
            fill
            priority
            sizes="100vw"
            className="no-drag object-contain object-bottom"
          />

          <div className="relative z-10 px-4 pt-11">
            <h1 className="h1 text-text-primary">
              진행중인
              <br />
              약속이 없습니다
            </h1>
          </div>
        </>
      )}
    </section>
  );
};
