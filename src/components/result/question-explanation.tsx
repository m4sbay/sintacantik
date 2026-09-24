import { CircleHelp } from "lucide-react";

type QuestionExplanationProps = {
  explanation?: string;
};

/** Plain text only: preserve short paragraphs and simple bullet lists safely. */
export function QuestionExplanation({ explanation }: QuestionExplanationProps) {
  const text = explanation?.trim() || undefined;
  const paragraphs = text?.replace(/\r\n?/g, "\n").split(/\n[ \t]*\n+/);

  return (
    <section aria-label="Pembahasan soal" className="mt-5 max-w-[70ch] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-muted)] p-4 sm:p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <CircleHelp aria-hidden="true" className="shrink-0 text-[var(--primary)]" size={16} />
        Pembahasan
      </h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--text-secondary)]">
        {paragraphs ? paragraphs.map((paragraph, index) => {
          const lines = paragraph.split("\n");
          if (lines.every((line) => /^\s*[-*•]\s+\S/.test(line))) {
            return <ul key={index} className="list-disc space-y-2 pl-5">
              {lines.map((line, lineIndex) => <li key={lineIndex}>{line.replace(/^\s*[-*•]\s+/, "")}</li>)}
            </ul>;
          }
          return <p key={index} className="whitespace-pre-line">{paragraph}</p>;
        }) : <p>Pembahasan belum tersedia.</p>}
      </div>
    </section>
  );
}
