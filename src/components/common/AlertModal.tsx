import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";

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
  <Modal
    title={message}
    open
    onOpenChange={(nextOpen) => {
      if (!nextOpen) onConfirm();
    }}
    className="gap-5 px-6 py-8"
  >
    <p className="h4 text-primary text-center whitespace-pre-line">{message}</p>

    <Button
      type="button"
      onClick={onConfirm}
      className="bg-sub2-normal hover:bg-sub2-normal-hover mt-2"
    >
      {confirmLabel}
    </Button>
  </Modal>
);
