import { describe, expect, it } from "vitest";

import {
  createQuizSession,
  buildAnswerReviews,
  calculateQuizResult,
  calculateRemainingSeconds,
  filterAnswerReviews,
  getAnsweredCount,
  filterQuestionsByDifficulty,
  isQuizComplete,
  selectRandomQuestions,
  shuffleQuestions,
  toggleFlaggedQuestion,
  updateQuizAnswer,
} from "@/lib/quiz";
import type { Question } from "@/types/quiz";
import type { QuizAnswer, StoredQuizResult } from "@/types/quiz";
import { parseQuizResultSnapshot, parseQuizSessionSnapshot } from "@/lib/storage";

const questions: Question[] = [
  {
    id: "q1",
    number: 1,
    question: "One?",
    options: [
      { id: "A", text: "A" },
      { id: "B", text: "B" },
    ],
    correctAnswer: "A",
    difficulty: "mudah",
    topic: "sample",
    explanation: "Because A.",
  },
  {
    id: "q2",
    number: 2,
    question: "Two?",
    options: [
      { id: "A", text: "A" },
      { id: "B", text: "B" },
    ],
    correctAnswer: "B",
    difficulty: "sedang",
    topic: "sample",
    explanation: "Because B.",
  },
  {
    id: "q3",
    number: 3,
    question: "Three?",
    options: [
      { id: "A", text: "A" },
      { id: "B", text: "B" },
    ],
    correctAnswer: "A",
    difficulty: "sulit",
    topic: "sample",
    explanation: "Because A.",
  },
];

describe("quiz utilities", () => {
  it("shuffles without losing questions", () => {
    const shuffled = shuffleQuestions(questions, () => 0);

    expect(shuffled).toHaveLength(questions.length);
    expect(shuffled.map((question) => question.id).sort()).toEqual(["q1", "q2", "q3"]);
    expect(shuffled).not.toBe(questions);
  });

  it("selects the requested number of random questions", () => {
    expect(selectRandomQuestions(questions, 2, () => 0.5)).toHaveLength(2);
    expect(selectRandomQuestions(questions, "all", () => 0.5)).toHaveLength(3);
    expect(selectRandomQuestions(questions, 99, () => 0.5)).toHaveLength(3);
  });

  it("filters questions by difficulty", () => {
    expect(filterQuestionsByDifficulty(questions, "mudah").map((question) => question.id)).toEqual(["q1"]);
    expect(filterQuestionsByDifficulty(questions, "semua")).toHaveLength(3);
  });

  it("checks completion from answer state", () => {
    const session: { questionIds: string[]; answers: Record<string, QuizAnswer> } = {
      questionIds: questions.map((question) => question.id),
      answers: {
        q1: { questionId: "q1", selectedOptionId: "A", answeredAt: "now" },
        q2: { questionId: "q2", selectedOptionId: "B", answeredAt: "now" },
        q3: { questionId: "q3", selectedOptionId: null, answeredAt: null },
      },
    };

    expect(getAnsweredCount(session)).toBe(2);
    expect(isQuizComplete(session)).toBe(false);
  });

  it("creates a stable session with ordered question ids and timer timestamps", () => {
    const session = createQuizSession(
      {
        sessionName: "Latihan Malam",
        questionCount: 2,
        difficulty: "semua",
        timeLimitMinutes: 10,
      },
      questions,
      {
        idFactory: () => "session-1",
        now: () => new Date("2026-09-01T00:00:00.000Z"),
        random: () => 0,
      },
    );

    expect(session.id).toBe("session-1");
    expect(session.questionIds).toHaveLength(2);
    expect(Object.keys(session.answers).sort()).toEqual([...session.questionIds].sort());
    expect(session.startedAt).toBe("2026-09-01T00:00:00.000Z");
    expect(session.expiresAt).toBe("2026-09-01T00:10:00.000Z");
    expect(session.status).toBe("active");
  });

  it("updates answers without double-counting and toggles flags", () => {
    const session = createQuizSession(
      { sessionName: "", questionCount: "all", difficulty: "semua", timeLimitMinutes: null },
      questions,
      { idFactory: () => "session-1", now: () => new Date("2026-09-01T00:00:00.000Z"), random: () => 0 },
    );
    const firstQuestionId = session.questionIds[0];
    const answered = updateQuizAnswer(session, firstQuestionId, "A", "now");
    const changed = updateQuizAnswer(answered, firstQuestionId, "B", "later");
    const flagged = toggleFlaggedQuestion(changed, firstQuestionId);
    const unflagged = toggleFlaggedQuestion(flagged, firstQuestionId);

    expect(getAnsweredCount(changed)).toBe(1);
    expect(changed.answers[firstQuestionId].selectedOptionId).toBe("B");
    expect(flagged.flaggedQuestionIds).toEqual([firstQuestionId]);
    expect(unflagged.flaggedQuestionIds).toEqual([]);
  });

  it("calculates timer expiry from timestamps", () => {
    expect(calculateRemainingSeconds(null)).toBeNull();
    expect(calculateRemainingSeconds("2026-09-01T00:05:00.000Z", new Date("2026-09-01T00:04:30.000Z"))).toBe(30);
    expect(calculateRemainingSeconds("2026-09-01T00:05:00.000Z", new Date("2026-09-01T00:06:00.000Z"))).toBe(0);
  });

  it("generates result counts for incorrect and unanswered answers", () => {
    const session = createQuizSession(
      { sessionName: "Result", questionCount: "all", difficulty: "semua", timeLimitMinutes: null },
      questions,
      { idFactory: () => "session-1", now: () => new Date("2026-09-01T00:00:00.000Z"), random: () => 0 },
    );
    const firstAnswered = updateQuizAnswer(session, session.questionIds[0], "A", "now");
    const secondAnswered = updateQuizAnswer(firstAnswered, session.questionIds[1], "A", "now");
    const result = calculateQuizResult(secondAnswered, questions, "2026-09-01T00:01:00.000Z");

    expect(result.correct).toBe(1);
    expect(result.incorrect).toBe(1);
    expect(result.unanswered).toBe(1);
    expect(result.scorePercentage).toBe(33);
  });

  it("builds answer reviews, resolves option text, and preserves session order", () => {
    const storedResult: StoredQuizResult = {
      version: 1,
      id: "result-1",
      sessionName: "Review",
      scorePercentage: 33,
      totalQuestions: 3,
      correct: 1,
      incorrect: 1,
      unanswered: 1,
      startedAt: "2026-09-01T00:00:00.000Z",
      completedAt: "2026-09-01T00:01:00.000Z",
      durationSeconds: 60,
      questionIds: ["q2", "q1", "q3"],
      answers: {
        q1: { questionId: "q1", selectedOptionId: "B", answeredAt: "now" },
        q2: { questionId: "q2", selectedOptionId: "B", answeredAt: "now" },
        q3: { questionId: "q3", selectedOptionId: null, answeredAt: null },
      },
      flaggedQuestionIds: ["q1"],
    };
    const reviews = buildAnswerReviews(storedResult, questions);

    expect(reviews.map((review) => review.question.id)).toEqual(["q2", "q1", "q3"]);
    expect(reviews.map((review) => review.status)).toEqual(["correct", "incorrect", "unanswered"]);
    expect(reviews[1].selectedAnswer?.text).toBe("B");
    expect(reviews[1].correctAnswer.text).toBe("A");
    expect(reviews[1].isFlagged).toBe(true);
  });

  it("filters answer reviews by all result categories", () => {
    const storedResult: StoredQuizResult = {
      version: 1,
      id: "result-1",
      sessionName: "Review",
      scorePercentage: 33,
      totalQuestions: 3,
      correct: 1,
      incorrect: 1,
      unanswered: 1,
      startedAt: "2026-09-01T00:00:00.000Z",
      completedAt: "2026-09-01T00:01:00.000Z",
      durationSeconds: 60,
      questionIds: ["q1", "q2", "q3"],
      answers: {
        q1: { questionId: "q1", selectedOptionId: "A", answeredAt: "now" },
        q2: { questionId: "q2", selectedOptionId: "A", answeredAt: "now" },
        q3: { questionId: "q3", selectedOptionId: null, answeredAt: null },
      },
      flaggedQuestionIds: [],
    };
    const reviews = buildAnswerReviews(storedResult, questions);

    expect(filterAnswerReviews(reviews, "semua")).toHaveLength(3);
    expect(filterAnswerReviews(reviews, "benar")).toHaveLength(1);
    expect(filterAnswerReviews(reviews, "salah")).toHaveLength(1);
    expect(filterAnswerReviews(reviews, "kosong")).toHaveLength(1);
  });

  it("rejects malformed or incomplete stored session data", () => {
    expect(parseQuizSessionSnapshot("{bad json")).toBeNull();
    expect(parseQuizSessionSnapshot(JSON.stringify({ version: 99 }))).toBeNull();
    expect(
      parseQuizSessionSnapshot(
        JSON.stringify({
          version: 1,
          id: "session-1",
          sessionName: "Broken",
          questionIds: ["q1"],
          answers: {},
          flaggedQuestionIds: [],
          currentQuestionIndex: 4,
          startedAt: "2026-09-01T00:00:00.000Z",
          expiresAt: null,
          status: "active",
        }),
      ),
    ).toBeNull();
  });

  it("rejects malformed or incomplete stored result data", () => {
    expect(parseQuizResultSnapshot("{bad json")).toBeNull();
    expect(
      parseQuizResultSnapshot(
        JSON.stringify({
          version: 1,
          id: "result-1",
          sessionName: "Broken",
          totalQuestions: 2,
          questionIds: ["q1"],
        }),
      ),
    ).toBeNull();
  });
});
