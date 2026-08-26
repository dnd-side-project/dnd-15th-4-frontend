"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AlertModal } from "@/components/common/AlertModal";
import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { InfoBanner } from "@/components/common/InfoBanner";
import { Input } from "@/components/common/Input";
import { PlaceMarker } from "@/components/common/PlaceMarker";
import { PlaceSearchTrigger } from "@/components/common/PlaceSearchTrigger";
import { ToggleField } from "@/components/common/ToggleField";
import { CapacityField } from "@/components/meeting/create/CapacityField";
import { CapacityPickerModal } from "@/components/meeting/create/CapacityPickerModal";
import { DateTimeTrigger } from "@/components/meeting/create/DateTimeTrigger";
import { DateSelectModal } from "@/components/meeting/create/DateSelectModal";
import { ImageCropModal } from "@/components/meeting/create/ImageCropModal";
import { ImageUploadBox } from "@/components/meeting/create/ImageUploadBox";
import { PlaceSearchModal } from "@/components/meeting/create/PlaceSearchModal";
import { TimeSelectModal } from "@/components/meeting/create/TimeSelectModal";
import { MeetingMap } from "@/components/meeting/progress/MeetingMap";
import { useCapacitySelection } from "@/hooks/meeting/create/useCapacitySelection";
import { useCreateMeetingMutation } from "@/hooks/meeting/create/useCreateMeeting";
import { useDateTimeSelection } from "@/hooks/meeting/create/useDateTimeSelection";
import { useMeetingImageSelection } from "@/hooks/meeting/shared/useMeetingImageSelection";
import { useMeetingsQuery } from "@/hooks/meeting/shared/useMeetings";
import { formatDateTimeForApi } from "@/utils/date";
import { urlToFile } from "@/utils/file";

import type { MeetingCreateRequest } from "@/types/meeting";
import type { SelectedPlace } from "@/types/place";

const DEFAULT_CREATE_ERROR_MESSAGE =
  "약속방 생성에 실패했어요. 다시 시도해주세요.";

export default function CreateMeetingPage() {
  const router = useRouter();

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
  const [title, setTitle] = useState("");
  const dateTimeSelection = useDateTimeSelection();
  const [place, setPlace] = useState<SelectedPlace | null>(null);
  const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);
  const capacitySelection = useCapacitySelection();
  const [memo, setMemo] = useState("");
  const [notifyLocation, setNotifyLocation] = useState(false);
  const [notifyFriendArrival, setNotifyFriendArrival] = useState(false);
  const [notifySpeechBubble, setNotifySpeechBubble] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMeetingMutation = useCreateMeetingMutation();
  const { data: existingMeetings = [] } = useMeetingsQuery();

  useEffect(() => {
    document.documentElement.classList.add("scrollbar-none");
    document.body.classList.add("scrollbar-none");
    return () => {
      document.documentElement.classList.remove("scrollbar-none");
      document.body.classList.remove("scrollbar-none");
    };
  }, []);

  const isNicknameValid = !nicknameParticipation || nickname.trim().length > 0;
  const isCapacitySelected =
    capacitySelection.capacity !== null && capacitySelection.capacity > 0;

  const canSubmit =
    selectedImage !== null &&
    title.trim().length > 0 &&
    dateTimeSelection.dateTime !== null &&
    place !== null &&
    isCapacitySelected &&
    isNicknameValid;

  const handleSubmit = async () => {
    if (
      !canSubmit ||
      isSubmitting ||
      createMeetingMutation.isPending ||
      !selectedImage ||
      !dateTimeSelection.dateTime ||
      !place ||
      !capacitySelection.capacity
    )
      return;

    setIsSubmitting(true);

    try {
      const request: MeetingCreateRequest = {
        title: title.trim(),
        dateTime: formatDateTimeForApi(dateTimeSelection.dateTime),
        destination: place.placeName,
        latitude: place.latitude,
        longitude: place.longitude,
        capacity: capacitySelection.capacity,
        memo: memo.trim() || null,
        nickname:
          nicknameParticipation && nickname.trim() ? nickname.trim() : null,
        nicknameSet: nicknameParticipation,
        imageSet: selectedImage.type === "default",
      };

      const image = await urlToFile(selectedImage.src, "meeting-image.jpg");

      createMeetingMutation.mutate(
        { request, image },
        {
          onSuccess: ({ meetingId }) => {
            router.push(
              `/meeting/${meetingId}/success?capacity=${capacitySelection.capacity}`
            );
          },
          onError: (error) => {
            const message =
              error instanceof Error
                ? error.message
                : DEFAULT_CREATE_ERROR_MESSAGE;
            setSubmitError(message || DEFAULT_CREATE_ERROR_MESSAGE);
            setIsSubmitting(false);
          },
        }
      );
    } catch {
      setSubmitError(DEFAULT_CREATE_ERROR_MESSAGE);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-dvh bg-white">
      <Header
        title="약속방 만들기"
        onBack={() => router.back()}
        className="sticky top-0 z-10 bg-white"
      />

      <main className="flex flex-col items-center gap-7 px-4 pt-2 pb-32">
        <InfoBanner text="다 같이 사진 올리면, 그 중 랜덤으로 퍼즐을 맞출 수 있어요!" />

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

          <div className="flex w-full flex-col gap-6">
            <Input
              label="약속 이름"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={12}
              placeholder="약속 이름을 입력하세요"
            />
            <DateTimeTrigger
              label="날짜 / 시간"
              value={dateTimeSelection.dateTime}
              placeholder="약속 날짜와 시간을 설정하세요"
              onClick={dateTimeSelection.open}
            />
            <PlaceSearchTrigger
              label="장소"
              place={place}
              placeholder="장소, 지역, 주소를 검색하세요"
              onClick={() => setIsPlaceSearchOpen(true)}
            />
            {place && (
              <div className="rounded-16 h-32 w-full overflow-hidden">
                <MeetingMap
                  key={`${place.latitude}:${place.longitude}`}
                  center={{ lat: place.latitude, lng: place.longitude }}
                  zoom={16}
                  className="size-full"
                >
                  <PlaceMarker
                    position={{ lat: place.latitude, lng: place.longitude }}
                  />
                </MeetingMap>
              </div>
            )}
            <CapacityField
              label="참여 인원"
              value={capacitySelection.capacity}
              placeholder="참여 인원을 설정하세요"
              onClick={capacitySelection.open}
            />
            <Input
              label="메모"
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
              maxLength={12}
              placeholder="메모를 남겨보세요"
            />
          </div>

          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="h4 text-primary">알림 설정</h2>
              <InfoBanner text="출발하면 설정된 내 도착 상황을 친구들에게 공유할게요" />
            </div>

            <div className="flex w-full flex-col gap-6">
              <ToggleField
                label="위치권한"
                checked={notifyLocation}
                onCheckedChange={setNotifyLocation}
              />
              <ToggleField
                label="친구도착"
                checked={notifyFriendArrival}
                onCheckedChange={setNotifyFriendArrival}
              />
              <ToggleField
                label="말풍선"
                checked={notifySpeechBubble}
                onCheckedChange={setNotifySpeechBubble}
              />
            </div>
          </div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-md bg-white px-4 pt-4 pb-3">
        <Button
          type="button"
          disabled={
            !canSubmit || isSubmitting || createMeetingMutation.isPending
          }
          onClick={handleSubmit}
          className={
            canSubmit
              ? "bg-sub2-normal hover:bg-sub2-normal-hover"
              : "bg-disable"
          }
        >
          {createMeetingMutation.isPending ? "만드는 중..." : "약속방 만들기"}
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

      {isPlaceSearchOpen && (
        <PlaceSearchModal
          onClose={() => setIsPlaceSearchOpen(false)}
          onSelect={(selected) => {
            setPlace(selected);
            setIsPlaceSearchOpen(false);
          }}
        />
      )}

      {capacitySelection.isOpen && (
        <CapacityPickerModal
          value={capacitySelection.capacity ?? 4}
          onConfirm={capacitySelection.handleConfirm}
          onClose={capacitySelection.close}
        />
      )}

      {dateTimeSelection.step === "date" && (
        <DateSelectModal
          initialDate={
            dateTimeSelection.pendingDate ?? dateTimeSelection.dateTime
          }
          meetings={existingMeetings}
          onConfirm={dateTimeSelection.handleDateConfirm}
          onClose={dateTimeSelection.close}
        />
      )}

      {dateTimeSelection.step === "time" && dateTimeSelection.pendingDate && (
        <TimeSelectModal
          date={dateTimeSelection.pendingDate}
          meetings={existingMeetings}
          initialHour={dateTimeSelection.dateTime?.getHours()}
          initialMinute={dateTimeSelection.dateTime?.getMinutes()}
          onConfirm={dateTimeSelection.handleTimeConfirm}
          onClose={dateTimeSelection.close}
        />
      )}
    </div>
  );
}
