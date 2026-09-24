"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { questions } from "@/data/question-bank";
import { createQuizSession, getQuestionsByModules } from "@/lib/quiz";
import {
  clearQuizSession,
  clearQuizResult,
  parseQuizSessionSnapshot,
  QUIZ_SESSION_STORAGE_KEY,
  readQuizSessionSnapshot,
  writeQuizSession,
} from "@/lib/storage";
import { ModuleSelector } from "@/components/quiz/module-selector";
import { ORTHO_MODULE_ID, questionModules } from "@/data/question-modules";
import type { QuizConfiguration } from "@/types/quiz";

type TimerOption = "none" | "10" | "15" | "30" | "45" | "60" | "custom";

function subscribeToQuizSession(onStoreChange: () => void): () => void {
  window.addEventListener(QUIZ_SESSION_STORAGE_KEY, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(QUIZ_SESSION_STORAGE_KEY, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function SetupSessionForm() {
  const router = useRouter();
  const [sessionName, setSessionName] = useState("");
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([ORTHO_MODULE_ID]);
  const [timerOption, setTimerOption] = useState<TimerOption>("none");
  const [customMinutes, setCustomMinutes] = useState("");
  const [hasConfirmedReplace, setHasConfirmedReplace] = useState(false);
  const activeSessionSnapshot = useSyncExternalStore(subscribeToQuizSession, readQuizSessionSnapshot, () => null);
  const activeSession = useMemo(() => {
    const session = parseQuizSessionSnapshot(activeSessionSnapshot);
    return session?.status === "active" ? session : null;
  }, [activeSessionSnapshot]);

  const moduleOptions = useMemo(() => questionModules.map((module) => ({
    ...module, questionCount: getQuestionsByModules(questions, [module.id]).length,
  })), []);
  const availableQuestions = getQuestionsByModules(questions, selectedModuleIds).length;
  const hasEmptyModules = moduleOptions.some((module) => selectedModuleIds.includes(module.id) && module.questionCount === 0);
  const parsedCustomMinutes = Number(customMinutes);
  const customTimerIsValid =
    timerOption !== "custom" ||
    (/^\d+$/.test(customMinutes) && parsedCustomMinutes >= 1 && parsedCustomMinutes <= 180);
  const timeLimitMinutes =
    timerOption === "none" ? null : timerOption === "custom" ? parsedCustomMinutes : Number(timerOption);
  const isValid =
    sessionName.length <= 80 &&
    availableQuestions > 0 &&
    selectedModuleIds.length > 0 &&
    customTimerIsValid &&
    (!activeSession || hasConfirmedReplace);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;

    const configuration: QuizConfiguration = {
      sessionName: sessionName.trim() || "Latihan Soal",
      selectedModuleIds,
      timeLimitMinutes,
    };
    const session = createQuizSession(configuration, questions);

    clearQuizResult();
    writeQuizSession(session);
    router.push("/quiz");
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-sm font-medium">
        Nama Sesi
        <Input
          placeholder="Latihan Soal"
          maxLength={80}
          value={sessionName}
          onChange={(event) => setSessionName(event.target.value)}
        />
      </label>

      <ModuleSelector modules={moduleOptions} value={selectedModuleIds} onChange={setSelectedModuleIds} />

      <div className="grid gap-2 text-sm font-medium">
        <span id="timer-label">Waktu</span>
        <Select
          value={timerOption}
          aria-labelledby="timer-label"
          options={[
            { value: "none", label: "Tanpa Timer" },
            { value: "10", label: "10 Menit" },
            { value: "15", label: "15 Menit" },
            { value: "30", label: "30 Menit" },
            { value: "45", label: "45 Menit" },
            { value: "60", label: "60 Menit" },
            { value: "custom", label: "Custom" },
          ]}
          onValueChange={(value) => setTimerOption(value as TimerOption)}
        />
      </div>

      {timerOption === "custom" ? (
        <label className="grid gap-2 text-sm font-medium">
          Durasi (menit)
          <Input
            inputMode="numeric"
            min={1}
            max={180}
            pattern="[0-9]*"
            placeholder="30"
            type="number"
            value={customMinutes}
            onChange={(event) => setCustomMinutes(event.target.value)}
          />
          {customMinutes && !customTimerIsValid ? (
            <span className="text-sm text-[var(--danger)]">Masukkan durasi 1 sampai 180 menit.</span>
          ) : null}
        </label>
      ) : null}

      <p className="text-sm text-[var(--text-secondary)]" aria-live="polite">
        {selectedModuleIds.length === 0
          ? "Pilih minimal 1 Modul Soal untuk memulai latihan."
          : availableQuestions === 0
            ? "Soal untuk modul yang dipilih belum tersedia."
            : `${availableQuestions} soal akan digunakan dari modul yang dipilih.`}
        {hasEmptyModules && availableQuestions > 0 ? " Modul yang belum memiliki soal dilewati pada sesi ini." : ""}
      </p>

      {activeSession ? (
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
          <p className="text-sm font-medium">Masih ada sesi yang belum selesai.</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" variant="secondary" onClick={() => router.push("/quiz")}>
              Lanjutkan Sesi
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant={hasConfirmedReplace ? "danger" : "ghost"}
              onClick={() => {
                clearQuizSession();
                setHasConfirmedReplace(true);
              }}
            >
              Mulai Sesi Baru
            </Button>
          </div>
        </div>
      ) : null}

      <Button className="mt-2 w-full" disabled={!isValid} type="submit">
        Mulai Latihan
      </Button>
    </form>
  );
}
