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
    <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
      <Button disabled={currentIndex === 0} variant="secondary" onClick={onPrevious}>
        <ChevronLeft aria-hidden="true" size={17} />
        Previous
      </Button>

      {isComplete ? (
        <Button ref={submitButtonRef} onClick={onSubmit}>
          Submit
          <Send aria-hidden="true" size={17} />
        </Button>
      ) : (
        <Button disabled={isLastQuestion} variant="secondary" onClick={onNext}>
          Next
          <ChevronRight aria-hidden="true" size={17} />
        </Button>
      )}
    </div>
  );
}
