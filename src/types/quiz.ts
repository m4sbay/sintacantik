export type QuestionDifficulty = "mudah" | "sedang" | "sulit";

export type DifficultyFilter = QuestionDifficulty | "semua";

export type QuestionOptionId = "A" | "B" | "C" | "D" | "E";

export type QuestionOption = {
  id: QuestionOptionId;
  text: string;
};

export type Question = {
  id: string;
  number: number;
  question: string;
  options: QuestionOption[];
  correctAnswer: QuestionOptionId;
  difficulty: QuestionDifficulty;
  topic: string;
  explanation: string;
};

export type QuizConfiguration = {
  sessionName: string;
  questionCount: number | "all";
  difficulty: DifficultyFilter;
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
  difficulty: DifficultyFilter;
  requestedQuestionCount: QuizConfiguration["questionCount"];
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
