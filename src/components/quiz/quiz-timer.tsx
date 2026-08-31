"use client";

import { Clock, TriangleAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { calculateRemainingSeconds } from "@/lib/quiz";

type QuizTimerProps = {
  expiresAt: string | null;
  onExpired: () => void;
};

function formatRemaining(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export function QuizTimer({ expiresAt, onExpired }: QuizTimerProps) {
  const [now, setNow] = useState(() => new Date());
  const remainingSeconds = useMemo(() => calculateRemainingSeconds(expiresAt, now), [expiresAt, now]);
  const isWarning = remainingSeconds !== null && remainingSeconds <= 5 * 60;

  useEffect(() => {
    if (expiresAt === null) return;
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, [expiresAt]);

  useEffect(() => {
    if (remainingSeconds === 0) onExpired();
  }, [onExpired, remainingSeconds]);

  if (remainingSeconds === null) {
    return (
      <div className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text-secondary)]">
        <Clock aria-hidden="true" size={17} />
        Tanpa batas waktu
      </div>
    );
  }

  return (
    <div
      className={`inline-flex min-h-11 items-center gap-2 rounded-[var(--radius)] border px-3 text-sm font-medium ${
        isWarning
          ? "border-[color-mix(in_srgb,var(--warning)_45%,var(--border))] bg-[color-mix(in_srgb,var(--warning)_14%,transparent)] text-[var(--warning)]"
          : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
      }`}
      role="timer"
    >
      {isWarning ? <TriangleAlert aria-hidden="true" size={17} /> : <Clock aria-hidden="true" size={17} />}
      <span>{formatRemaining(remainingSeconds)}</span>
      {isWarning ? <span className="text-xs">tersisa</span> : null}
    </div>
  );
}
