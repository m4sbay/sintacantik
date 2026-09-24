import { ORTHO_MODULE_ID } from "@/data/question-modules";
import type {
  Question,
  QuestionDifficulty,
  QuizAnswer,
  QuizConfiguration,
  QuizResult,
  QuizSession,
  QuestionOptionId,
  AnswerReview,
  ResultFilter,
  StoredQuizResult,
} from "@/types/quiz";

export function getQuestionsByModules(questions: Question[], selectedModuleIds: readonly string[]): Question[] {
  const selected = new Set(selectedModuleIds);
  return questions.filter((question) => selected.has(question.moduleId ?? ORTHO_MODULE_ID));
}

export function shuffleQuestions<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function isQuizComplete(session: Pick<QuizSession, "questionIds" | "answers">): boolean {
  return session.questionIds.every((questionId) => {
    const answer = session.answers[questionId];
    return Boolean(answer?.selectedOptionId);
  });
}

export function getAnsweredCount(session: Pick<QuizSession, "questionIds" | "answers">): number {
  return session.questionIds.filter((questionId) => Boolean(session.answers[questionId]?.selectedOptionId)).length;
}

export function updateQuizAnswer(
  session: QuizSession,
  questionId: Question["id"],
  selectedOptionId: QuestionOptionId,
  answeredAt: string,
): QuizSession {
  if (!session.questionIds.includes(questionId) || session.status !== "active") return session;

  return {
    ...session,
    answers: {
      ...session.answers,
      [questionId]: {
        questionId,
        selectedOptionId,
        answeredAt,
      },
    },
  };
}

export function toggleFlaggedQuestion(session: QuizSession, questionId: Question["id"]): QuizSession {
  if (!session.questionIds.includes(questionId) || session.status !== "active") return session;
  const isFlagged = session.flaggedQuestionIds.includes(questionId);

  return {
    ...session,
    flaggedQuestionIds: isFlagged
      ? session.flaggedQuestionIds.filter((flaggedQuestionId) => flaggedQuestionId !== questionId)
      : [...session.flaggedQuestionIds, questionId],
  };
}

export function updateCurrentQuestionIndex(session: QuizSession, nextIndex: number): QuizSession {
  if (session.status !== "active") return session;
  const boundedIndex = Math.min(Math.max(nextIndex, 0), Math.max(session.questionIds.length - 1, 0));

  return {
    ...session,
    currentQuestionIndex: boundedIndex,
  };
}

export function calculateRemainingSeconds(expiresAt: string | null, now: Date = new Date()): number | null {
  if (expiresAt === null) return null;
  return Math.max(0, Math.ceil((new Date(expiresAt).getTime() - now.getTime()) / 1000));
}

export function calculateQuizResult(
  session: Pick<QuizSession, "id" | "sessionName" | "questionIds" | "answers" | "startedAt">,
  questions: Question[],
  completedAt: string,
): QuizResult {
  const questionsById = new Map(questions.map((question) => [question.id, question]));
  const sessionQuestions = session.questionIds.map((questionId) => {
    const question = questionsById.get(questionId);
    if (!question) {
      throw new Error(`Question "${questionId}" from session was not found in the question database.`);
    }
    return question;
  });

  const items = sessionQuestions.map((question) => {
    const selectedOptionId = session.answers[question.id]?.selectedOptionId ?? null;
    const isUnanswered = selectedOptionId === null;
    const isCorrect = selectedOptionId === question.correctAnswer;

    return {
      question,
      selectedOptionId,
      isCorrect,
      isUnanswered,
    };
  });

  const correct = items.filter((item) => item.isCorrect).length;
  const unanswered = items.filter((item) => item.isUnanswered).length;
  const incorrect = items.length - correct - unanswered;
  const durationSeconds = Math.max(
    0,
    Math.round((new Date(completedAt).getTime() - new Date(session.startedAt).getTime()) / 1000),
  );

  return {
    id: session.id,
    sessionName: session.sessionName,
    scorePercentage: items.length === 0 ? 0 : Math.round((correct / items.length) * 100),
    totalQuestions: items.length,
    correct,
    incorrect,
    unanswered,
    startedAt: session.startedAt,
    completedAt,
    durationSeconds,
    items,
  };
}

export function completeQuizSession(session: QuizSession, completedAt: string): QuizSession {
  return {
    ...session,
    status: "completed",
    completedAt,
  };
}

export function countQuestionsByDifficulty(questions: Question[]): Record<QuestionDifficulty | "unknown", number> {
  return questions.reduce<Record<QuestionDifficulty | "unknown", number>>(
    (counts, question) => {
      counts[question.difficulty ?? "unknown"] += 1;
      return counts;
    },
    { mudah: 0, sedang: 0, sulit: 0, unknown: 0 },
  );
}

export function createEmptyAnswers(questions: Question[]): Record<Question["id"], QuizAnswer> {
  return Object.fromEntries(
    questions.map((question) => [
      question.id,
      {
        questionId: question.id,
        selectedOptionId: null,
        answeredAt: null,
      },
    ]),
  );
}

export function createQuizSession(
  configuration: QuizConfiguration,
  questionBank: Question[],
  options: {
    idFactory?: () => string;
    now?: () => Date;
    random?: () => number;
  } = {},
): QuizSession {
  const idFactory = options.idFactory ?? (() => crypto.randomUUID());
  const now = options.now ?? (() => new Date());
  const startedAtDate = now();
  const selectedQuestions = shuffleQuestions(
    getQuestionsByModules(questionBank, configuration.selectedModuleIds),
    options.random,
  );
  if (selectedQuestions.length === 0) throw new Error("Tidak ada soal tersedia untuk modul yang dipilih.");
  const startedAt = startedAtDate.toISOString();
  const expiresAt =
    configuration.timeLimitMinutes === null
      ? null
      : new Date(startedAtDate.getTime() + configuration.timeLimitMinutes * 60 * 1000).toISOString();

  return {
    version: 1,
    id: idFactory(),
    sessionName: configuration.sessionName.trim() || "Latihan Soal",
    questionIds: selectedQuestions.map((question) => question.id),
    answers: createEmptyAnswers(selectedQuestions),
    flaggedQuestionIds: [],
    currentQuestionIndex: 0,
    selectedModuleIds: [...new Set(configuration.selectedModuleIds)],
    startedAt,
    timeLimitMinutes: configuration.timeLimitMinutes,
    expiresAt,
    status: "active",
    completedAt: null,
  };
}

export function buildAnswerReviews(result: StoredQuizResult, questionBank: Question[]): AnswerReview[] {
  const questionsById = new Map(questionBank.map((question) => [question.id, question]));

  return result.questionIds.map((questionId, index) => {
    const question = questionsById.get(questionId);
    if (!question) {
      throw new Error(`Question "${questionId}" from result was not found in the question database.`);
    }

    const correctAnswer = question.options.find((option) => option.id === question.correctAnswer);
    if (!correctAnswer) {
      throw new Error(`Question "${questionId}" does not contain correct answer "${question.correctAnswer}".`);
    }

    const selectedOptionId = result.answers[questionId]?.selectedOptionId ?? null;
    const selectedAnswer = selectedOptionId
      ? question.options.find((option) => option.id === selectedOptionId) ?? null
      : null;
    const status =
      selectedOptionId === null ? "unanswered" : selectedOptionId === question.correctAnswer ? "correct" : "incorrect";

    return {
      question,
      sessionIndex: index,
      selectedAnswer,
      correctAnswer,
      status,
      isFlagged: result.flaggedQuestionIds.includes(questionId),
    };
  });
}

export function filterAnswerReviews(reviews: AnswerReview[], filter: ResultFilter): AnswerReview[] {
  if (filter === "semua") return reviews;
  if (filter === "salah") return reviews.filter((review) => review.status === "incorrect");
  if (filter === "benar") return reviews.filter((review) => review.status === "correct");
  return reviews.filter((review) => review.status === "unanswered");
}
