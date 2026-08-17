import { IcInfo } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface InfoBannerProps {
  text: string;
  className?: string;
}

export const InfoBanner = ({ text, className }: InfoBannerProps) => (
  <div
    className={cn(
      "bg-sub1-light-hover flex w-full items-center gap-2 rounded-8 px-2.5 py-2.5",
      className
    )}
  >
    <IcInfo size={20} className="text-sub1-dark-hover shrink-0" />
    <p className="body7 text-sub1-dark-hover">{text}</p>
  </div>
);
