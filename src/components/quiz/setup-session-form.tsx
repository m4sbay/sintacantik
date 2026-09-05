"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { questions } from "@/data/questions";
import { createQuizSession, filterQuestionsByDifficulty } from "@/lib/quiz";
import {
  clearQuizSession,
  clearQuizResult,
  parseQuizSessionSnapshot,
  QUIZ_SESSION_STORAGE_KEY,
  readQuizSessionSnapshot,
  writeQuizSession,
} from "@/lib/storage";
import type { DifficultyFilter, QuizConfiguration } from "@/types/quiz";

const questionCountOptions = [10, 20, 30, 40, 50] as const;
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
  const [questionCount, setQuestionCount] = useState<QuizConfiguration["questionCount"]>(10);
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("semua");
  const [timerOption, setTimerOption] = useState<TimerOption>("none");
  const [customMinutes, setCustomMinutes] = useState("");
  const [hasConfirmedReplace, setHasConfirmedReplace] = useState(false);
  const activeSessionSnapshot = useSyncExternalStore(subscribeToQuizSession, readQuizSessionSnapshot, () => null);
  const activeSession = useMemo(() => {
    const session = parseQuizSessionSnapshot(activeSessionSnapshot);
    return session?.status === "active" ? session : null;
  }, [activeSessionSnapshot]);

  const availableQuestions = useMemo(
    () => filterQuestionsByDifficulty(questions, difficulty).length,
    [difficulty],
  );
  const selectedCount = questionCount === "all" ? availableQuestions : questionCount;
  const parsedCustomMinutes = Number(customMinutes);
  const customTimerIsValid =
    timerOption !== "custom" ||
    (/^\d+$/.test(customMinutes) && parsedCustomMinutes >= 1 && parsedCustomMinutes <= 180);
  const timeLimitMinutes =
    timerOption === "none" ? null : timerOption === "custom" ? parsedCustomMinutes : Number(timerOption);
  const isValid =
    sessionName.length <= 80 &&
    availableQuestions > 0 &&
    selectedCount > 0 &&
    selectedCount <= availableQuestions &&
    customTimerIsValid &&
    (!activeSession || hasConfirmedReplace);
  const difficultyLabel =
    difficulty === "semua" ? "" : ` untuk tingkat ${difficulty[0].toUpperCase()}${difficulty.slice(1)}`;

  function updateDifficulty(nextDifficulty: DifficultyFilter) {
    const nextAvailableQuestions = filterQuestionsByDifficulty(questions, nextDifficulty).length;
    setDifficulty(nextDifficulty);
    setQuestionCount((currentCount) => {
      if (currentCount === "all" || currentCount <= nextAvailableQuestions) return currentCount;
      return "all";
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;

    const configuration: QuizConfiguration = {
      sessionName: sessionName.trim() || "Latihan Soal",
      questionCount,
      difficulty,
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2 text-sm font-medium">
          <span id="question-count-label">Jumlah Soal</span>
          <Select
            value={String(questionCount)}
            aria-labelledby="question-count-label"
            options={[
              ...questionCountOptions.map((count) => ({
                value: String(count),
                label: String(count),
                disabled: count > availableQuestions,
              })),
              { value: "all", label: "Semua" },
            ]}
            onValueChange={(value) => {
              setQuestionCount(value === "all" ? "all" : Number(value));
            }}
          />
        </div>

        <div className="grid gap-2 text-sm font-medium">
          <span id="difficulty-label">Tingkat Kesulitan</span>
          <Select
            value={difficulty}
            aria-labelledby="difficulty-label"
            options={[
              { value: "semua", label: "Semua Tingkat" },
              { value: "mudah", label: "Mudah" },
              { value: "sedang", label: "Sedang" },
              { value: "sulit", label: "Sulit" },
            ]}
            onValueChange={(value) => updateDifficulty(value as DifficultyFilter)}
          />
        </div>
      </div>

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
        {availableQuestions} soal tersedia{difficultyLabel}.
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
