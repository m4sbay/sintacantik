import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { parseTryoutModule } from "./parse-tryout.mjs";

const manifest = JSON.parse(readFileSync(new URL("../bank-soal/tryout/manifest.json", import.meta.url), "utf8"));
const sourceFor = (file) => readFileSync(new URL(`../bank-soal/tryout/${file}`, import.meta.url), "utf8");

describe("verified Markdown parser", () => {
  for (const { id, file } of manifest) {
    it(`preserves every question, option and source key in ${id}`, () => {
      const source = sourceFor(file);
      const parsed = parseTryoutModule(source, id, file);
      const blocks = source.split(/^## Soal \d+\s*$/m).slice(1);
      expect(parsed.questions).toHaveLength(blocks.length);
      expect(parsed.module.label).toBe(source.split("\n")[0].replace("# Modul ", ""));
      for (const [index, block] of blocks.entries()) {
        const question = parsed.questions[index];
        const sourceQuestion = block.split("**Pertanyaan:**")[1].split(/\*\*(?:Gambar(?:\/Radiograf)?|Pilihan Jawaban):\*\*/)[0].trim();
        expect(question.question).toBe(sourceQuestion);
        const options = [...block.matchAll(/^- ([A-Ea-e])\. (.+)$/gm)];
        expect(question.options.map((option) => `${option.sourceLabel}. ${option.text}`)).toEqual(options.map((option) => `${option[1]}. ${option[2].trim()}`));
        const answer = block.match(/\*\*Jawaban Benar:\*\*\s*([^\n]+)/)[1].trim();
        const correct = question.options.find((option) => option.id === question.correctAnswer);
        expect(`${correct.sourceLabel}. ${correct.text}`).toBe(answer);
        expect(new Set(question.options.map((option) => option.id)).size).toBe(options.length);
        expect(Boolean(question.image)).toBe(/\[PLACEHOLDER GAMBAR/.test(block));
      }
    });
  }
  const file = "modul-konservasi-verified.md";
  const source = sourceFor(file);
  it("reports duplicate source labels without changing them or the answer", () => {
    const result = parseTryoutModule(source, "konservasi", file);
    expect(result.warnings).toHaveLength(1);
    expect(result.questions[1].options.map((option) => option.sourceLabel)).toEqual(["A", "B", "C", "C", "D"]);
    expect(result.questions[1].correctAnswer).toBe("B");
  });
  it("fails closed for missing questions, options, mismatched keys and unsupported fields", () => {
    const invalidSources = [
      source.replace("Total soal: 30", "Total soal: 31"),
      source.replace("## Soal 2", "## Soal 1"),
      source.replace("- B. Previously treated\n", ""),
      source.replace("**Jawaban Benar:**  \nB. Previously treated", "**Jawaban Benar:**  \nB. unknown"),
      source.replace("**Pilihan Jawaban:**", "**Pilihan:**"),
    ];
    for (const invalid of invalidSources) expect(() => parseTryoutModule(invalid, "konservasi", file)).toThrow();
  });
});

describe("optional source explanations", () => {
  const file = manifest[0].file;
  const source = sourceFor(file);
  it("adds real explanation text without changing question/options/key", () => {
    const original = parseTryoutModule(source, manifest[0].id, file);
    const text = "Paragraf pertama.\n\n- Poin satu\n- Poin dua";
    const next = source.replace(/\n---\s*\n\n## Soal 2/, `\n**Pembahasan:**\n${text}\n\n---\n\n## Soal 2`);
    const parsed = parseTryoutModule(next, manifest[0].id, file);
    expect(parsed.questions[0]).toEqual({ ...original.questions[0], explanation: text });
    expect(parsed.questions.slice(1)).toEqual(original.questions.slice(1));
  });
  it("treats an empty explanation as unavailable", () => {
    const next = source.replace(/\n---\s*\n\n## Soal 2/, "\n**Pembahasan:**\n   \n\n---\n\n## Soal 2");
    expect(parseTryoutModule(next, manifest[0].id, file).questions[0].explanation).toBeUndefined();
  });
});
