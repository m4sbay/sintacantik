import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuestionExplanation } from "@/components/result/question-explanation";
import { AnswerReviewCard } from "@/components/result/answer-review-card";
import { questions } from "@/data/question-bank";
import { tryoutQuestions } from "@/data/tryout-questions";
import { validateQuestions } from "@/lib/questions";
import type { AnswerReview } from "@/types/quiz";

const renderExplanation = (explanation?: string) => renderToStaticMarkup(createElement(QuestionExplanation, { explanation }));

describe("question explanations", () => {
  it("accepts missing, empty and whitespace explanations in both validation and UI", () => {
    for (const explanation of [undefined, "", " \n\t "]) {
      expect(() => validateQuestions([{ ...questions[0], explanation }])).not.toThrow();
      expect(renderExplanation(explanation)).toContain("Pembahasan belum tersedia.");
    }
  });

  it("renders paragraphs and bullet lists without interpreting HTML", () => {
    const html = renderExplanation("Paragraf pertama.\n\nParagraf kedua.\n\n- Poin satu\n- Poin dua\n\n<script>teks</script>");
    expect(html.match(/<p\b/g)).toHaveLength(3);
    expect(html.match(/<li\b/g)).toHaveLength(2);
    expect(html).toContain("&lt;script&gt;teks&lt;/script&gt;");
    expect(html).not.toContain("<script>");
  });

  it.each(["correct", "incorrect", "unanswered"] as const)("shows the existing explanation for %s answers", (status) => {
    expect(tryoutQuestions).toHaveLength(355);
    for (const question of tryoutQuestions) {
      expect(question.explanation?.trim()).toBeTruthy();
      const correctAnswer = question.options.find((option) => option.id === question.correctAnswer)!;
      const review: AnswerReview = {
        question, correctAnswer, status, sessionIndex: 0, isFlagged: false,
        selectedAnswer: status === "unanswered" ? null : status === "correct" ? correctAnswer : question.options.find((option) => option.id !== question.correctAnswer)!,
      };
      const html = renderToStaticMarkup(createElement(AnswerReviewCard, { review }));
      expect(html).toContain('aria-label="Pembahasan soal"');
      expect(html).toContain("Jawaban kamu");
      expect(html).toContain("Jawaban benar");
      expect(html).not.toContain("Pembahasan belum tersedia.");
    }
  });
});
