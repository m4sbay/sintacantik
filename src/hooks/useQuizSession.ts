"use client";

import { useMemo, useRef, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { questions } from "@/data/questions";
import {
  calculateQuizResult,
  completeQuizSession,
  getAnsweredCount,
  isQuizComplete,
  toggleFlaggedQuestion,
  updateCurrentQuestionIndex,
  updateQuizAnswer,
} from "@/lib/quiz";
import {
  parseQuizSessionSnapshot,
  QUIZ_SESSION_STORAGE_KEY,
  readQuizSessionSnapshot,
  clearQuizSession,
  writeQuizResult,
  writeQuizSession,
} from "@/lib/storage";
import type { Question, QuestionOptionId, QuizSession, StoredQuizResult } from "@/types/quiz";

function subscribeToQuizSession(onStoreChange: () => void): () => void {
  window.addEventListener(QUIZ_SESSION_STORAGE_KEY, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(QUIZ_SESSION_STORAGE_KEY, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function resolveSessionQuestions(session: QuizSession | null): Question[] {
  if (!session) return [];
  const questionsById = new Map(questions.map((question) => [question.id, question]));

  return session.questionIds
    .map((questionId) => questionsById.get(questionId))
    .filter((question): question is Question => Boolean(question));
}

function toStoredResult(
  result: ReturnType<typeof calculateQuizResult>,
  session: QuizSession,
): StoredQuizResult {
  return {
    version: 1,
    id: result.id,
    sessionName: result.sessionName,
    scorePercentage: result.scorePercentage,
    totalQuestions: result.totalQuestions,
    correct: result.correct,
    incorrect: result.incorrect,
    unanswered: result.unanswered,
    startedAt: result.startedAt,
    completedAt: result.completedAt,
    durationSeconds: result.durationSeconds,
    questionIds: session.questionIds,
    answers: session.answers,
    flaggedQuestionIds: session.flaggedQuestionIds,
  };
}

export function useQuizSession() {
  const router = useRouter();
  const hasSubmittedRef = useRef(false);
  const snapshot = useSyncExternalStore(subscribeToQuizSession, readQuizSessionSnapshot, () => null);
  const session = useMemo(() => parseQuizSessionSnapshot(snapshot), [snapshot]);
  const sessionQuestions = useMemo(() => resolveSessionQuestions(session), [session]);
  const isInvalid = Boolean(session && sessionQuestions.length !== session.questionIds.length);
  const currentQuestion = session ? sessionQuestions[session.currentQuestionIndex] : undefined;
  const answeredCount = session ? getAnsweredCount(session) : 0;
  const complete = session ? isQuizComplete(session) : false;

  function persist(updater: (session: QuizSession) => QuizSession): void {
    if (!session) return;
    writeQuizSession(updater(session));
  }

  function goToQuestion(index: number): void {
    persist((currentSession) => updateCurrentQuestionIndex(currentSession, index));
  }

  function selectAnswer(questionId: Question["id"], optionId: QuestionOptionId): void {
    persist((currentSession) => updateQuizAnswer(currentSession, questionId, optionId, new Date().toISOString()));
  }

  function toggleFlag(questionId: Question["id"]): void {
    persist((currentSession) => toggleFlaggedQuestion(currentSession, questionId));
  }

  function submitQuiz(): void {
    if (!session || hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    const completedAt = new Date().toISOString();
    const completedSession = completeQuizSession(session, completedAt);
    const result = calculateQuizResult(completedSession, questions, completedAt);

    writeQuizSession(completedSession);
    writeQuizResult(toStoredResult(result, completedSession));
    router.replace("/result");
  }

  return {
    session,
    questions: sessionQuestions,
    currentQuestion,
    isInvalid,
    answeredCount,
    isComplete: complete,
    goToQuestion,
    selectAnswer,
    toggleFlag,
    submitQuiz,
    clearSession: clearQuizSession,
  };
}
