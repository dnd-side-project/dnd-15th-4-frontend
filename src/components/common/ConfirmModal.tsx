import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";

export interface ConfirmModalProps {
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({
  title,
  description,
  cancelLabel,
  confirmLabel = "확인",
  onCancel,
  onConfirm,
}: ConfirmModalProps) => (
  <Modal
    title={title}
    open
    onOpenChange={(nextOpen) => {
      if (!nextOpen) onCancel();
    }}
    className="rounded-18 gap-6 p-6"
    backdropClassName="bg-black/70 backdrop-blur-[5px]"
    viewportClassName="items-start justify-center pt-54.25"
    showCloseButton={false}
  >
    <div className="flex flex-col items-center gap-3.5 text-center">
      <p className="h4 text-primary">{title}</p>
      {description && (
        <p className="body5 text-disable whitespace-pre-line">{description}</p>
      )}
    </div>

    <div className="flex w-full gap-3.75">
      {cancelLabel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="text-red hover:bg-bg-normal rounded-16 bottom-button hover:text-red h-14 flex-1 border-1"
        >
          {cancelLabel}
        </Button>
      )}
      <Button
        type="button"
        onClick={onConfirm}
        className="bg-sub2-normal hover:bg-sub2-normal rounded-16 text-surface-0 bottom-button h-14 flex-1"
      >
        {confirmLabel}
      </Button>
    </div>
  </Modal>
);
