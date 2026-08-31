"use client";

import type { AnswerReview, ResultFilter } from "@/types/quiz";

type ResultFilterProps = {
  value: ResultFilter;
  reviews: AnswerReview[];
  onChange: (value: ResultFilter) => void;
};

const filters: Array<{ value: ResultFilter; label: string }> = [
  { value: "semua", label: "Semua" },
  { value: "salah", label: "Salah" },
  { value: "benar", label: "Benar" },
  { value: "kosong", label: "Kosong" },
];

function getFilterCount(reviews: AnswerReview[], filter: ResultFilter): number {
  if (filter === "semua") return reviews.length;
  if (filter === "salah") return reviews.filter((review) => review.status === "incorrect").length;
  if (filter === "benar") return reviews.filter((review) => review.status === "correct").length;
  return reviews.filter((review) => review.status === "unanswered").length;
}

export function ResultFilterTabs({ value, reviews, onChange }: ResultFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Filter pembahasan">
      {filters.map((filter) => {
        const active = value === filter.value;
        return (
          <button
            key={filter.value}
            aria-pressed={active}
            className={`min-h-11 rounded-[var(--radius)] border px-3 py-2 text-sm font-medium transition ${
              active
                ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
            }`}
            type="button"
            onClick={() => onChange(filter.value)}
          >
            {filter.label} {getFilterCount(reviews, filter.value)}
          </button>
        );
      })}
    </div>
  );
}
