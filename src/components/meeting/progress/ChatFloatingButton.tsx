import type { CSSProperties } from "react";

import { SpeechBubble } from "@/components/common/SpeechBubble";
import { IcMessengerFill } from "@/components/icons";
import { SPEECH_BUBBLE_MESSAGES } from "@/constants/message";
import { cn } from "@/lib/utils";

export interface ChatFloatingButtonProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelectMessage: (message: string) => void;
  className?: string;
  style?: CSSProperties;
}

export const ChatFloatingButton = ({
  isOpen,
  onOpenChange,
  onSelectMessage,
  className,
  style,
}: ChatFloatingButtonProps) => {
  return (
    <div className={cn("relative", className)} style={style}>
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-3 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2">
          {SPEECH_BUBBLE_MESSAGES.map((message) => (
            <button
              key={message}
              type="button"
              onClick={() => onSelectMessage(message)}
            >
              <SpeechBubble message={message} />
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        aria-label="말풍선 옵션 열기"
        onClick={() => onOpenChange(!isOpen)}
        className={cn(
          "flex size-15 items-center justify-center rounded-full p-4 shadow-1 transition-colors",
          isOpen ? "bg-surface-3" : "bg-sub2-normal"
        )}
      >
        <IcMessengerFill
          size={24}
          className={isOpen ? "text-sub2-normal" : "text-white"}
        />
      </button>
    </div>
  );
};
