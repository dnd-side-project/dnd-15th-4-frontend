import Image from "next/image";

import searchImage from "@/assets/images/home-empty-schedule.png";

export const HomeUpcomingEmpty = () => (
  <section className="flex flex-col items-center gap-3.5 opacity-46">
    <Image src={searchImage} alt="" width={72} height={77} />
    <p className="body2 text-text-secondary-1 text-center">
      예정된 약속이 없습니다.
      <br />
      약속을 생성해 보세요!
    </p>
  </section>
);
