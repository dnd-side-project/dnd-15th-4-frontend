"use client";

import { HomeEmptyHero } from "@/components/home/hero/HomeEmptyHero";
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
        <HomeEmptyHero />
      )}
    </section>
  );
};
