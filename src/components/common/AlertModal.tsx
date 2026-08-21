import { Button } from "@/components/common/Button";

export interface AlertModalProps {
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

export const AlertModal = ({
  message,
  confirmLabel = "확인",
  onConfirm,
}: AlertModalProps) => (
  <div
    role="alertdialog"
    aria-modal="true"
    className="fixed inset-0 z-60 mx-auto flex w-full max-w-md items-center justify-center bg-black/50 px-8"
  >
    <div className="rounded-20 flex w-full flex-col items-center gap-5 bg-white p-6">
      <p className="h4 text-primary text-center whitespace-pre-line">
        {message}
      </p>

      <Button
        type="button"
        size="cta"
        onClick={onConfirm}
        className="bg-sub2-normal hover:bg-sub2-normal-hover mt-2"
      >
        {confirmLabel}
      </Button>
    </div>
  </div>
);
