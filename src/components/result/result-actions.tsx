"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { clearQuizResult, clearQuizSession } from "@/lib/storage";

export function ResultActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] border border-transparent bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-contrast)] transition hover:opacity-90"
        href="/"
        onClick={() => {
          clearQuizSession();
          clearQuizResult();
        }}
      >
        <RotateCcw aria-hidden="true" size={17} />
        Latihan Lagi
      </Link>
      <Link
        className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
        href="/"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
