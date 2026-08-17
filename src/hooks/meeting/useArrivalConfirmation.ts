import { useEffect, useState } from "react";

const CONFIRMATION_COUNTDOWN_SECONDS = 5;

type ArrivalConfirmationStep = "pending" | "confirming" | "confirmed";

export const useArrivalConfirmation = (isArrived: boolean) => {
  const [confirmationStep, setConfirmationStep] =
    useState<ArrivalConfirmationStep>("pending");
  const [remainingSeconds, setRemainingSeconds] = useState(
    CONFIRMATION_COUNTDOWN_SECONDS
  );

  useEffect(() => {
    if (isArrived) return;
    setConfirmationStep("pending");
    setRemainingSeconds(CONFIRMATION_COUNTDOWN_SECONDS);
  }, [isArrived]);

  useEffect(() => {
    if (confirmationStep !== "confirming") return;

    if (remainingSeconds <= 0) {
      setConfirmationStep("confirmed");
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
    isConfirmed: isArrived && confirmationStep === "confirmed",
    handleStartConfirmation,
    handleCancelConfirmation,
  };
};
