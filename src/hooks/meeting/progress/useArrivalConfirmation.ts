import { useEffect, useRef, useState } from "react";

const CONFIRMATION_COUNTDOWN_SECONDS = 5;

export type ArrivalConfirmationStep = "pending" | "confirming" | "confirmed";

export const useArrivalConfirmation = (
  canConfirm: boolean,
  onConfirmed?: () => Promise<unknown> | void,
  onConfirmError?: () => void
) => {
  const [confirmationStep, setConfirmationStep] =
    useState<ArrivalConfirmationStep>("pending");
  const [remainingSeconds, setRemainingSeconds] = useState(
    CONFIRMATION_COUNTDOWN_SECONDS
  );
  const onConfirmedRef = useRef(onConfirmed);
  const onConfirmErrorRef = useRef(onConfirmError);

  useEffect(() => {
    onConfirmedRef.current = onConfirmed;
  }, [onConfirmed]);

  useEffect(() => {
    onConfirmErrorRef.current = onConfirmError;
  }, [onConfirmError]);

  useEffect(() => {
    if (canConfirm) return;
    setConfirmationStep("pending");
    setRemainingSeconds(CONFIRMATION_COUNTDOWN_SECONDS);
  }, [canConfirm]);

  useEffect(() => {
    if (confirmationStep !== "confirming") return;

    if (remainingSeconds <= 0) {
      setConfirmationStep("confirmed");
      Promise.resolve()
        .then(() => onConfirmedRef.current?.())
        .catch(() => {
          setConfirmationStep("pending");
          setRemainingSeconds(CONFIRMATION_COUNTDOWN_SECONDS);
          onConfirmErrorRef.current?.();
        });
      return;
    }

    const timer = setTimeout(() => {
      setRemainingSeconds((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [confirmationStep, remainingSeconds]);

  const handleStartConfirmation = () => {
    setRemainingSeconds(CONFIRMATION_COUNTDOWN_SECONDS);
    setConfirmationStep("confirming");
  };

  const handleCancelConfirmation = () => {
    setConfirmationStep("pending");
    setRemainingSeconds(CONFIRMATION_COUNTDOWN_SECONDS);
  };

  return {
    confirmationStep,
    remainingSeconds,
    isConfirmed: canConfirm && confirmationStep === "confirmed",
    handleStartConfirmation,
    handleCancelConfirmation,
  };
};
