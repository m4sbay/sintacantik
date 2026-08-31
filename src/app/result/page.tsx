import type { Metadata } from "next";

import { ResultPageContent } from "@/components/result/result-page-content";

export const metadata: Metadata = {
  title: "Hasil Latihan — Sintacantik",
};

export default function ResultPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <ResultPageContent />
    </main>
  );
}
