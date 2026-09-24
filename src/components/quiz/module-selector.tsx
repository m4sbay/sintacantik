"use client";

import { ChevronDown } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { questionModuleGroups } from "@/data/question-modules";
import type { QuestionModule } from "@/types/quiz";

type ModuleSelectorProps = {
  modules: (QuestionModule & { questionCount: number })[];
  value: string[];
  onChange: (ids: string[]) => void;
};

export function ModuleSelector({ modules, value, onChange }: ModuleSelectorProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = modules.filter((module) => value.includes(module.id));

  return (
    <div className="grid min-w-0 gap-2" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }}>
      <span id={`${id}-label`} className="text-sm font-medium">Modul Soal</span>
      <button
        ref={triggerRef}
        type="button"
        aria-labelledby={`${id}-label ${id}-summary`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-left text-sm font-medium shadow-sm transition hover:bg-[var(--surface-muted)]"
        onClick={() => setOpen(!open)}
      >
        <span id={`${id}-summary`}>{selected.length ? `${selected.length} modul dipilih` : "Pilih modul soal"}</span>
        <ChevronDown aria-hidden="true" size={18} className={`shrink-0 text-[var(--primary)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div id={`${id}-panel`} hidden={!open} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-2">
        <div className="flex flex-wrap gap-1 border-b border-[var(--border)] pb-2">
          <Button variant="ghost" onClick={() => onChange(modules.map((module) => module.id))}>Pilih Semua</Button>
          <Button variant="ghost" disabled={value.length === 0} onClick={() => onChange([])}>Hapus Pilihan</Button>
        </div>
        <div className="max-h-64 overflow-y-auto overscroll-contain p-1">
          {questionModuleGroups.map((group) => (
            <fieldset key={group.id} className="min-w-0 py-2">
              <legend className="px-2 text-xs font-semibold text-[var(--text-secondary)]">{group.label}</legend>
              {modules.filter((module) => module.group === group.id).map((module) => (
                <label key={module.id} className="flex min-h-12 cursor-pointer items-start gap-3 rounded-[var(--radius)] px-2 py-3 hover:bg-[var(--surface-muted)] focus-within:bg-[var(--surface-muted)]">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 shrink-0 accent-[var(--primary)]"
                    checked={value.includes(module.id)}
                    onChange={(event) => onChange(event.target.checked ? [...value, module.id] : value.filter((id) => id !== module.id))}
                  />
                  <span className="min-w-0 text-sm">
                    <span className="block font-medium">{module.label}</span>
                    <span className="block text-xs text-[var(--text-secondary)]">{module.questionCount ? `${module.questionCount} soal` : "Soal belum tersedia"}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          ))}
        </div>
      </div>
      {selected.length > 0 ? <div className="flex flex-wrap gap-2" aria-live="polite">
        {selected.slice(0, 3).map((module) => <Badge key={module.id} tone="primary">{module.label}</Badge>)}
        {selected.length > 3 ? <Badge>+{selected.length - 3} modul lainnya</Badge> : null}
      </div> : null}
    </div>
  );
}
