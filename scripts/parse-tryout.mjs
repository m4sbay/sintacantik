/** Parse the verified Markdown format without rewriting academic content. */
export function parseTryoutModule(source, moduleId, sourceFile) {
  const fail = (message) => { throw new Error(`${sourceFile}: ${message}`); };
  const text = source.replace(/\r\n?/g, "\n");
  const title = text.match(/^# Modul (.+)$/m)?.[1]?.trim();
  const declaredCount = Number(text.match(/^> Total soal: (\d+)\s*$/m)?.[1]);
  if (!title || !declaredCount) fail("Missing module title or total soal.");
  const headings = [...text.matchAll(/^## Soal (\d+)[ \t]*$/gm)];
  if (headings.length !== declaredCount || (text.match(/^## Soal\b/gm) ?? []).length !== headings.length) {
    fail(`Declared ${declaredCount} questions; found ${headings.length} valid question headings.`);
  }
  const warnings = [];
  const numbers = new Set();
  const questions = headings.map((heading, index) => {
    const number = Number(heading[1]);
    if (number < 1 || numbers.has(number)) fail(`Invalid or duplicate question number ${number}.`);
    numbers.add(number);
    const block = text.slice(heading.index + heading[0].length, headings[index + 1]?.index ?? text.length).trim().replace(/\n---\s*$/, "").trim();
    const fields = [...block.matchAll(/^\*\*([^\n]+):\*\*[ \t]*(?:\n|$)/gm)];
    const values = new Map();
    for (const [fieldIndex, field] of fields.entries()) {
      if (values.has(field[1])) fail(`Soal ${number}: duplicate field ${field[1]}.`);
      values.set(field[1], block.slice(field.index + field[0].length, fields[fieldIndex + 1]?.index ?? block.length).trim());
    }
    if (fields[0]?.index !== 0 || fields[0]?.[1] !== "Pertanyaan") fail(`Soal ${number}: unexpected content before Pertanyaan.`);
    for (const field of values.keys()) {
      if (!["Pertanyaan", "Pilihan Jawaban", "Jawaban Benar", "Gambar", "Gambar/Radiograf", "Pembahasan"].includes(field)) fail(`Soal ${number}: unsupported field ${field}.`);
    }
    const question = values.get("Pertanyaan");
    const rawOptions = values.get("Pilihan Jawaban") ?? "";
    const rawAnswer = values.get("Jawaban Benar") ?? "";
    if (!question) fail(`Soal ${number}: empty question.`);
    const optionLines = rawOptions.split("\n").filter((line) => line.trim());
    if (optionLines.length < 2 || optionLines.length > 5) fail(`Soal ${number}: expected 2–5 options.`);
    const options = optionLines.map((line, optionIndex) => {
      const match = line.match(/^- ([A-Ea-e])\. (.+)$/);
      if (!match?.[2]?.trim()) fail(`Soal ${number}: invalid option ${line}.`);
      return { id: "ABCDE"[optionIndex], sourceLabel: match[1], text: match[2].trim() };
    });
    const answer = rawAnswer.match(/^([A-Ea-e])\. (.+)$/);
    if (!answer) fail(`Soal ${number}: invalid answer format.`);
    const matches = options.filter((option) => option.sourceLabel === answer[1] && option.text === answer[2].trim());
    if (matches.length !== 1) fail(`Soal ${number}: answer must match exactly one source option by label and text.`);
    if (new Set(options.map((option) => option.sourceLabel.toUpperCase())).size !== options.length) {
      warnings.push(`Soal ${number}: duplicate source option labels (${options.map((option) => option.sourceLabel).join(", ")}); original labels preserved, unique internal IDs assigned by position. Key remains ${rawAnswer}.`);
    }
    const imageFields = [...values.keys()].filter((field) => field.startsWith("Gambar"));
    const hasPlaceholder = /\[PLACEHOLDER GAMBAR(?:\/RADIOGRAF)?\b/i.test(block);
    if (imageFields.length > 1 || (hasPlaceholder && imageFields.length !== 1)) fail(`Soal ${number}: ambiguous image placeholder.`);
    if (imageFields.length && !/\[PLACEHOLDER GAMBAR(?:\/RADIOGRAF)?\b/i.test(values.get(imageFields[0]))) fail(`Soal ${number}: unsupported image format.`);
    const image = hasPlaceholder ? {
      src: `/questions/${moduleId}/question-${String(number).padStart(2, "0")}.webp`,
      alt: `Gambar soal ${number} — ${title}`,
    } : undefined;
    const explanation = values.get("Pembahasan");
    return {
      id: `tryout-${moduleId}-${String(number).padStart(3, "0")}`,
      moduleId, number, question, options, correctAnswer: matches[0].id, topic: title,
      ...(explanation ? { explanation } : {}),
      ...(image ? { image } : {}),
    };
  });
  // A missing/repeated number should never silently drop a source question.
  for (let number = 1; number <= declaredCount; number++) if (!numbers.has(number)) fail(`Missing Soal ${number}.`);
  return { module: { id: moduleId, label: title, group: "tryout" }, questions, warnings };
}
