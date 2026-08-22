"use client";

import { IcDownload, IcOpenInNew } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ImageActionButtonsProps {
  imageUrl: string;
  className?: string;
}

const shareImageFile = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error("이미지를 불러오지 못했습니다.");
  }

  const blob = await response.blob();
  const fileName = imageUrl.split("/").pop() ?? "image";
  const file = new File([blob], fileName, { type: blob.type });

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file] });
    return;
  }

  window.open(imageUrl, "_blank", "noopener,noreferrer");
};

export const ImageActionButtons = ({
  imageUrl,
  className,
}: ImageActionButtonsProps) => {
  const handleShareClick = () => {
    shareImageFile(imageUrl).catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    });
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <a
        href={imageUrl}
        download
        aria-label="이미지 다운로드"
        className="rounded-4 border-border-2 text-secondary-2 flex size-7 shrink-0 items-center justify-center border"
      >
        <IcDownload size={20} />
      </a>
      <button
        type="button"
        onClick={handleShareClick}
        aria-label="사진 공유하기"
        className="rounded-4 border-border-2 text-secondary-2 flex size-7 shrink-0 items-center justify-center border"
      >
        <IcOpenInNew size={20} />
      </button>
    </div>
  );
};
