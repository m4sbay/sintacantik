import { questions as orthoQuestions } from "@/data/questions";
import { ORTHO_MODULE_ID } from "@/data/question-modules";
import { validateQuestions } from "@/lib/questions";
import type { Question } from "@/types/quiz";

import { tryoutQuestions } from "@/data/tryout-questions";
export const questions: Question[] = [
  ...orthoQuestions.map((question) => ({ ...question, moduleId: ORTHO_MODULE_ID })),
  ...tryoutQuestions,
];

validateQuestions(questions);
