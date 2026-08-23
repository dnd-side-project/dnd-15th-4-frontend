import { IcInfo } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  position?: "top" | "bottom";
  isExiting?: boolean;
}

export function Toast({
  message,
  position = "bottom",
  isExiting = false,
}: ToastProps) {
  const isTop = position === "top";

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-50 mx-auto w-full max-w-md px-4",
        isTop ? "top-6" : "bottom-10"
      )}
    >
      <output
        aria-atomic="true"
        className={cn(
          "rounded-8 bg-sub2-normal/95 flex w-full items-center gap-1.75 px-2.25 py-2.75 shadow-lg",
          isExiting
            ? cn(
                "animate-out fade-out",
                isTop ? "slide-out-to-top-4" : "slide-out-to-bottom-4"
              )
            : cn(
                "animate-in fade-in",
                isTop ? "slide-in-from-top-4" : "slide-in-from-bottom-4"
              )
        )}
      >
        <IcInfo size={20} className="shrink-0 text-white" />
        <span className="body7 whitespace-nowrap text-white">{message}</span>
      </output>
    </div>
  );
}
