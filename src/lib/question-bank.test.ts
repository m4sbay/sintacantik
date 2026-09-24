import { describe, expect, it } from "vitest";
import { questions } from "@/data/question-bank";
import { questionModules } from "@/data/question-modules";
import { tryoutQuestions } from "@/data/tryout-questions";
import { createQuizSession, calculateQuizResult, buildAnswerReviews, getQuestionsByModules, countQuestionsByDifficulty } from "@/lib/quiz";
import { validateQuestions } from "@/lib/questions";

const configuration = { sessionName: "Integration", selectedModuleIds: [] as string[], timeLimitMinutes: null };

describe("integrated question bank", () => {
  it("validates all source records with globally unique stable IDs", () => {
    expect(() => validateQuestions(questions)).not.toThrow();
    expect(tryoutQuestions).toHaveLength(355);
    expect(questions).toHaveLength(415);
    expect(new Set(questions.map((question) => question.id)).size).toBe(415);
    expect(countQuestionsByDifficulty(questions)).toEqual({ mudah: 19, sedang: 34, sulit: 7, unknown: 355 });
  });
  for (const questionModule of questionModules) {
    it(`isolates ${questionModule.label} and scores all source keys correctly`, () => {
      const pool = getQuestionsByModules(questions, [questionModule.id]);
      const expected = questionModule.id === "modul-ortho" ? 60 : questionModule.id === "etik-kedokteran-gigi" ? 25 : 30;
      expect(pool).toHaveLength(expected);
      expect(pool.every((question) => question.moduleId === questionModule.id)).toBe(true);
      const session = createQuizSession({ ...configuration, selectedModuleIds: [questionModule.id] }, questions);
      for (const question of pool) session.answers[question.id].selectedOptionId = question.correctAnswer;
      const result = calculateQuizResult(session, questions, new Date().toISOString());
      expect(result.correct).toBe(expected);
      expect(result.scorePercentage).toBe(100);
      const reviews = buildAnswerReviews({ ...result, version: 1, questionIds: session.questionIds, answers: session.answers, flaggedQuestionIds: [] }, questions);
      expect(reviews).toHaveLength(expected);
      expect(reviews.every((review) => review.status === "correct")).toBe(true);
    });
  }
  it("combines only selected modules even with repeated selection IDs", () => {
    const selectedModuleIds = ["oral-medicine", "orthodonti", "paedodonti", "orthodonti"];
    const session = createQuizSession({ ...configuration, selectedModuleIds }, questions);
    expect(session.questionIds).toHaveLength(90);
    expect(new Set(session.questionIds).size).toBe(90);
    const pool = questions.filter((question) => selectedModuleIds.includes(question.moduleId ?? ""));
    expect([...session.questionIds].sort()).toEqual(pool.map((question) => question.id).sort());
  });
  it("keeps every source image question and a deterministic public path", () => {
    const images = questions.filter((question) => question.image);
    expect(images.map((question) => [question.moduleId, question.number])).toEqual([
      ["konservasi", 21], ["orthodonti", 6], ["radiologi-dental", 19], ["dental-material", 9],
    ]);
    for (const question of images) expect(question.image?.src).toBe(`/questions/${question.moduleId}/question-${String(question.number).padStart(2, "0")}.webp`);
  });
});
