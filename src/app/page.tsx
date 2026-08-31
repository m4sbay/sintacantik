import { BookOpen, Database, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SetupSessionForm } from "@/components/quiz/setup-session-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { questions } from "@/data/questions";
import { countQuestionsByDifficulty } from "@/lib/quiz";

const counts = countQuestionsByDifficulty(questions);

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--primary)]">sintacantik</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
              Buat sesi latihan
            </h1>
            <p className="mt-3 max-w-xl text-base text-[var(--text-secondary)]">
              Atur sesi belajarmu sebelum mulai.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <section className="grid gap-5">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <BookOpen aria-hidden="true" className="text-[var(--primary)]" size={22} />
              <h2 className="text-xl font-semibold">Konfigurasi Sesi</h2>
            </div>

            <SetupSessionForm />
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Bank Soal</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Data tervalidasi dari soal.md.</p>
                </div>
                <Database aria-hidden="true" className="text-[var(--primary)]" size={22} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Badge tone="primary">{questions.length} soal</Badge>
                <Badge tone="success">{counts.mudah} mudah</Badge>
                <Badge tone="warning">{counts.sedang} sedang</Badge>
                <Badge tone="danger">{counts.sulit} sulit</Badge>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck aria-hidden="true" className="mt-1 text-[var(--success)]" size={22} />
                <div>
                  <h2 className="text-lg font-semibold">Validasi Build-Time</h2>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Database soal akan gagal build jika ID, opsi, difficulty, atau pembahasan tidak valid.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
