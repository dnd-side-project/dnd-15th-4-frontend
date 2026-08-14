"use client";

import { HomeEmptyHero } from "@/components/home/hero/HomeEmptyHero";
import { ProfileMenu } from "@/components/home/ProfileMenu";

export const HomeHeroSection = () => {
  return (
    <section className="bg-primary-light-active relative h-[54dvh] max-h-80 min-h-100 w-full overflow-hidden">
      <div className="absolute top-11 right-4 z-20">
        <ProfileMenu />
      </div>

      {/* todo: 진행중인 약속이 있을 경우 */}
      <HomeEmptyHero />
    </section>
  );
};
