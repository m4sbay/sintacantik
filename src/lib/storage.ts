import type { QuizSession, StoredQuizResult } from "@/types/quiz";

export const QUIZ_SESSION_STORAGE_KEY = "sintacantik-quiz-session";
export const QUIZ_RESULT_STORAGE_KEY = "sintacantik-quiz-result";

export function readQuizSessionSnapshot(): string | null {
  return sessionStorage.getItem(QUIZ_SESSION_STORAGE_KEY);
}

export function parseQuizSessionSnapshot(serialized: string | null): QuizSession | null {
  if (!serialized) return null;

  try {
    const session = JSON.parse(serialized) as Partial<QuizSession>;
    if (session.version !== undefined && session.version !== 1) return null;
    if (session.status !== "active" && session.status !== "completed") return null;
    if (typeof session.id !== "string" || !session.id) return null;
    if (typeof session.sessionName !== "string") return null;
    if (!Array.isArray(session.questionIds) || session.questionIds.length === 0) return null;
    if (!session.questionIds.every((questionId) => typeof questionId === "string")) return null;
    if (typeof session.answers !== "object" || session.answers === null) return null;
    if (!Array.isArray(session.flaggedQuestionIds)) return null;
    const currentQuestionIndex = session.currentQuestionIndex;
    if (typeof currentQuestionIndex !== "number" || !Number.isInteger(currentQuestionIndex)) return null;
    if (currentQuestionIndex < 0 || currentQuestionIndex >= session.questionIds.length) return null;
    if (typeof session.startedAt !== "string" || Number.isNaN(Date.parse(session.startedAt))) return null;
    if (session.expiresAt !== null && (typeof session.expiresAt !== "string" || Number.isNaN(Date.parse(session.expiresAt)))) {
      return null;
    }

    return {
      version: 1,
      id: session.id,
      sessionName: session.sessionName,
      questionIds: session.questionIds,
      answers: session.answers as QuizSession["answers"],
      flaggedQuestionIds: session.flaggedQuestionIds.filter((questionId): questionId is string => typeof questionId === "string"),
      currentQuestionIndex,
      difficulty: session.difficulty ?? "semua",
      requestedQuestionCount: session.requestedQuestionCount ?? session.questionIds.length,
      startedAt: session.startedAt,
      timeLimitMinutes: session.timeLimitMinutes ?? null,
      expiresAt: session.expiresAt ?? null,
      status: session.status,
      completedAt: session.completedAt ?? null,
    };
  } catch {
    return null;
  }
}

export function readQuizSession(): QuizSession | null {
  return parseQuizSessionSnapshot(readQuizSessionSnapshot());
}

export function writeQuizSession(session: QuizSession): void {
  sessionStorage.setItem(QUIZ_SESSION_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(QUIZ_SESSION_STORAGE_KEY));
}

export function clearQuizSession(): void {
  sessionStorage.removeItem(QUIZ_SESSION_STORAGE_KEY);
  window.dispatchEvent(new Event(QUIZ_SESSION_STORAGE_KEY));
}

export function readQuizResult(): StoredQuizResult | null {
  return parseQuizResultSnapshot(readQuizResultSnapshot());
}

export function readQuizResultSnapshot(): string | null {
  return sessionStorage.getItem(QUIZ_RESULT_STORAGE_KEY);
}

export function parseQuizResultSnapshot(serialized: string | null): StoredQuizResult | null {
  if (!serialized) return null;

  try {
    const result = JSON.parse(serialized) as Partial<StoredQuizResult>;
    if (result.version !== undefined && result.version !== 1) return null;
    if (typeof result.id !== "string" || !result.id) return null;
    if (typeof result.sessionName !== "string") return null;
    if (!Array.isArray(result.questionIds) || result.questionIds.length === 0) return null;
    if (typeof result.answers !== "object" || result.answers === null) return null;
    if (!Array.isArray(result.flaggedQuestionIds)) return null;
    if (typeof result.totalQuestions !== "number" || result.totalQuestions !== result.questionIds.length) return null;
    if (typeof result.correct !== "number" || typeof result.incorrect !== "number" || typeof result.unanswered !== "number") {
      return null;
    }
    if (typeof result.scorePercentage !== "number") return null;
    if (typeof result.startedAt !== "string" || typeof result.completedAt !== "string") return null;
    if (typeof result.durationSeconds !== "number") return null;

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
      questionIds: result.questionIds,
      answers: result.answers as StoredQuizResult["answers"],
      flaggedQuestionIds: result.flaggedQuestionIds.filter((questionId): questionId is string => typeof questionId === "string"),
    };
  } catch {
    return null;
  }
}

export function writeQuizResult(result: StoredQuizResult): void {
  sessionStorage.setItem(QUIZ_RESULT_STORAGE_KEY, JSON.stringify(result));
  window.dispatchEvent(new Event(QUIZ_RESULT_STORAGE_KEY));
}

export function clearQuizResult(): void {
  sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);
  window.dispatchEvent(new Event(QUIZ_RESULT_STORAGE_KEY));
}
