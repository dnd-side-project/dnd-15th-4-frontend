import type { StaticImageData } from "next/image";

import character1 from "@/assets/images/characters/character-1.png";
import character2 from "@/assets/images/characters/character-2.png";
import character3 from "@/assets/images/characters/character-3.png";
import character4 from "@/assets/images/characters/character-4.png";
import character5 from "@/assets/images/characters/character-5.png";
import character6 from "@/assets/images/characters/character-6.png";
import character7 from "@/assets/images/characters/character-7.png";
import character8 from "@/assets/images/characters/character-8.png";
import character9 from "@/assets/images/characters/character-9.png";
import character10 from "@/assets/images/characters/character-10.png";
import character11 from "@/assets/images/characters/character-11.png";
import character12 from "@/assets/images/characters/character-12.png";
import character13 from "@/assets/images/characters/character-13.png";
import character14 from "@/assets/images/characters/character-14.png";
import character15 from "@/assets/images/characters/character-15.png";
import character16 from "@/assets/images/characters/character-16.png";
import character17 from "@/assets/images/characters/character-17.png";
import character18 from "@/assets/images/characters/character-18.png";
import character19 from "@/assets/images/characters/character-19.png";
import character20 from "@/assets/images/characters/character-20.png";
import character21 from "@/assets/images/characters/character-21.png";
import character22 from "@/assets/images/characters/character-22.png";
import character23 from "@/assets/images/characters/character-23.png";
import character24 from "@/assets/images/characters/character-24.png";
import character25 from "@/assets/images/characters/character-25.png";
import character26 from "@/assets/images/characters/character-26.png";
import character27 from "@/assets/images/characters/character-27.png";
import character28 from "@/assets/images/characters/character-28.png";
import character29 from "@/assets/images/characters/character-29.png";
import character30 from "@/assets/images/characters/character-30.png";
import character31 from "@/assets/images/characters/character-31.png";
import character32 from "@/assets/images/characters/character-32.png";
import character33 from "@/assets/images/characters/character-33.png";
import character34 from "@/assets/images/characters/character-34.png";
import character35 from "@/assets/images/characters/character-35.png";
import character36 from "@/assets/images/characters/character-36.png";
import character37 from "@/assets/images/characters/character-37.png";
import character38 from "@/assets/images/characters/character-38.png";
import character39 from "@/assets/images/characters/character-39.png";
import character40 from "@/assets/images/characters/character-40.png";

const CHARACTER_IMAGES: Record<number, StaticImageData> = {
  1: character1,
  2: character2,
  3: character3,
  4: character4,
  5: character5,
  6: character6,
  7: character7,
  8: character8,
  9: character9,
  10: character10,
  11: character11,
  12: character12,
  13: character13,
  14: character14,
  15: character15,
  16: character16,
  17: character17,
  18: character18,
  19: character19,
  20: character20,
  21: character21,
  22: character22,
  23: character23,
  24: character24,
  25: character25,
  26: character26,
  27: character27,
  28: character28,
  29: character29,
  30: character30,
  31: character31,
  32: character32,
  33: character33,
  34: character34,
  35: character35,
  36: character36,
  37: character37,
  38: character38,
  39: character39,
  40: character40,
};

export const CHARACTER_FALLBACK_IMAGE = character1;

// todo: Number 방식이 아닌 URL 자체를 받는 방식으로 수정되었습니다. 해당 부분은 API 연결을 하면서 수정할 필요가 있습니다.
export const getCharacterImage = (
  profileImageNumber: number
): StaticImageData =>
  CHARACTER_IMAGES[profileImageNumber] ?? CHARACTER_FALLBACK_IMAGE;
