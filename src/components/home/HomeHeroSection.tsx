"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import heroEmptyImage from "@/assets/images/home-empty-hero.png";
import heroProcessImage from "@/assets/images/home-process-hero.png";

import { AvatarStack } from "@/components/home/AvatarStack";
import { IcProfile } from "@/components/icons/IcProfile";
import { IcArrivalDot, IcPuzzlePiece } from "@/components/icons";
import { useParticipantLocationsQuery } from "@/hooks/meeting/shared/useParticipantLocations";
import { MOCK_PARTICIPANT_LOCATIONS } from "@/mocks/mockParticipantLocations";
import type { MeetingData, Participant, UserLocation } from "@/types/meeting";
import { formatMeetingDateTime } from "@/utils/date";
import {
  calculateParticipantProgress,
  groupOverlappingMarkers,
} from "@/utils/meeting-progress";
import { getUserPuzzleAppearance } from "@/utils/puzzle-shape";

interface HomeHeroSectionProps {
  meeting?: MeetingData | null;
}

interface ProgressTrackProps {
  meetingId: number;
  participants: Participant[];
  destination: UserLocation;
  locationsByUserId: Map<number, UserLocation>;
}

const ProgressTrack = ({
  meetingId,
  participants,
  destination,
  locationsByUserId,
}: ProgressTrackProps) => {
  const movingMarkers = participants.flatMap((participant) => {
    const currentLocation = locationsByUserId.get(participant.id);
    if (!currentLocation) return [];

    const totalDistance =
      MOCK_PARTICIPANT_LOCATIONS[meetingId]?.[participant.id]?.totalDistance ??
      1000;
    const { percent, isArrived } = calculateParticipantProgress(
      currentLocation,
      destination,
      totalDistance
    );
    if (isArrived) return [];

    return [{ item: participant, percent }];
  });

  const groups = groupOverlappingMarkers(movingMarkers);

  return (
    <div className="relative h-14 w-full">
      <div className="bg-primary-light absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 rounded-full" />

      <div className="absolute top-1/2 right-5 flex flex-col items-center">
        <div className="text-primary-normal -translate-y-1/2">
          <IcArrivalDot />
        </div>

        <span className="body7 text-primary/71 absolute top-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
          도착
        </span>
      </div>

      {groups.map((group) => {
        const [primary, ...rest] = group.items;
        const { shape, isPrimaryColor } = getUserPuzzleAppearance(primary.id);
        const label =
          rest.length > 0 ? `${primary.name} 외${rest.length}` : primary.name;
        const visualPercent = Math.min(92, Math.max(8, group.percent));

        return (
          <div
            key={primary.id}
            style={{ left: `${visualPercent}%` }}
            className="absolute top-1/2 flex -translate-x-1/2 flex-col items-center"
          >
            <div className="-translate-y-[calc(100%-3.5px)]">
              <IcPuzzlePiece
                shape={shape}
                className={
                  isPrimaryColor ? "text-primary-normal" : "text-point-normal"
                }
              />
            </div>
            <span className="body7 text-primary/71 absolute top-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const HomeHeroSectionActive = ({ meeting }: { meeting: MeetingData }) => {
  const participantIds = meeting.participants.map(
    (participant) => participant.id
  );
  const { data: locations } = useParticipantLocationsQuery(
    meeting.meetingId,
    participantIds
  );

  const locationsByUserId = new Map(
    (locations ?? []).map((location) => [
      location.userId,
      { latitude: location.latitude, longitude: location.longitude },
    ])
  );

  const destination: UserLocation = {
    latitude: meeting.latitude,
    longitude: meeting.longitude,
  };

  return (
    <div className="relative z-10 flex h-full flex-col px-4 pt-11 pb-6">
      <h1 className="h1 text-primary">
        {meeting.title}
        <br />
        약속이 진행중이에요
      </h1>

      <Image
        src={heroProcessImage}
        alt="약속이 진행중입니다"
        fill
        priority
        sizes="50vh"
        style={{ opacity: 0.12 }}
        className="no-drag top-2/7! right-0! bottom-auto! left-auto! h-auto! w-4/5! object-contain object-bottom-right!"
      />

      <p className="body3 text-primary-darker mt-2 opacity-71">
        {meeting.place} |{" "}
        {formatMeetingDateTime(meeting.dateTime).timeFormatted}
      </p>

      <div className="mt-4">
        <AvatarStack participants={meeting.participants} />
      </div>

      <div className="mt-auto">
        <ProgressTrack
          meetingId={meeting.meetingId}
          participants={meeting.participants}
          destination={destination}
          locationsByUserId={locationsByUserId}
        />
      </div>
    </div>
  );
};

const HomeHeroSectionEmpty = () => {
  return (
    <>
      <Image
        src={heroEmptyImage}
        alt="진행중인 약속이 없습니다"
        fill
        priority
        sizes="100vw"
        className="no-drag object-contain object-bottom"
      />

      <div className="relative z-10 px-4 pt-11">
        <h1 className="h1 text-primary">
          진행중인
          <br />
          약속이 없습니다
        </h1>
      </div>
    </>
  );
};

export const HomeHeroSection = ({ meeting }: HomeHeroSectionProps) => {
  const router = useRouter();

  return (
    <section className="bg-primary-light-active relative h-[54dvh] max-h-80 min-h-100 w-full overflow-hidden">
      <div className="absolute top-11 right-4 z-60">
        <button
          type="button"
          aria-label="마이페이지로 이동"
          onClick={() => router.push("/mypage")}
          className="text-primary cursor-pointer"
        >
          <IcProfile size={24} />
        </button>
      </div>

      {meeting ? (
        <HomeHeroSectionActive meeting={meeting} />
      ) : (
        <HomeHeroSectionEmpty />
      )}
    </section>
  );
};
