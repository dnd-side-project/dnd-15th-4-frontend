"use client";

import { useRef } from "react";
import Image from "next/image";

import { IcCamera } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { MeetingImageSelection } from "@/types/meeting";

export interface ImageUploadBoxProps {
  selectedImage?: MeetingImageSelection | null;
  onFileSelected?: (file: File) => void;
  className?: string;
}

export const ImageUploadBox = ({
  selectedImage,
  onFileSelected,
  className,
}: ImageUploadBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onFileSelected?.(file);
    event.target.value = "";
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      aria-label="사진 업로드"
      className={cn(
        "bg-surface-1 relative flex size-48 shrink-0 items-center justify-center overflow-hidden rounded-20",
        className
      )}
    >
      {selectedImage ? (
        <Image
          src={selectedImage.src}
          alt="선택된 약속 사진"
          fill
          unoptimized
          className="object-contain"
        />
      ) : (
        <IcCamera size={30} className="text-border-2" />
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
    </button>
  );
};
