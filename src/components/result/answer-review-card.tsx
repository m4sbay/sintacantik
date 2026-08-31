"use client";

import { Check, CircleHelp, Flag, MinusCircle, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { AnswerReview } from "@/types/quiz";

const statusContent = {
  correct: {
    label: "Benar",
    tone: "success" as const,
    icon: Check,
  },
  incorrect: {
    label: "Salah",
    tone: "danger" as const,
    icon: X,
  },
  unanswered: {
    label: "Tidak dijawab",
    tone: "warning" as const,
    icon: MinusCircle,
  },
};

export function AnswerReviewCard({ review }: { review: AnswerReview }) {
  const status = statusContent[review.status];
  const StatusIcon = status.icon;

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--primary)]">Soal {review.sessionIndex + 1}</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{review.question.topic}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {review.isFlagged ? (
            <Badge tone="warning">
              <Flag aria-hidden="true" className="mr-1 fill-[var(--warning)]" size={12} />
              Ditandai Ragu
            </Badge>
          ) : null}
          <Badge tone={status.tone}>
            <StatusIcon aria-hidden="true" className="mr-1" size={12} />
            {status.label}
          </Badge>
        </div>
      </div>

      <h2 className="mt-5 max-w-[70ch] text-lg font-semibold leading-relaxed">{review.question.question}</h2>

      <div className="mt-5 grid gap-3">
        <div
          className={`rounded-[var(--radius)] border p-4 ${
            review.status === "incorrect"
              ? "border-[color-mix(in_srgb,var(--danger)_40%,var(--border))] bg-[color-mix(in_srgb,var(--danger)_8%,transparent)]"
              : review.status === "unanswered"
                ? "border-[color-mix(in_srgb,var(--warning)_40%,var(--border))] bg-[color-mix(in_srgb,var(--warning)_8%,transparent)]"
                : "border-[var(--border)]"
          }`}
        >
          <p className="flex items-center gap-2 text-sm font-medium">
            {review.status === "correct" ? (
              <Check aria-hidden="true" className="text-[var(--success)]" size={16} />
            ) : review.status === "incorrect" ? (
              <X aria-hidden="true" className="text-[var(--danger)]" size={16} />
            ) : (
              <MinusCircle aria-hidden="true" className="text-[var(--warning)]" size={16} />
            )}
            Jawaban kamu
          </p>
          <p className="mt-2 text-sm text-[var(--text-primary)]">
            {review.selectedAnswer ? `${review.selectedAnswer.id}. ${review.selectedAnswer.text}` : "Tidak dijawab"}
          </p>
        </div>

        <div className="rounded-[var(--radius)] border border-[color-mix(in_srgb,var(--success)_40%,var(--border))] bg-[color-mix(in_srgb,var(--success)_8%,transparent)] p-4">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Check aria-hidden="true" className="text-[var(--success)]" size={16} />
            Jawaban benar
          </p>
          <p className="mt-2 text-sm text-[var(--text-primary)]">
            {review.correctAnswer.id}. {review.correctAnswer.text}
          </p>
        </div>
      </div>

      <div className="mt-5 max-w-[70ch] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
        <p className="flex items-center gap-2 text-sm font-medium">
          <CircleHelp aria-hidden="true" className="text-[var(--primary)]" size={16} />
          Pembahasan
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{review.question.explanation}</p>
      </div>
    </Card>
  );
}
