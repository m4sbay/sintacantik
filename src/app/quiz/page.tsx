import type { Metadata } from "next";

import { QuizShell } from "@/components/quiz/quiz-shell";

export const metadata: Metadata = {
  title: "Quiz — Sintacantik",
};

export default function QuizPage() {
  return <QuizShell />;
}
