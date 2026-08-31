"use client";

import type { RefObject } from "react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

type QuizControlsProps = {
  currentIndex: number;
  totalQuestions: number;
  isComplete: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  submitButtonRef?: RefObject<HTMLButtonElement | null>;
};

export function QuizControls({
  currentIndex,
  totalQuestions,
  isComplete,
  onPrevious,
  onNext,
  onSubmit,
  submitButtonRef,
}: QuizControlsProps) {
  const isLastQuestion = currentIndex >= totalQuestions - 1;

  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 sm:flex-row sm:items-center sm:justify-between">
      <Button disabled={currentIndex === 0} variant="secondary" onClick={onPrevious}>
        <ChevronLeft aria-hidden="true" size={17} />
        Sebelumnya
      </Button>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button disabled={isLastQuestion} variant="secondary" onClick={onNext}>
          Selanjutnya
          <ChevronRight aria-hidden="true" size={17} />
        </Button>
        {isComplete ? (
          <Button ref={submitButtonRef} onClick={onSubmit}>
            <Send aria-hidden="true" size={17} />
            Submit Jawaban
          </Button>
        ) : null}
      </div>
    </div>
  );
}
