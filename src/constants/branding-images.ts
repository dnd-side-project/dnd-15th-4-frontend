import type { StaticImageData } from "next/image";

import branding1 from "@/assets/images/branding/branding-1.png";
import branding2 from "@/assets/images/branding/branding-2.png";
import branding3 from "@/assets/images/branding/branding-3.png";
import branding4 from "@/assets/images/branding/branding-4.png";
import branding5 from "@/assets/images/branding/branding-5.png";
import branding6 from "@/assets/images/branding/branding-6.png";
import branding7 from "@/assets/images/branding/branding-7.png";
import branding8 from "@/assets/images/branding/branding-8.png";
import branding9 from "@/assets/images/branding/branding-9.png";
import branding10 from "@/assets/images/branding/branding-10.png";

export const BRAND_IMAGES: StaticImageData[] = [
  branding1,
  branding2,
  branding3,
  branding4,
  branding5,
  branding6,
  branding7,
  branding8,
  branding9,
  branding10,
];

export const getRandomBrandImage = (): StaticImageData =>
  BRAND_IMAGES[Math.floor(Math.random() * BRAND_IMAGES.length)];
