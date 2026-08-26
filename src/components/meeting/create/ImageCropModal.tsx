"use client";

import { useCallback, useState, useEffect } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";

import { IcArrowBack, IcFlip, IcRotateLeft } from "@/components/icons";
import { cn } from "@/lib/utils";
import { cropImageToBlobUrl, flipImageHorizontally } from "@/utils/image-crop";

export interface ImageCropModalProps {
  imageSrc: string;
  onCancel: () => void;
  onConfirm: (croppedImageUrl: string) => void;
}

export const ImageCropModal = ({
  imageSrc,
  onCancel,
  onConfirm,
}: ImageCropModalProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [cropSize, setCropSize] = useState<{ width: number; height: number }>();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedImageSrc, setFlippedImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const displaySrc = isFlipped && flippedImageSrc ? flippedImageSrc : imageSrc;

  useEffect(() => {
    const updateCropSize = () => {
      const currentModalWidth = Math.min(window.innerWidth, 448);
      const calculatedSize = currentModalWidth - 20;

      setCropSize({ width: calculatedSize, height: calculatedSize });
    };

    updateCropSize();
    window.addEventListener("resize", updateCropSize);
    return () => window.removeEventListener("resize", updateCropSize);
  }, []);

  const handleCropComplete = useCallback(
    (_croppedArea: Area, areaPixels: Area) => {
      setCroppedAreaPixels(areaPixels);
    },
    []
  );

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  const handleFlip = async () => {
    if (!flippedImageSrc) {
      setFlippedImageSrc(await flipImageHorizontally(imageSrc));
    }
    setIsFlipped((prev) => !prev);
  };

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    const croppedUrl = await cropImageToBlobUrl(
      displaySrc,
      croppedAreaPixels,
      rotation
    );
    onConfirm(croppedUrl);
  };

  return (
    <div
      data-testid="image-crop-modal"
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col bg-black"
    >
      <style>{`
        .custom-crop-area-corners::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          height: 19px;
          pointer-events: none;
          z-index: 10;
          background:
            linear-gradient(#ffffff, #ffffff) top left / 19px 4px no-repeat,
            linear-gradient(#ffffff, #ffffff) top left / 4px 19px no-repeat,
            linear-gradient(#ffffff, #ffffff) top right / 19px 4px no-repeat,
            linear-gradient(#ffffff, #ffffff) top right / 4px 19px no-repeat;
        }

        .custom-crop-area-corners::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: -4px;
          right: -4px;
          height: 19px;
          pointer-events: none;
          z-index: 10;
          background:
            linear-gradient(#ffffff, #ffffff) bottom left / 19px 4px no-repeat,
            linear-gradient(#ffffff, #ffffff) bottom left / 4px 19px no-repeat,
            linear-gradient(#ffffff, #ffffff) bottom right / 19px 4px no-repeat,
            linear-gradient(#ffffff, #ffffff) bottom right / 4px 19px no-repeat;
        }
      `}</style>

      <div className="flex items-center justify-between px-4 py-5">
        <button type="button" onClick={onCancel} aria-label="취소">
          <IcArrowBack size={24} className="text-white" />
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!croppedAreaPixels}
          className="body2 text-white disabled:opacity-40"
        >
          확인
        </button>
      </div>

      <div className="relative mx-2 flex-1">
        <Cropper
          image={displaySrc}
          crop={crop}
          cropSize={cropSize}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          cropShape="rect"
          showGrid={false}
          objectFit="contain"
          restrictPosition={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
          style={{
            cropAreaStyle: {
              border: "2px solid #BCBCBC",
              overflow: "visible",
            },
          }}
          classes={{
            cropAreaClassName: "custom-crop-area-corners",
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-9 pt-10 pb-10">
        <span className="body2 rounded-pill bg-white px-3 py-1 text-black">
          1:1
        </span>

        <div className="flex items-center justify-center gap-11">
          <button
            type="button"
            onClick={handleFlip}
            aria-label="좌우 반전"
            aria-pressed={isFlipped}
          >
            <IcFlip
              size={24}
              className={cn("text-white", isFlipped && "text-primary-normal")}
            />
          </button>
          <button
            type="button"
            onClick={handleRotateLeft}
            aria-label="왼쪽으로 90도 회전"
          >
            <IcRotateLeft size={24} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
