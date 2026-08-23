"use client";

import { useState } from "react";

import { getRandomBrandImage } from "@/constants/branding-images";
import type { MeetingImageSelection } from "@/types/meeting";

export const useMeetingImageSelection = () => {
  const [selectedImage, setSelectedImage] =
    useState<MeetingImageSelection | null>(null);
  const [pendingCropImage, setPendingCropImage] = useState<string | null>(null);

  const replaceSelectedImage = (next: MeetingImageSelection | null) => {
    setSelectedImage((prev) => {
      if (prev?.type === "user") URL.revokeObjectURL(prev.src);
      return next;
    });
  };

  const handleFileSelected = (file: File) => {
    setPendingCropImage(URL.createObjectURL(file));
  };

  const handleCropCancel = () => {
    if (pendingCropImage) URL.revokeObjectURL(pendingCropImage);
    setPendingCropImage(null);
  };

  const handleCropConfirm = (croppedImageUrl: string) => {
    if (pendingCropImage) URL.revokeObjectURL(pendingCropImage);
    setPendingCropImage(null);
    replaceSelectedImage({ type: "user", src: croppedImageUrl });
  };

  const handleProvidedImageToggle = (checked: boolean) => {
    replaceSelectedImage(
      checked ? { type: "default", src: getRandomBrandImage().src } : null
    );
  };

  return {
    selectedImage,
    pendingCropImage,
    handleFileSelected,
    handleCropCancel,
    handleCropConfirm,
    handleProvidedImageToggle,
  };
};
