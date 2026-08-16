import { IcMessengerFill } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface ChatFloatingButtonProps {
  onClick?: () => void;
  className?: string;
}

export const ChatFloatingButton = ({
  onClick,
  className,
}: ChatFloatingButtonProps) => {
  return (
    <button
      type="button"
      aria-label="말풍선 옵션 열기"
      onClick={onClick}
      className={cn(
        "bg-sub2-normal flex size-15 items-center justify-center rounded-full p-4 shadow-1",
        className
      )}
    >
      <IcMessengerFill size={24} className="text-white" />
    </button>
  );
};
