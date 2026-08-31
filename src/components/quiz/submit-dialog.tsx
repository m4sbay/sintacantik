"use client";

import { useEffect, useRef, type RefObject } from "react";

import { Button } from "@/components/ui/button";

type SubmitDialogProps = {
  answeredCount: number;
  totalQuestions: number;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
};

export function SubmitDialog({
  answeredCount,
  totalQuestions,
  open,
  onClose,
  onConfirm,
  returnFocusRef,
}: SubmitDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const returnFocusTarget = returnFocusRef?.current;
    document.body.style.overflow = "hidden";
    confirmRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;

      const focusableButtons = [cancelRef.current, confirmRef.current].filter(
        (button): button is HTMLButtonElement => Boolean(button),
      );
      const firstButton = focusableButtons[0];
      const lastButton = focusableButtons[focusableButtons.length - 1];

      if (event.shiftKey && document.activeElement === firstButton) {
        event.preventDefault();
        lastButton?.focus();
      } else if (!event.shiftKey && document.activeElement === lastButton) {
        event.preventDefault();
        firstButton?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusTarget?.focus();
    };
  }, [onClose, open, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      aria-labelledby="submit-dialog-title"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 px-4"
      role="dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-lg">
        <h2 id="submit-dialog-title" className="text-xl font-semibold">
          Submit jawaban?
        </h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Kamu sudah menjawab {answeredCount} dari {totalQuestions} soal. Jawaban tidak dapat diubah setelah dikirim.
        </p>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button ref={cancelRef} variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button ref={confirmRef} onClick={onConfirm}>
            Submit Jawaban
          </Button>
        </div>
      </div>
    </div>
  );
}
