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
  // 매 렌더마다 갱신되는 콜백이라 deps에 넣으면 카운트다운 타이머가 매번 재시작된다
  const onConfirmedRef = useRef(onConfirmed);
  onConfirmedRef.current = onConfirmed;
  const onConfirmErrorRef = useRef(onConfirmError);
  onConfirmErrorRef.current = onConfirmError;

  useEffect(() => {
    if (canConfirm) return;
    setConfirmationStep("pending");
    setRemainingSeconds(CONFIRMATION_COUNTDOWN_SECONDS);
  }, [canConfirm]);

  useEffect(() => {
    if (confirmationStep !== "confirming") return;

    if (remainingSeconds <= 0) {
      setConfirmationStep("confirmed");
      // 도착완료 API 호출이 실패하면 "도착"으로 확정 처리하지 않고 버튼을 다시 노출한다
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
