import puzzleMember1 from "@/assets/images/puzzle-member-1.png";
import puzzleMember2 from "@/assets/images/puzzle-member-2.png";
import puzzleMember3 from "@/assets/images/puzzle-member-3.png";
import puzzleMember4 from "@/assets/images/puzzle-member-4.png";

export const PROFILE_IMAGES = [
  puzzleMember1,
  puzzleMember2,
  puzzleMember3,
  puzzleMember4,
];

export const getProfileImageUrl = (profileImageNumber: number): string =>
  PROFILE_IMAGES[(profileImageNumber - 1) % PROFILE_IMAGES.length].src;
