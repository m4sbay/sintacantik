import type { Metadata } from "next";

import { QuizShell } from "@/components/quiz/quiz-shell";

export const metadata: Metadata = {
  title: "simoe",
};

export default function QuizPage() {
  return <QuizShell />;
}
