import { Toggle } from "@/components/common/Toggle";
import {
  IcExtension,
  IcExtensionFilled,
  IcViewAgenda,
  IcViewAgendaFilled,
} from "@/components/icons";

export interface MeetingProgressHeaderProps {
  completedCount: number;
  totalCount: number;
  isStackView: boolean;
  onStackViewChange: (isStackView: boolean) => void;
}

export const MeetingProgressHeader = ({
  completedCount,
  totalCount,
  isStackView,
  onStackViewChange,
}: MeetingProgressHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-1">
        <p className="h2 text-primary">약속을 맞춰가는 중</p>
        <span className="puzzle-process text-disable">
          ({completedCount}/{totalCount})
        </span>
      </div>
      <Toggle
        variant="icon"
        checked={isStackView}
        onCheckedChange={onStackViewChange}
        iconOff={<IcExtension size={19} />}
        iconOffFilled={<IcExtensionFilled size={19} />}
        iconOn={<IcViewAgenda size={14} />}
        iconOnFilled={<IcViewAgendaFilled size={14} />}
        aria-label="보기 방식 전환"
      />
    </div>
  );
};
