import type { Question, QuestionDifficulty, QuestionOptionId } from "@/types/quiz";

const VALID_DIFFICULTIES = new Set<QuestionDifficulty>(["mudah", "sedang", "sulit"]);

export function validateQuestions(questions: Question[]): void {
  const errors: string[] = [];
  const ids = new Set<string>();

  if (questions.length !== 60) {
    errors.push(`Expected 60 questions, received ${questions.length}.`);
  }

  for (const question of questions) {
    if (!question.id.trim()) errors.push(`Question ${question.number}: id is required.`);
    if (ids.has(question.id)) errors.push(`Question ${question.number}: duplicate id "${question.id}".`);
    ids.add(question.id);

    if (!question.question.trim()) errors.push(`Question ${question.id}: question text is required.`);
    if (!question.topic.trim()) errors.push(`Question ${question.id}: topic is required.`);
    if (!question.explanation.trim()) errors.push(`Question ${question.id}: explanation is required.`);
    if (!VALID_DIFFICULTIES.has(question.difficulty)) {
      errors.push(`Question ${question.id}: invalid difficulty "${question.difficulty}".`);
    }

    if (question.options.length < 2) {
      errors.push(`Question ${question.id}: at least 2 options are required.`);
    }

    const optionIds = new Set<QuestionOptionId>();
    for (const option of question.options) {
      if (optionIds.has(option.id)) errors.push(`Question ${question.id}: duplicate option "${option.id}".`);
      optionIds.add(option.id);
      if (!option.text.trim()) errors.push(`Question ${question.id}: option ${option.id} text is required.`);
    }

    if (!optionIds.has(question.correctAnswer)) {
      errors.push(`Question ${question.id}: correctAnswer "${question.correctAnswer}" is not present in options.`);
    }

    if (question.id === "ortho-042" && question.options.length !== 4) {
      errors.push("Question ortho-042 must keep exactly 4 options.");
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid question database:\n${errors.join("\n")}`);
  }
}
