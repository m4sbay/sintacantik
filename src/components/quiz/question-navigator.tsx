"use client";

import { Flag } from "lucide-react";

import type { Question, QuizAnswer } from "@/types/quiz";

type QuestionNavigatorProps = {
  questions: Question[];
  answers: Record<string, QuizAnswer>;
  flaggedQuestionIds: string[];
  currentIndex: number;
  answeredCount: number;
  onNavigate: (index: number) => void;
};

export function QuestionNavigator({
  questions,
  answers,
  flaggedQuestionIds,
  currentIndex,
  answeredCount,
  onNavigate,
}: QuestionNavigatorProps) {
  const total = questions.length;

  return (
    <aside className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Navigasi Soal</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{answeredCount} dari {total} terjawab</p>
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-[var(--radius)] bg-[var(--surface-muted)]">
        <div
          className="h-full bg-[var(--primary)] transition-[width]"
          style={{ width: total === 0 ? "0%" : `${(answeredCount / total) * 100}%` }}
        />
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2 min-[430px]:grid-cols-6 sm:grid-cols-8 lg:grid-cols-5">
        {questions.map((question, index) => {
          const isCurrent = index === currentIndex;
          const isAnswered = Boolean(answers[question.id]?.selectedOptionId);
          const isFlagged = flaggedQuestionIds.includes(question.id);

          return (
            <button
              key={question.id}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`Soal ${index + 1}${isAnswered ? ", sudah dijawab" : ", belum dijawab"}${isFlagged ? ", ragu" : ""}`}
              className={`relative flex aspect-square min-h-11 items-center justify-center rounded-[var(--radius)] border text-sm font-semibold transition ${
                isCurrent
                  ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-contrast)]"
                  : isAnswered
                    ? "border-[color-mix(in_srgb,var(--primary)_30%,var(--border))] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--text-primary)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
              }`}
              type="button"
              onClick={() => onNavigate(index)}
            >
              {String(index + 1).padStart(2, "0")}
              {isFlagged ? (
                <Flag
                  aria-hidden="true"
                  className="absolute right-1 top-1 fill-[var(--warning)] text-[var(--warning)]"
                  size={11}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
