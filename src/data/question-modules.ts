import { tryoutModules } from "@/data/tryout-questions";
import type { QuestionModule } from "@/types/quiz";

export const ORTHO_MODULE_ID = "modul-ortho";

export const questionModuleGroups = [
  { id: "ortho", label: "Latihan Ortho" },
  { id: "tryout", label: "TRY OUT" },
] as const;

export const questionModules: QuestionModule[] = [
  { id: ORTHO_MODULE_ID, label: "Modul Ortho", group: "ortho" },
  ...tryoutModules,
];
