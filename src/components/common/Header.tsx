import { IcArrowBack } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  title: string;
  onBack?: () => void;
  className?: string;
}

export const Header = ({ title, onBack, className }: HeaderProps) => {
  return (
    <div className={cn("relative flex w-full items-center py-4", className)}>
      <div className="relative z-10 ml-3.25 size-6 shrink-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="뒤로 가기"
            className="text-title flex size-6 items-center justify-center"
          >
            <IcArrowBack size={24} />
          </button>
        )}
      </div>
      <p className="h3 text-title absolute inset-x-0 text-center break-keep">
        {title}
      </p>
    </div>
  );
};
