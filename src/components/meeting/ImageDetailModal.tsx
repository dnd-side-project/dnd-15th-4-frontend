"use client";

import Image from "next/image";

import { Modal } from "@/components/common/Modal";
import { IcDownload, IcOpenInNew } from "@/components/icons";

interface ImageDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  imageAlt?: string;
  uploaderNickname?: string;
  uploaderProfileImageUrl?: string;
}

const shareImageFile = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const fileName = imageUrl.split("/").pop() ?? "image";
  const file = new File([blob], fileName, { type: blob.type });

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file] });
    return;
  }

  window.open(imageUrl, "_blank", "noopener,noreferrer");
};

export const ImageDetailModal = ({
  open,
  onOpenChange,
  imageUrl,
  imageAlt = "",
  uploaderNickname,
  uploaderProfileImageUrl,
}: ImageDetailModalProps) => {
  const handleShareClick = () => {
    shareImageFile(imageUrl).catch(() => {});
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="퍼즐 이미지 상세보기"
      className="max-w-90.25 gap-5.25 px-5 pt-8.75 pb-8"
    >
      <div className="rounded-20 bg-surface-1 relative aspect-square w-full max-w-66.25 overflow-hidden">
        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="flex w-full items-center">
        {uploaderNickname && (
          <>
            {uploaderProfileImageUrl && (
              <div className="rounded-8 relative mr-4 size-9.5 shrink-0 overflow-hidden border border-black">
                <Image
                  src={uploaderProfileImageUrl}
                  alt={uploaderNickname}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="body1 text-title flex-1 tracking-[-0.02em]">
              {uploaderNickname}
            </p>
          </>
        )}
        <a
          href={imageUrl}
          download
          aria-label="이미지 다운로드"
          className="rounded-4 border-border-2 text-secondary-2 ml-auto flex size-7 shrink-0 items-center justify-center border"
        >
          <IcDownload size={20} />
        </a>
        <button
          type="button"
          onClick={handleShareClick}
          aria-label="사진 공유하기"
          className="rounded-4 border-border-2 text-secondary-2 ml-3 flex size-7 shrink-0 items-center justify-center border"
        >
          <IcOpenInNew size={20} />
        </button>
      </div>
    </Modal>
  );
};
