import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseTryoutModule } from "./parse-tryout.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(root, "bank-soal/tryout");
const manifest = JSON.parse(readFileSync(join(sourceDir, "manifest.json"), "utf8"));
if (!Array.isArray(manifest) || !manifest.length) throw new Error("Empty TRY OUT manifest.");
const ids = new Set();
const files = new Set();
for (const entry of manifest) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id) || entry.id === "modul-ortho" || ids.has(entry.id)) throw new Error(`Invalid/duplicate module ID: ${entry.id}`);
  if (!/^[a-z0-9-]+\.md$/.test(entry.file) || files.has(entry.file)) throw new Error(`Invalid/duplicate source file: ${entry.file}`);
  ids.add(entry.id); files.add(entry.file);
}
for (const file of readdirSync(sourceDir).filter((file) => file.endsWith(".md"))) {
  if (!files.has(file)) throw new Error(`Unregistered Markdown source: ${file}. Add it to manifest.json.`);
}
const parsed = manifest.map(({ id, file }) => ({ file, ...parseTryoutModule(readFileSync(join(sourceDir, file), "utf8"), id, file) }));
const questions = parsed.flatMap((entry) => entry.questions);
if (new Set(questions.map((question) => question.id)).size !== questions.length) throw new Error("Duplicate question IDs.");
const modules = parsed.map((entry) => entry.module);
const images = questions.filter((question) => question.image);
// Read PNG intrinsic dimensions so the browser reserves the correct aspect ratio.
for (const question of images) {
  const path = join(root, "public", question.image.src);
  if (!existsSync(path)) continue;
  const png = readFileSync(path);
  if (png.length < 24 || png.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a" || png.subarray(12, 16).toString() !== "IHDR") {
    throw new Error(`Invalid PNG: ${path}`);
  }
  question.image.width = png.readUInt32BE(16);
  question.image.height = png.readUInt32BE(20);
  if (!question.image.width || !question.image.height) throw new Error(`Invalid PNG dimensions: ${path}`);
}
const warnings = parsed.flatMap((entry) => entry.warnings.map((warning) => `${entry.module.label}: ${warning}`));
const output = `// Generated from bank-soal/tryout/*.md. Do not edit by hand.\nimport type { Question, QuestionModule } from "@/types/quiz";\n\nexport const tryoutModules = ${JSON.stringify(modules, null, 2)} satisfies QuestionModule[];\n\nexport const tryoutQuestions = ${JSON.stringify(questions, null, 2)} satisfies Question[];\n`;
writeFileSync(join(root, "src/data/tryout-questions.ts"), output);
for (const question of images) {
  const imageDir = dirname(join(root, "public", question.image.src));
  mkdirSync(imageDir, { recursive: true });
  writeFileSync(join(imageDir, ".gitkeep"), "");
}
mkdirSync(join(root, "docs"), { recursive: true });
const report = [
  "# Laporan integrasi TRY OUT", "", "Dihasilkan oleh `npm run generate:questions`. Sumber akademik tetap file Markdown asli.", "",
  "| Modul | Soal |", "| --- | ---: |",
  ...parsed.map((entry) => `| ${entry.module.label} | ${entry.questions.length} |`),
  "", `Total TRY OUT: **${questions.length} soal**. Ditambah 60 soal Modul Ortho existing: **${questions.length + 60} soal**.`, "",
  "## Gambar", "", "Path relatif terhadap root project; URL publik menghilangkan awalan `public`. Tidak ada gambar pengganti buatan.", "",
  "| Modul | Nomor sumber | Path file | Status |", "| --- | ---: | --- | --- |",
  ...images.map((question) => `| ${question.topic} | ${question.number} | \`public${question.image.src}\` | ${existsSync(join(root, "public", question.image.src)) ? "Tersedia" : "Belum tersedia"} |`),
  "", "## Catatan data", "",
  ...warnings.map((warning) => `- ${warning}`),
  "- Metadata tingkat kesulitan tidak tersedia di sumber TRY OUT dan tidak diasumsikan.",
  "- Pembahasan yang tidak tersedia ditampilkan sebagai ‘Pembahasan belum tersedia’ tanpa menambah konten akademik.",
  "- Huruf opsi asli (termasuk huruf kecil) dipertahankan untuk tampilan. ID internal A–E mengikuti posisi opsi; kunci dipetakan melalui pasangan label dan teks sumber yang harus cocok persis.",
  "- Seluruh heading soal, jumlah yang dinyatakan sumber, nomor berurutan, teks, opsi, pasangan kunci, ID unik, dan placeholder gambar divalidasi; data ambigu menghentikan generator.", "",
].join("\n");
writeFileSync(join(root, "docs/tryout-integration.md"), report);
console.log(parsed.map((entry) => `${entry.module.label}: ${entry.questions.length} soal`).join("\n"));
console.log(`TRY OUT: ${questions.length} soal, ${images.length} soal bergambar, ${warnings.length} catatan sumber.`);
for (const warning of warnings) console.warn(warning);
