"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { QuizTimer } from "@/components/quiz/quiz-timer";

type QuizHeaderProps = {
  sessionName: string;
  expiresAt: string | null;
  onExpired: () => void;
};

export function QuizHeader({ sessionName, expiresAt, onExpired }: QuizHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 self-stretch sm:self-auto">
          <p className="text-xs font-semibold text-[var(--primary)]">sintacantik</p>
          <h1 className="truncate text-lg font-semibold">{sessionName}</h1>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <QuizTimer expiresAt={expiresAt} onExpired={onExpired} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
