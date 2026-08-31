"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { QuestionCard } from "@/components/quiz/question-card";
import { QuestionNavigator } from "@/components/quiz/question-navigator";
import { QuizControls } from "@/components/quiz/quiz-controls";
import { QuizHeader } from "@/components/quiz/quiz-header";
import { SubmitDialog } from "@/components/quiz/submit-dialog";
import { useQuizSession } from "@/hooks/useQuizSession";

export function QuizShell() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const {
    session,
    questions,
    currentQuestion,
    isInvalid,
    answeredCount,
    isComplete,
    goToQuestion,
    selectAnswer,
    toggleFlag,
    submitQuiz,
    clearSession,
  } = useQuizSession();
  const isHydrated = useSyncExternalStore(() => () => undefined, () => true, () => false);

  useEffect(() => {
    if (!isHydrated) return;
    if (isInvalid) {
      clearSession();
      router.replace("/");
      return;
    }
    if (!session) router.replace("/");
    if (session?.status === "completed") router.replace("/result");
  }, [clearSession, isHydrated, isInvalid, router, session]);

  function navigateQuestion(index: number) {
    goToQuestion(index);
    contentRef.current?.scrollIntoView({ block: "start" });
  }

  function submitFromDialog() {
    setSubmitDialogOpen(false);
    submitQuiz();
  }

  if (!isHydrated) {
    return (
      <main className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h1 className="text-2xl font-semibold">Memuat sesi...</h1>
        </div>
      </main>
    );
  }

  if (!session || !currentQuestion || isInvalid) {
    return (
      <main className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h1 className="text-2xl font-semibold">Tidak ada sesi aktif.</h1>
          <p className="mt-2 text-[var(--text-secondary)]">Buat sesi latihan dulu untuk mulai mengerjakan quiz.</p>
          <Link
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-transparent bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-contrast)] transition hover:opacity-90"
            href="/"
          >
            Buat Sesi Latihan
          </Link>
        </div>
      </main>
    );
  }

  const selectedOptionId = session.answers[currentQuestion.id]?.selectedOptionId ?? null;
  const isFlagged = session.flaggedQuestionIds.includes(currentQuestion.id);

  return (
    <>
      <QuizHeader sessionName={session.sessionName} expiresAt={session.expiresAt} onExpired={submitQuiz} />
      <main className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <QuestionNavigator
            answeredCount={answeredCount}
            answers={session.answers}
            currentIndex={session.currentQuestionIndex}
            flaggedQuestionIds={session.flaggedQuestionIds}
            questions={questions}
            onNavigate={navigateQuestion}
          />

          <div ref={contentRef} className="grid gap-4 scroll-mt-24">
            <QuestionCard
              currentIndex={session.currentQuestionIndex}
              isFlagged={isFlagged}
              question={currentQuestion}
              selectedOptionId={selectedOptionId}
              totalQuestions={questions.length}
              onSelectAnswer={(optionId) => selectAnswer(currentQuestion.id, optionId)}
              onToggleFlag={() => toggleFlag(currentQuestion.id)}
            />
            <QuizControls
              currentIndex={session.currentQuestionIndex}
              isComplete={isComplete}
              totalQuestions={questions.length}
              onNext={() => navigateQuestion(session.currentQuestionIndex + 1)}
              onPrevious={() => navigateQuestion(session.currentQuestionIndex - 1)}
              onSubmit={() => setSubmitDialogOpen(true)}
              submitButtonRef={submitButtonRef}
            />
          </div>
        </div>
      </main>
      <SubmitDialog
        answeredCount={answeredCount}
        open={submitDialogOpen}
        totalQuestions={questions.length}
        onClose={() => setSubmitDialogOpen(false)}
        onConfirm={submitFromDialog}
        returnFocusRef={submitButtonRef}
      />
    </>
  );
}
