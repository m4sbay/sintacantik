"use client";

import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDuration } from "@/lib/format";
import type { StoredQuizResult } from "@/types/quiz";

export function ResultSummary({ result }: { result: StoredQuizResult }) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--primary)]">Hasil Latihan</p>
          <h1 className="mt-2 text-3xl font-semibold">{result.sessionName}</h1>
        </div>
        <Badge tone="primary">
          <Clock aria-hidden="true" className="mr-1" size={13} />
          {formatDuration(result.durationSeconds)}
        </Badge>
      </div>

      <div className="mt-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-muted)] p-5">
        <p className="text-3xl font-semibold">
          {result.correct} / {result.totalQuestions} Benar
        </p>
        <p className="mt-1 text-xl text-[var(--text-secondary)]">{result.scorePercentage}%</p>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-4">
        <div className="rounded-[var(--radius)] border border-[var(--border)] p-4">
          <dt className="text-sm text-[var(--text-secondary)]">Benar</dt>
          <dd className="mt-1 text-2xl font-semibold text-[var(--success)]">{result.correct}</dd>
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--border)] p-4">
          <dt className="text-sm text-[var(--text-secondary)]">Salah</dt>
          <dd className="mt-1 text-2xl font-semibold text-[var(--danger)]">{result.incorrect}</dd>
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--border)] p-4">
          <dt className="text-sm text-[var(--text-secondary)]">Kosong</dt>
          <dd className="mt-1 text-2xl font-semibold text-[var(--warning)]">{result.unanswered}</dd>
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--border)] p-4">
          <dt className="text-sm text-[var(--text-secondary)]">Waktu</dt>
          <dd className="mt-1 text-2xl font-semibold">{formatDuration(result.durationSeconds)}</dd>
        </div>
      </dl>
    </Card>
  );
}
