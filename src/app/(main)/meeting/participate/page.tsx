"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AlertModal } from "@/components/common/AlertModal";
import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { Input } from "@/components/common/Input";
import { InfoBanner } from "@/components/common/InfoBanner";
import { ToggleField } from "@/components/common/ToggleField";
import { ImageCropModal } from "@/components/meeting/create/ImageCropModal";
import { ImageUploadBox } from "@/components/meeting/create/ImageUploadBox";
import { useJoinMeetingMutation } from "@/hooks/meeting/participate/useJoinMeeting";
import { useMeetingImageSelection } from "@/hooks/meeting/shared/useMeetingImageSelection";
import { HttpError } from "@/lib/api/http-error";
import { urlToFile } from "@/utils/file";

const DEFAULT_JOIN_ERROR_MESSAGE = "약속 참여에 실패했어요. 다시 시도해주세요.";
const INVALID_REQUEST_MESSAGE = "올바르지 않은 요청입니다.";

const getJoinErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError && error.status === 400) {
    const data = error.data as { message?: string } | null;
    return data?.message || INVALID_REQUEST_MESSAGE;
  }
  return DEFAULT_JOIN_ERROR_MESSAGE;
};

export default function MeetingParticipatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("code")?.trim() ?? "";

  const {
    selectedImage,
    pendingCropImage,
    handleFileSelected,
    handleCropCancel,
    handleCropConfirm,
    handleProvidedImageToggle,
  } = useMeetingImageSelection();
  const [nicknameParticipation, setNicknameParticipation] = useState(false);
  const [nickname, setNickname] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const joinMeetingMutation = useJoinMeetingMutation();

  useEffect(() => {
    if (!inviteCode) router.replace("/home");
  }, [inviteCode, router]);

  const isNicknameValid = !nicknameParticipation || nickname.trim().length > 0;

  const canSubmit = selectedImage !== null && isNicknameValid;

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting || joinMeetingMutation.isPending) return;

    setIsSubmitting(true);

    try {
      const image = await urlToFile(selectedImage.src, "meeting-image.jpg");

      joinMeetingMutation.mutate(
        {
          request: {
            inviteCode,
            nickname:
              nicknameParticipation && nickname.trim() ? nickname.trim() : null,
            nicknameSet: nicknameParticipation,
            imageSet: selectedImage.type === "default",
          },
          image,
        },
        {
          onSuccess: () => {
            router.push(`/home`);
          },
          onError: (error) => {
            setSubmitError(getJoinErrorMessage(error));
            setIsSubmitting(false);
          },
        }
      );
    } catch {
      setSubmitError(DEFAULT_JOIN_ERROR_MESSAGE);
      setIsSubmitting(false);
    }
  };

  if (!inviteCode) return null;

  return (
    <div className="relative min-h-dvh bg-white">
      <Header
        title="약속 사전 설정"
        onBack={() => router.back()}
        className="sticky top-0 z-10 bg-white"
      />

      <main className="flex flex-col items-center gap-7 px-4 pt-2 pb-32">
        <InfoBanner text="다 같이 사진 올리면, 그 중 하나를 사진퍼즐로 맞출 수 있어요!" />

        <ImageUploadBox
          selectedImage={selectedImage}
          onFileSelected={handleFileSelected}
        />

        <div className="flex w-full flex-col gap-6">
          <ToggleField
            label="제공 이미지로 참여"
            isBold={true}
            checked={selectedImage?.type === "default"}
            onCheckedChange={handleProvidedImageToggle}
          />

          <div className="flex w-full flex-col gap-3">
            <ToggleField
              label="닉네임으로 참여"
              isBold={true}
              checked={nicknameParticipation}
              onCheckedChange={(checked) => {
                setNicknameParticipation(checked);
                if (!checked) setNickname("");
              }}
            />
            {nicknameParticipation && (
              <Input
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                maxLength={5}
                placeholder="닉네임을 입력하세요"
              />
            )}
            <InfoBanner text="닉네임 비활성시에 카카오 계정에 등록된 이름으로 참여합니다" />
          </div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-md bg-white px-4 pt-4 pb-8">
        <Button
          type="button"
          disabled={!canSubmit || isSubmitting || joinMeetingMutation.isPending}
          onClick={handleSubmit}
          className={
            canSubmit
              ? "bg-sub2-normal hover:bg-sub2-normal-hover"
              : "bg-disable"
          }
        >
          {joinMeetingMutation.isPending ? "참여하는 중..." : "확인"}
        </Button>
      </div>

      {submitError && (
        <AlertModal
          message={submitError}
          onConfirm={() => setSubmitError(null)}
        />
      )}

      {pendingCropImage && (
        <ImageCropModal
          imageSrc={pendingCropImage}
          onCancel={handleCropCancel}
          onConfirm={handleCropConfirm}
        />
      )}
    </div>
  );
}
