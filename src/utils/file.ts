import { getProvidedImageBgColorHex } from "@/constants/branding-images";
import type { MeetingImageSelection } from "@/types/meeting";

export const urlToFile = async (
  url: string,
  filename: string
): Promise<File> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`이미지를 가져올 수 없습니다: ${response.status}`);
  }

  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type || "image/jpeg" });
};

const COMPOSITE_CANVAS_SIZE = 512;

const compositeImageOnBackground = async (
  src: string,
  backgroundColor: string,
  filename: string
): Promise<File> => {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const element = new Image();
    element.crossOrigin = "anonymous";
    element.onload = () => resolve(element);
    element.onerror = () => reject(new Error("이미지를 불러올 수 없습니다."));
    element.src = src;
  });

  const canvas = document.createElement("canvas");
  canvas.width = COMPOSITE_CANVAS_SIZE;
  canvas.height = COMPOSITE_CANVAS_SIZE;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("이미지를 변환할 수 없습니다.");

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, COMPOSITE_CANVAS_SIZE, COMPOSITE_CANVAS_SIZE);

  const scale = Math.min(
    COMPOSITE_CANVAS_SIZE / image.width,
    COMPOSITE_CANVAS_SIZE / image.height
  );
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  context.drawImage(
    image,
    (COMPOSITE_CANVAS_SIZE - drawWidth) / 2,
    (COMPOSITE_CANVAS_SIZE - drawHeight) / 2,
    drawWidth,
    drawHeight
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );
  if (!blob) throw new Error("이미지를 변환할 수 없습니다.");

  return new File([blob], filename, { type: "image/png" });
};

export const meetingImageSelectionToFile = (
  selection: MeetingImageSelection,
  filename: string
): Promise<File> => {
  if (selection.type === "default" && selection.bgColorClassName) {
    return compositeImageOnBackground(
      selection.src,
      getProvidedImageBgColorHex(selection.bgColorClassName),
      filename
    );
  }
  return urlToFile(selection.src, filename);
};
