import Image from "next/image";

import loadingCharacter from "@/assets/images/loading-character.png";

export const LoadingScreen = () => (
  <div className="flex h-dvh w-full flex-col items-center justify-center gap-6 bg-white">
    <p className="text-primary text-2xl font-semibold">loading...</p>
    <Image
      src={loadingCharacter}
      alt=""
      priority
      className="h-52 w-auto object-contain"
    />
  </div>
);
