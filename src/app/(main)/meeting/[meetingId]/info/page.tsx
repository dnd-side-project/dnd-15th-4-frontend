"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { meetingKeys } from "@/apis/meeting/keys";
import { AlertModal } from "@/components/common/AlertModal";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { DoubleButton } from "@/components/common/DoubleButton";
import { Header } from "@/components/common/Header";
import { InfoBanner } from "@/components/common/InfoBanner";
import { Input } from "@/components/common/Input";
import { ErrorScreen } from "@/components/common/ErrorScreen";
import { InputLayout } from "@/components/common/InputLayout";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { PlaceMarker } from "@/components/common/PlaceMarker";
import { PlaceSearchTrigger } from "@/components/common/PlaceSearchTrigger";
import { Toast } from "@/components/common/Toast";
import { ToggleField } from "@/components/common/ToggleField";
import { DateSelectModal } from "@/components/meeting/create/DateSelectModal";
import { DateTimeTrigger } from "@/components/meeting/create/DateTimeTrigger";
import { ImageCropModal } from "@/components/meeting/create/ImageCropModal";
import { ImageUploadBox } from "@/components/meeting/create/ImageUploadBox";
import { InviteCodeField } from "@/components/meeting/create/InviteCodeField";
import { PlaceSearchModal } from "@/components/meeting/create/PlaceSearchModal";
import { TimeSelectModal } from "@/components/meeting/create/TimeSelectModal";
import { MeetingMap } from "@/components/meeting/progress/MeetingMap";
import { ParticipantAvatar } from "@/components/meeting/shared/ParticipantAvatar";
import {
  MEMO_MAX_LENGTH,
  NICKNAME_MAX_LENGTH,
  TITLE_MAX_LENGTH,
} from "@/constants/validation";
import { useDateTimeSelection } from "@/hooks/meeting/create/useDateTimeSelection";
import {
  useDeleteMeetingMutation,
  useMeetingDetailQuery,
  useUpdateMeetingMutation,
  useUpdateMemberNicknameMutation,
  useUpdateMemberPuzzleImageMutation,
} from "@/hooks/meeting/detail/useMeetingDetail";
import { useLeaveMeetingMutation } from "@/hooks/meeting/participate/useLeaveMeeting";
import { useMeetingImageSelection } from "@/hooks/meeting/shared/useMeetingImageSelection";
import { useMeetingsQuery } from "@/hooks/meeting/shared/useMeetings";
import { useToast } from "@/hooks/common/useToast";
import { useAuthStore } from "@/stores/useAuthStore";
import type {
  MeetingDetailResponse,
  MeetingMemberNicknameUpdateResponse,
  MeetingMemberPuzzleImageUpdateResponse,
  MeetingUpdateRequest,
} from "@/types/meeting";
import type { SelectedPlace } from "@/types/place";
import { formatDateTimeForApi, formatMeetingDateTime } from "@/utils/date";
import { meetingImageSelectionToFile } from "@/utils/file";
import { checkIsHost } from "@/utils/participant";
import { cn } from "@/lib/utils";

const MeetingInfoPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { meetingId } = useParams<{ meetingId: string }>();
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?.id;
  const numericMeetingId = Number(meetingId);

  const [nicknameParticipation, setNicknameParticipation] = useState(false);
  const [nickname, setNickname] = useState("");
  const [originalNicknameSet, setOriginalNicknameSet] = useState(false);
  const [originalImageSet, setOriginalImageSet] = useState(false);
  const [hasSyncedInitialValues, setHasSyncedInitialValues] = useState(false);

  const { data: meeting, isLoading } = useMeetingDetailQuery(numericMeetingId);
  const { data: allMeetings = [] } = useMeetingsQuery();

  const updateMeetingMutation = useUpdateMeetingMutation(numericMeetingId);
  const deleteMeetingMutation = useDeleteMeetingMutation(numericMeetingId);
  const leaveMeetingMutation = useLeaveMeetingMutation(numericMeetingId);
  const updateNicknameMutation =
    useUpdateMemberNicknameMutation(numericMeetingId);
  const updatePuzzleImageMutation =
    useUpdateMemberPuzzleImageMutation(numericMeetingId);

  const {
    selectedImage,
    pendingCropImage,
    handleFileSelected,
    handleCropCancel,
    handleCropConfirm,
    handleProvidedImageToggle,
    resetImage,
  } = useMeetingImageSelection();
  const [hasClearedProvidedImage, setHasClearedProvidedImage] = useState(false);

  const [title, setTitle] = useState("");

  const dateTimeSelection = useDateTimeSelection();

  const [place, setPlace] = useState<SelectedPlace | null>(null);
  const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);

  const [memo, setMemo] = useState("");

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const { toastMessage, showToast } = useToast();

  useEffect(() => {
    if (hasSyncedInitialValues || !meeting || !user) return;

    setTitle(meeting.title);
    setMemo(meeting.memo ?? "");

    const myParticipant = meeting.participants.find(
      (participant) => participant.id === user.id
    );

    if (myParticipant) {
      const initialNicknameSet = Boolean(myParticipant.nicknameSet);

      setOriginalNicknameSet(initialNicknameSet);
      setOriginalImageSet(Boolean(myParticipant.imageSet));

      setNicknameParticipation(initialNicknameSet);
      setNickname(initialNicknameSet ? (myParticipant.name ?? "") : "");
    }
    setHasSyncedInitialValues(true);
  }, [hasSyncedInitialValues, meeting, user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!meeting) {
    return <ErrorScreen title={"약속 정보를\n찾을 수 없어요"} />;
  }

  const hostId = meeting.participants[0]?.id;
  const isHost = checkIsHost(hostId, currentUserId);
  const myParticipant = meeting.participants.find(
    (participant) => participant.id === currentUserId
  );

  const { dateFormatted, timeFormatted } = formatMeetingDateTime(
    meeting.dateTime
  );

  const sortedParticipants = [...meeting.participants].sort((a, b) => {
    if (a.id === currentUserId) return -1;
    if (b.id === currentUserId) return 1;
    return 0;
  });

  const otherMeetings = allMeetings.filter(
    (item) => item.meetingId !== numericMeetingId
  );

  const displayDateTime =
    dateTimeSelection.dateTime ?? new Date(meeting.dateTime);
  const displayPlace: SelectedPlace = place ?? {
    placeName: meeting.place,
    addressName: meeting.place,
    latitude: meeting.latitude,
    longitude: meeting.longitude,
  };
  const isProvidedImageChecked = selectedImage
    ? selectedImage.type === "default"
    : !hasClearedProvidedImage && originalImageSet;
  const displayImage =
    selectedImage ??
    (!hasClearedProvidedImage && myParticipant?.puzzleImageUrl
      ? {
          type: originalImageSet ? ("default" as const) : ("user" as const),
          src: myParticipant.puzzleImageUrl,
        }
      : null);

  const originalNickname = myParticipant?.name ?? "";

  const isTitleChanged = hasSyncedInitialValues && title !== meeting.title;
  const isDateTimeChanged =
    dateTimeSelection.dateTime !== null &&
    dateTimeSelection.dateTime.getTime() !==
      new Date(meeting.dateTime).getTime();
  const isPlaceChanged =
    place !== null &&
    (place.placeName !== meeting.place ||
      place.latitude !== meeting.latitude ||
      place.longitude !== meeting.longitude);
  const isMemoChanged = hasSyncedInitialValues && memo !== (meeting.memo ?? "");

  const isImageChanged =
    selectedImage !== null ||
    hasClearedProvidedImage ||
    isProvidedImageChecked !== originalImageSet;
  const isNicknameSetChanged = nicknameParticipation !== originalNicknameSet;
  const isNicknameTextChanged =
    nicknameParticipation && nickname.trim() !== originalNickname;
  const isNicknameChanged = isNicknameSetChanged || isNicknameTextChanged;

  const isMeetingFieldsChanged =
    isTitleChanged || isDateTimeChanged || isPlaceChanged || isMemoChanged;
  const isPersonalFieldsChanged = isImageChanged || isNicknameChanged;
  const isAnyFieldChanged = isHost
    ? isMeetingFieldsChanged || isPersonalFieldsChanged
    : isPersonalFieldsChanged;
  const isSaving =
    updateMeetingMutation.isPending ||
    updateNicknameMutation.isPending ||
    updatePuzzleImageMutation.isPending;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };

  const handleSaveChanges = async () => {
    setIsSaveConfirmOpen(false);

    if (!isAnyFieldChanged) {
      router.back();
      return;
    }

    try {
      let nicknameResult: MeetingMemberNicknameUpdateResponse | undefined;
      let imageResult: MeetingMemberPuzzleImageUpdateResponse | undefined;
      const tasks: Promise<void>[] = [];

      if (isHost && isMeetingFieldsChanged) {
        const request: MeetingUpdateRequest = {};
        if (isTitleChanged) request.title = title;
        if (isDateTimeChanged) {
          request.dateTime = formatDateTimeForApi(displayDateTime);
        }
        if (isPlaceChanged) {
          request.destination = displayPlace.placeName;
          request.latitude = displayPlace.latitude;
          request.longitude = displayPlace.longitude;
        }
        if (isMemoChanged) request.memo = memo;
        tasks.push(
          updateMeetingMutation.mutateAsync(request).then(() => undefined)
        );
      }

      if (isNicknameChanged) {
        const targetNickname = nicknameParticipation
          ? nickname.trim()
          : (user?.nickname ?? "");

        tasks.push(
          updateNicknameMutation
            .mutateAsync({
              nickname: targetNickname,
              nicknameSet: nicknameParticipation,
            })
            .then((result) => {
              nicknameResult = result;
            })
        );
      }

      if (selectedImage) {
        const imageFile = await meetingImageSelectionToFile(
          selectedImage,
          "puzzle-image.jpg"
        );
        const imageSet = selectedImage.type === "default";
        tasks.push(
          updatePuzzleImageMutation
            .mutateAsync({ image: imageFile, imageSet })
            .then((result) => {
              imageResult = result;
            })
        );
      }

      await Promise.all(tasks);

      if (nicknameResult) setOriginalNicknameSet(nicknameResult.nicknameSet);
      if (imageResult) setOriginalImageSet(imageResult.imageSet);

      queryClient.setQueryData<MeetingDetailResponse>(
        meetingKeys.fullDetail(numericMeetingId),
        (old) => {
          if (!old) return old;

          const next: MeetingDetailResponse = { ...old };

          if (isHost && isMeetingFieldsChanged) {
            if (isTitleChanged) next.title = title;
            if (isDateTimeChanged) {
              next.dateTime = formatDateTimeForApi(displayDateTime);
            }
            if (isPlaceChanged) {
              next.place = displayPlace.placeName;
              next.latitude = displayPlace.latitude;
              next.longitude = displayPlace.longitude;
            }
            if (isMemoChanged) next.memo = memo;
          }

          if (nicknameResult || imageResult) {
            next.participants = next.participants.map((participant) =>
              participant.id === currentUserId
                ? {
                    ...participant,
                    ...(nicknameResult && {
                      name: nicknameResult.nickname,
                      nicknameSet: nicknameResult.nicknameSet,
                    }),
                    ...(imageResult && {
                      puzzleImageUrl: imageResult.imageUrl,
                      imageSet: imageResult.imageSet,
                    }),
                  }
                : participant
            );
          }

          return next;
        }
      );

      await queryClient.invalidateQueries({
        queryKey: meetingKeys.fullDetail(numericMeetingId),
      });

      resetImage();
      setHasClearedProvidedImage(false);

      showToast("수정이 완료되었습니다");
    } catch {
      setActionError("약속 정보 저장에 실패했어요. 다시 시도해주세요.");
    }
  };

  const handleSavePress = () => {
    if (isHost && isMeetingFieldsChanged) {
      setIsSaveConfirmOpen(true);
      return;
    }
    handleSaveChanges();
  };

  const handleConfirmDelete = () => {
    setIsDeleteConfirmOpen(false);
    deleteMeetingMutation.mutate(undefined, {
      onSuccess: () => router.push("/home"),
      onError: () =>
        setActionError("약속 삭제에 실패했어요. 다시 시도해주세요."),
    });
  };

  const handleConfirmLeave = () => {
    setIsLeaveConfirmOpen(false);
    leaveMeetingMutation.mutate(undefined, {
      onSuccess: () => router.push("/home"),
      onError: () =>
        setActionError("약속 불참 처리에 실패했어요. 다시 시도해주세요."),
    });
  };

  return (
    <div className="min-h-dvh bg-white pb-32">
      <Header
        title="약속 정보"
        onBack={() => router.back()}
        className="sticky top-0 z-10 bg-white"
      />

      <main className="flex flex-col items-center gap-7 px-4 pt-2">
        <ImageUploadBox
          selectedImage={displayImage}
          onFileSelected={(file) => {
            setHasClearedProvidedImage(false);
            handleFileSelected(file);
          }}
        />

        <div className="flex w-full flex-col gap-6">
          <ToggleField
            label="제공 이미지로 참여"
            isBold={true}
            checked={isProvidedImageChecked}
            onCheckedChange={(checked) => {
              setHasClearedProvidedImage(!checked);
              handleProvidedImageToggle(checked);
            }}
          />

          <div className="flex w-full flex-col gap-3">
            <ToggleField
              label="닉네임으로 참여"
              isBold={true}
              checked={nicknameParticipation}
              onCheckedChange={(checked) => {
                setNicknameParticipation(checked);
                setNickname(
                  checked ? (originalNicknameSet ? originalNickname : "") : ""
                );
              }}
            />
            {nicknameParticipation && (
              <Input
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                maxLength={NICKNAME_MAX_LENGTH}
                placeholder="닉네임을 입력하세요"
              />
            )}
            <InfoBanner text="닉네임 비활성시에 카카오 계정에 등록된 이름으로 참여합니다" />
          </div>

          {isHost ? (
            <Input
              label="약속 이름"
              value={title}
              onChange={handleTitleChange}
              maxLength={TITLE_MAX_LENGTH}
              placeholder="약속 이름"
            />
          ) : (
            <InputLayout label="약속 이름">
              <span className="body3 text-primary wrap-break-word break-keep">
                {meeting.title}
              </span>
            </InputLayout>
          )}

          {isHost ? (
            <DateTimeTrigger
              label="날짜 / 시간"
              value={displayDateTime}
              placeholder="약속 날짜와 시간을 설정하세요"
              onClick={dateTimeSelection.open}
            />
          ) : (
            <InputLayout label="날짜 / 시간">
              <span className="body3 text-primary">
                {dateFormatted} {timeFormatted}
              </span>
            </InputLayout>
          )}

          <div className="flex w-full flex-col gap-3">
            {isHost ? (
              <PlaceSearchTrigger
                label="장소"
                place={displayPlace}
                placeholder="장소, 지역, 주소를 검색하세요"
                onClick={() => setIsPlaceSearchOpen(true)}
              />
            ) : (
              <InputLayout label="장소">
                <span className="body3 text-primary break-all">
                  {meeting.place}
                </span>
              </InputLayout>
            )}
            <div className="rounded-16 h-32 w-full overflow-hidden">
              <MeetingMap
                key={`${displayPlace.latitude}:${displayPlace.longitude}`}
                center={{
                  lat: displayPlace.latitude,
                  lng: displayPlace.longitude,
                }}
                zoom={16}
                className="size-full"
              >
                <PlaceMarker
                  position={{
                    lat: displayPlace.latitude,
                    lng: displayPlace.longitude,
                  }}
                  placeName={displayPlace.placeName}
                />
              </MeetingMap>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <h2 className="h4 text-primary font-bold">
              참여자 목록 ({meeting.currentParticipantCount}/{meeting.capacity})
            </h2>
            <div className="flex flex-wrap gap-4">
              {sortedParticipants.map((participant) => (
                <ParticipantAvatar
                  key={participant.id}
                  participant={participant}
                  hostId={hostId}
                  myId={currentUserId}
                />
              ))}
            </div>
          </div>

          {isHost ? (
            <Input
              label="메모"
              value={memo}
              onChange={handleMemoChange}
              maxLength={MEMO_MAX_LENGTH}
              placeholder="메모를 남겨보세요"
            />
          ) : (
            <InputLayout label="메모">
              <span
                className={cn(
                  "body3",
                  meeting.memo ? "text-primary" : "text-disable"
                )}
              >
                {meeting.memo || "등록된 메모가 없어요"}
              </span>
            </InputLayout>
          )}

          <InviteCodeField inviteCode={meeting.inviteCode} />
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-md bg-white px-4 pt-4 pb-3">
        <DoubleButton
          secondaryLabel={isHost ? "약속 삭제" : "불참하기"}
          onSecondaryClick={() =>
            isHost ? setIsDeleteConfirmOpen(true) : setIsLeaveConfirmOpen(true)
          }
          isSecondaryDisabled={
            isHost
              ? deleteMeetingMutation.isPending
              : leaveMeetingMutation.isPending
          }
          primaryLabel={isSaving ? "저장 중..." : "수정 저장"}
          onPrimaryClick={handleSavePress}
          isPrimaryDisabled={!isAnyFieldChanged || isSaving}
          secondaryClassName="text-red"
        />
      </div>

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

      {dateTimeSelection.step === "date" && (
        <DateSelectModal
          initialDate={dateTimeSelection.pendingDate ?? displayDateTime}
          meetings={otherMeetings}
          onConfirm={dateTimeSelection.handleDateConfirm}
          onClose={dateTimeSelection.close}
        />
      )}

      {dateTimeSelection.step === "time" && dateTimeSelection.pendingDate && (
        <TimeSelectModal
          date={dateTimeSelection.pendingDate}
          meetings={otherMeetings}
          initialHour={displayDateTime.getHours()}
          initialMinute={displayDateTime.getMinutes()}
          onConfirm={dateTimeSelection.handleTimeConfirm}
          onClose={dateTimeSelection.close}
        />
      )}

      {isDeleteConfirmOpen && (
        <ConfirmModal
          title="약속을 삭제할까요?"
          description={
            "삭제하면 약속 정보가 모두 사라지고,\n다른 참여자들에게도 삭제된 것으로 표시돼요."
          }
          cancelLabel="취소"
          confirmLabel="삭제"
          onCancel={() => setIsDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isLeaveConfirmOpen && (
        <ConfirmModal
          title="이 약속에 불참할까요?"
          description={
            "불참하시면 참여자 목록에서 제외되고,\n약속 정보는 그대로 유지돼요."
          }
          cancelLabel="취소"
          confirmLabel="불참하기"
          onCancel={() => setIsLeaveConfirmOpen(false)}
          onConfirm={handleConfirmLeave}
        />
      )}

      {isSaveConfirmOpen && (
        <ConfirmModal
          title="약속 장소를 변경합니다"
          description={"초대된 다른 참여자들에게도\n변경된 장소가 적용됩니다"}
          cancelLabel="취소"
          confirmLabel="완료"
          onCancel={() => setIsSaveConfirmOpen(false)}
          onConfirm={handleSaveChanges}
        />
      )}

      {actionError && (
        <AlertModal
          message={actionError}
          onConfirm={() => setActionError(null)}
        />
      )}

      {toastMessage && <Toast message={toastMessage} position="top" />}
    </div>
  );
};

export default MeetingInfoPage;
