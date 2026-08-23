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
import branding11 from "@/assets/images/branding/branding-11.png";
import branding12 from "@/assets/images/branding/branding-12.png";
import branding13 from "@/assets/images/branding/branding-13.png";
import branding14 from "@/assets/images/branding/branding-14.png";
import branding15 from "@/assets/images/branding/branding-15.png";
import branding16 from "@/assets/images/branding/branding-16.png";
import branding17 from "@/assets/images/branding/branding-17.png";
import branding18 from "@/assets/images/branding/branding-18.png";
import branding19 from "@/assets/images/branding/branding-19.png";
import branding20 from "@/assets/images/branding/branding-20.png";
import branding21 from "@/assets/images/branding/branding-21.png";
import branding22 from "@/assets/images/branding/branding-22.png";

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
  branding11,
  branding12,
  branding13,
  branding14,
  branding15,
  branding16,
  branding17,
  branding18,
  branding19,
  branding20,
  branding21,
  branding22,
];

export const getRandomBrandImage = (): StaticImageData =>
  BRAND_IMAGES[Math.floor(Math.random() * BRAND_IMAGES.length)];

const PROVIDED_IMAGE_BG_COLORS = [
  "bg-point-normal",
  "bg-sub1-normal",
  "bg-surface-4",
  "bg-surface-1",
] as const;

export const getRandomProvidedImageBgColor = (): string =>
  PROVIDED_IMAGE_BG_COLORS[
    Math.floor(Math.random() * PROVIDED_IMAGE_BG_COLORS.length)
  ];
