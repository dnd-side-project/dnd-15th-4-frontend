"use client";

import Image from "next/image";
import { useState } from "react";

import {
  ImageCarousel,
  type CarouselImage,
} from "@/components/common/ImageCarousel";
import { ImageActionButtons } from "@/components/common/ImageActionButtons";
import { Modal } from "@/components/common/Modal";

export type ImageDetailModalImage = CarouselImage;

interface ImageDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: ImageDetailModalImage[];
  initialIndex?: number;
  uploaderNickname?: string;
  uploaderProfileImageUrl?: string;
}

export const ImageDetailModal = ({
  open,
  onOpenChange,
  images,
  initialIndex = 0,
  uploaderNickname,
  uploaderProfileImageUrl,
}: ImageDetailModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentImage = images[currentIndex] ?? images[0];

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="퍼즐 이미지 상세보기"
      className="max-w-90.25 gap-5.25 px-5 pt-8.75 pb-8"
    >
      <ImageCarousel
        images={images}
        initialIndex={initialIndex}
        onPageChange={setCurrentIndex}
        className="max-w-66.25"
      />
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
        <ImageActionButtons
          imageUrl={currentImage.imageUrl}
          className="ml-auto"
        />
      </div>
    </Modal>
  );
};
