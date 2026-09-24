export type QuestionDifficulty = "mudah" | "sedang" | "sulit";

export type QuestionOptionId = "A" | "B" | "C" | "D" | "E";

export type QuestionOption = {
  id: QuestionOptionId;
  text: string;
  /** Display label from the source; id remains unique for scoring. */
  sourceLabel?: string;
};

export type QuestionModule = {
  id: string;
  label: string;
  group: "ortho" | "tryout";
};

export type Question = {
  /** Legacy questions without moduleId belong to Modul Ortho. */
  moduleId?: string;
  id: string;
  number: number;
  question: string;
  options: QuestionOption[];
  correctAnswer: QuestionOptionId;
  difficulty?: QuestionDifficulty;
  topic: string;
  /** Optional plain text; blank text uses the review fallback. Supports paragraphs and bullet lines. */
  explanation?: string;
  image?: { src: string; alt: string };
};

export type QuizConfiguration = {
  sessionName: string;
  selectedModuleIds: string[];
  timeLimitMinutes: number | null;
};

export type QuizAnswer = {
  questionId: Question["id"];
  selectedOptionId: QuestionOptionId | null;
  answeredAt: string | null;
};

export type QuizSession = {
  version: 1;
  id: string;
  sessionName: string;
  questionIds: Question["id"][];
  answers: Record<Question["id"], QuizAnswer>;
  flaggedQuestionIds: string[];
  currentQuestionIndex: number;
  selectedModuleIds: string[];
  startedAt: string;
  timeLimitMinutes: number | null;
  expiresAt: string | null;
  status: "active" | "completed";
  completedAt: string | null;
};

export type QuizResultItem = {
  question: Question;
  selectedOptionId: QuestionOptionId | null;
  isCorrect: boolean;
  isUnanswered: boolean;
};

export type QuizResult = {
  id: string;
  sessionName: string;
  scorePercentage: number;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
  items: QuizResultItem[];
};

export type StoredQuizResult = Omit<QuizResult, "items"> & {
  version: 1;
  questionIds: Question["id"][];
  answers: Record<Question["id"], QuizAnswer>;
  flaggedQuestionIds: Question["id"][];
};

export type AnswerStatus = "correct" | "incorrect" | "unanswered";

export type ResultFilter = "semua" | "salah" | "benar" | "kosong";

export type AnswerReview = {
  question: Question;
  sessionIndex: number;
  selectedAnswer: QuestionOption | null;
  correctAnswer: QuestionOption;
  status: AnswerStatus;
  isFlagged: boolean;
};
