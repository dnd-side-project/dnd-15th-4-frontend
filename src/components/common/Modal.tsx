import type { ReactNode, Ref } from "react";
import { Dialog } from "@base-ui/react/dialog";

import { IcClose } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface ModalProps extends Omit<Dialog.Root.Props, "children"> {
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export const Modal = ({ children, className, ref, ...props }: ModalProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/63 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Close
          aria-label="닫기"
          className="fixed top-4 left-4 z-50 flex size-6 items-center justify-center text-white"
        >
          <IcClose size={24} />
        </Dialog.Close>
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <Dialog.Popup
            ref={ref}
            className={cn(
              "rounded-30 flex w-full max-w-79 flex-col items-center bg-white",
              className
            )}
          >
            {children}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
