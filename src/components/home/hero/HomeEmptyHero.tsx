import Image from "next/image";

import heroImage from "@/assets/images/home-empty-hero.png";

export const HomeEmptyHero = () => (
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
);
