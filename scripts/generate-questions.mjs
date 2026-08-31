import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourcePath = join(root, "soal.md");
const outputPath = join(root, "src", "data", "questions.ts");
const text = readFileSync(sourcePath, "utf8");
const allowedDifficulties = new Set(["mudah", "sedang", "sulit"]);
const optionIds = new Set(["A", "B", "C", "D", "E"]);

function requiredMatch(body, regex, label, number) {
  const match = body.match(regex);
  if (!match?.[1]?.trim()) {
    throw new Error(`Soal ${number}: missing ${label}`);
  }
  return match[1].trim();
}

const parts = text.split(/^## Soal (\d{2})\s*$/m).slice(1);
const questions = [];

for (let index = 0; index < parts.length; index += 2) {
  const numberText = parts[index];
  const body = parts[index + 1];
  const number = Number(numberText);
  const id = requiredMatch(body, /- \*\*id:\*\* `([^`]+)`/, "id", numberText);
  const difficulty = requiredMatch(body, /- \*\*difficulty:\*\* `([^`]+)`/, "difficulty", numberText);
  const topic = requiredMatch(body, /- \*\*topic:\*\* `([^`]+)`/, "topic", numberText);
  const correctAnswer = requiredMatch(body, /- \*\*correct_answer:\*\* `([^`]+)`/, "correct_answer", numberText);
  const question = requiredMatch(body, /### Pertanyaan\s*\n\n([\s\S]*?)\n\n### Pilihan/, "question", numberText);
  const optionBlock = requiredMatch(body, /### Pilihan\s*\n\n([\s\S]*?)\n\n### Pembahasan/, "options", numberText);
  const explanation = requiredMatch(body, /### Pembahasan\s*\n\n([\s\S]*?)(?:\n\n---|\s*$)/, "explanation", numberText);
  const options = [...optionBlock.matchAll(/^- \*\*([A-E])\.\*\* (.*)$/gm)].map((match) => ({
    id: match[1],
    text: match[2].trim(),
  }));

  questions.push({ id, number, question, options, correctAnswer, difficulty, topic, explanation });
}

const errors = [];
const ids = new Set();

if (questions.length !== 60) errors.push(`Expected 60 questions, received ${questions.length}.`);

for (const question of questions) {
  if (ids.has(question.id)) errors.push(`Soal ${question.number}: duplicate id ${question.id}.`);
  ids.add(question.id);
  if (!allowedDifficulties.has(question.difficulty)) {
    errors.push(`Soal ${question.number}: invalid difficulty ${question.difficulty}.`);
  }
  if (!optionIds.has(question.correctAnswer)) {
    errors.push(`Soal ${question.number}: invalid correct_answer ${question.correctAnswer}.`);
  }
  const currentOptionIds = new Set(question.options.map((option) => option.id));
  if (currentOptionIds.size !== question.options.length) {
    errors.push(`Soal ${question.number}: duplicate option id.`);
  }
  if (!currentOptionIds.has(question.correctAnswer)) {
    errors.push(`Soal ${question.number}: correct_answer ${question.correctAnswer} is not in options.`);
  }
  if (question.id === "ortho-042" && question.options.length !== 4) {
    errors.push("Soal 42 must keep exactly 4 options.");
  }
  if (question.id !== "ortho-042" && question.options.length < 2) {
    errors.push(`Soal ${question.number}: must have at least 2 options.`);
  }
}

if (errors.length > 0) {
  throw new Error(`Invalid soal.md:\n${errors.join("\n")}`);
}

const output = `import { validateQuestions } from "@/lib/questions";
import type { Question } from "@/types/quiz";

// Generated from soal.md. Do not edit by hand; run npm run generate:questions.
export const questions = ${JSON.stringify(questions, null, 2)} satisfies Question[];

validateQuestions(questions);
`;

writeFileSync(outputPath, output);

const distribution = questions.reduce(
  (counts, question) => {
    counts[question.difficulty] += 1;
    return counts;
  },
  { mudah: 0, sedang: 0, sulit: 0 },
);

console.log(
  [
    `Total soal ditemukan: ${questions.length}`,
    `Total jawaban lengkap: ${questions.filter((question) => question.correctAnswer).length}`,
    "Total soal bermasalah: 0",
    "Distribusi difficulty:",
    `- Mudah: ${distribution.mudah}`,
    `- Sedang: ${distribution.sedang}`,
    `- Sulit: ${distribution.sulit}`,
    "Potensi duplicate: tidak ada duplicate ID",
    "Potensi data tidak lengkap: tidak ada field wajib kosong",
  ].join("\n"),
);
