const HANGUL_SYLLABLE_START = 0xac00;
const HANGUL_SYLLABLE_END = 0xd7a3;
const JONGSEONG_COUNT = 28;
const RIEUL_JONGSEONG_INDEX = 8;

export const getRoParticle = (text: string): "로" | "으로" => {
  const trimmed = text.trim();
  const lastChar = trimmed.at(-1);

  if (!lastChar) return "로";

  if (/\d/.test(lastChar)) {
    return ["0", "3", "6"].includes(lastChar) ? "으로" : "로";
  }

  const code = lastChar.charCodeAt(0);
  if (code >= HANGUL_SYLLABLE_START && code <= HANGUL_SYLLABLE_END) {
    const jongseongIndex = (code - HANGUL_SYLLABLE_START) % JONGSEONG_COUNT;
    const hasBatchim = jongseongIndex !== 0;
    const isRieulBatchim = jongseongIndex === RIEUL_JONGSEONG_INDEX;

    return hasBatchim && !isRieulBatchim ? "으로" : "로";
  }

  return "로";
};
