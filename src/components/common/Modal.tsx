import type { ReactNode, Ref } from "react";
import { Dialog } from "@base-ui/react/dialog";

import { IcClose } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface ModalProps extends Omit<Dialog.Root.Props, "children"> {
  title: string;
  children?: ReactNode;
  className?: string;
  backdropClassName?: string;
  viewportClassName?: string;
  showCloseButton?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export const Modal = ({
  title,
  children,
  className,
  backdropClassName,
  viewportClassName,
  showCloseButton = true,
  ref,
  ...props
}: ModalProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/63 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0",
            backdropClassName
          )}
        />
        {showCloseButton && (
          <Dialog.Close
            aria-label="닫기"
            className="fixed top-4 left-4 z-50 flex size-6 items-center justify-center text-white"
          >
            <IcClose size={24} />
          </Dialog.Close>
        )}
        <Dialog.Viewport
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center px-6",
            viewportClassName
          )}
        >
          <Dialog.Popup
            ref={ref}
            className={cn(
              "rounded-30 flex w-full max-w-79 flex-col items-center bg-white",
              className
            )}
          >
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            {children}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
