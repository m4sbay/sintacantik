"use client";

import { QuestionImage } from "@/components/quiz/question-image";
import { Flag } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Question, QuestionOptionId } from "@/types/quiz";

type QuestionCardProps = {
  question: Question;
  selectedOptionId: QuestionOptionId | null;
  isFlagged: boolean;
  currentIndex: number;
  totalQuestions: number;
  onSelectAnswer: (optionId: QuestionOptionId) => void;
  onToggleFlag: () => void;
};

export function QuestionCard({
  question,
  selectedOptionId,
  isFlagged,
  currentIndex,
  totalQuestions,
  onSelectAnswer,
  onToggleFlag,
}: QuestionCardProps) {
  return (
    <section className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--primary)]">
            Soal {currentIndex + 1} dari {totalQuestions}
          </p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{question.topic}</p>
        </div>
        <Button aria-pressed={isFlagged} variant={isFlagged ? "secondary" : "ghost"} onClick={onToggleFlag}>
          <Flag
            aria-hidden="true"
            className={isFlagged ? "fill-[var(--warning)] text-[var(--warning)]" : ""}
            size={17}
          />
          {isFlagged ? "Ragu" : "Tandai Ragu"}
        </Button>
      </div>

      <h2 className="mt-5 max-w-[70ch] text-xl font-semibold leading-relaxed sm:text-2xl">{question.question}</h2>

      {question.image ? <QuestionImage key={question.image.src} image={question.image} /> : null}

      <fieldset className="mt-6 grid gap-3">
        <legend className="sr-only">Pilihan jawaban</legend>
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;

          return (
            <label
              key={option.id}
              className={`grid min-h-11 cursor-pointer grid-cols-[2.25rem_1fr] items-start gap-3 rounded-[var(--radius)] border p-4 transition ${
                selected
                  ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)]"
              }`}
            >
              <input
                checked={selected}
                className="mt-1 size-4 accent-[var(--primary)]"
                name={question.id}
                type="radio"
                value={option.id}
                onChange={() => onSelectAnswer(option.id)}
              />
              <span>
                <span className="font-semibold">{option.sourceLabel ?? option.id}.</span> {option.text}
              </span>
            </label>
          );
        })}
      </fieldset>
    </section>
  );
}
