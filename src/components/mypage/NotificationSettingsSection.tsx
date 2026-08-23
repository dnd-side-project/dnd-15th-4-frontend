import { Toggle } from "@/components/common/Toggle";
import { IcInfo } from "@/components/icons/IcInfo";
import type { NotificationSettings } from "@/types/user";

interface NotificationSettingsSectionProps {
  notificationSettings: NotificationSettings;
}

const NOTIFICATION_SETTING_ITEMS = [
  { key: "locationPermission", label: "위치권한" },
  { key: "friendArrival", label: "친구도착" },
  { key: "chatBubble", label: "말풍선" },
] as const;

export const NotificationSettingsSection = ({
  notificationSettings,
}: NotificationSettingsSectionProps) => (
  <div className="mt-8 flex flex-col px-4">
    <h4 className="h4 text-primary mb-3 tracking-[-0.02em]">알림 설정</h4>
    <div className="bg-sub1-light-hover rounded-8 mb-5 flex items-center gap-1.75 px-2.25 py-2.75">
      <IcInfo size={20} className="text-sub1-dark-hover shrink-0" />
      <p className="body7 text-sub1-dark-hover">
        모든 약속방의 기본 설정값으로 유지합니다
      </p>
    </div>
    <div className="flex flex-col gap-6">
      {NOTIFICATION_SETTING_ITEMS.map(({ key, label }) => (
        <div key={key} className="flex items-center justify-between">
          <p className="body2 text-primary">{label}</p>
          <Toggle
            aria-label={label}
            defaultChecked={notificationSettings[key]}
          />
        </div>
      ))}
    </div>
  </div>
);
