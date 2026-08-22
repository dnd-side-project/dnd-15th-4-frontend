import { cn } from "@/lib/utils";

export interface SpeechBubbleProps {
  message: string;
  className?: string;
}

export const SpeechBubble = ({ message, className }: SpeechBubbleProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="shadow-2 rounded-full bg-white px-4 py-2.25">
        <p className="speech-bubble text-secondary-1 whitespace-nowrap">
          {message}
        </p>
      </div>
    </div>
  );
};
