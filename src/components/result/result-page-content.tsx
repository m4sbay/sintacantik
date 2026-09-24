"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

import { AnswerReviewCard } from "@/components/result/answer-review-card";
import { ResultActions } from "@/components/result/result-actions";
import { ResultFilterTabs } from "@/components/result/result-filter";
import { ResultSummary } from "@/components/result/result-summary";
import { Card } from "@/components/ui/card";
import { questions } from "@/data/question-bank";
import { buildAnswerReviews, filterAnswerReviews } from "@/lib/quiz";
import { QUIZ_RESULT_STORAGE_KEY, parseQuizResultSnapshot, readQuizResultSnapshot } from "@/lib/storage";
import type { ResultFilter } from "@/types/quiz";

function subscribeToResult(onStoreChange: () => void): () => void {
  window.addEventListener(QUIZ_RESULT_STORAGE_KEY, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(QUIZ_RESULT_STORAGE_KEY, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function ResultPageContent() {
  const [filter, setFilter] = useState<ResultFilter>("semua");
  const isHydrated = useSyncExternalStore(() => () => undefined, () => true, () => false);
  const snapshot = useSyncExternalStore(subscribeToResult, readQuizResultSnapshot, () => null);
  const result = useMemo(() => parseQuizResultSnapshot(snapshot), [snapshot]);
  const reviews = useMemo(() => {
    if (!result) return [];
    try {
      return buildAnswerReviews(result, questions);
    } catch {
      return [];
    }
  }, [result]);
  const filteredReviews = useMemo(() => filterAnswerReviews(reviews, filter), [filter, reviews]);

  if (!isHydrated) {
    return (
      <Card className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Memuat hasil...</h1>
      </Card>
    );
  }

  if (!result || reviews.length !== result.questionIds.length) {
    return (
      <Card className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Hasil Latihan</h1>
        <p className="mt-2 text-[var(--text-secondary)]">Belum ada hasil latihan yang tersimpan.</p>
        <Link
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
          href="/"
        >
          Buat Sesi Latihan
        </Link>
      </Card>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6">
      <ResultSummary result={result} />

      <section className="grid gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Pembahasan</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Pelajari pembahasan semua soal, atau gunakan filter untuk meninjau jawaban benar, salah, dan yang belum dijawab.
            </p>
          </div>
          <ResultActions />
        </div>

        <ResultFilterTabs reviews={reviews} value={filter} onChange={setFilter} />

        {filteredReviews.length > 0 ? (
          <div className="grid gap-4">
            {filteredReviews.map((review) => (
              <AnswerReviewCard key={review.question.id} review={review} />
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <h3 className="text-lg font-semibold">
              {filter === "salah"
                ? "Tidak ada jawaban yang salah."
                : filter === "kosong"
                  ? "Tidak ada soal yang terlewat."
                  : filter === "benar"
                    ? "Belum ada jawaban benar pada filter ini."
                    : "Tidak ada pembahasan untuk ditampilkan."}
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {filter === "salah" ? "Semua jawaban pada sesi ini benar atau tidak ada yang salah." : "Coba pilih filter lain."}
            </p>
          </Card>
        )}
      </section>
    </div>
  );
}
