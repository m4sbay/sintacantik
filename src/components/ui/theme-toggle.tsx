"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

type ThemePreference = "light" | "dark" | "system";

const options: Array<{ value: ThemePreference; label: string; icon: typeof Sun }> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

const themeChangeEvent = "sintacantik-theme-change";

function readThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem("sintacantik-theme");
  return stored === "light" || stored === "dark" ? stored : "system";
}

function applyTheme(preference: ThemePreference) {
  const dark =
    preference === "dark" ||
    (preference === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

function subscribeToThemePreference(onStoreChange: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const syncTheme = () => {
    applyTheme(readThemePreference());
    onStoreChange();
  };

  window.addEventListener("storage", syncTheme);
  window.addEventListener(themeChangeEvent, syncTheme);
  media.addEventListener("change", syncTheme);

  return () => {
    window.removeEventListener("storage", syncTheme);
    window.removeEventListener(themeChangeEvent, syncTheme);
    media.removeEventListener("change", syncTheme);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToThemePreference, readThemePreference, () => "system");

  function updateTheme(preference: ThemePreference) {
    if (preference === "system") {
      localStorage.removeItem("sintacantik-theme");
    } else {
      localStorage.setItem("sintacantik-theme", preference);
    }
    applyTheme(preference);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <div className="inline-flex rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-1" aria-label="Tema">
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <Button
            key={option.value}
            aria-label={`Tema ${option.label}`}
            aria-pressed={theme === option.value}
            className={`min-h-9 px-2 ${theme === option.value ? "bg-[var(--surface-muted)]" : ""}`}
            title={`Tema ${option.label}`}
            variant="ghost"
            onClick={() => updateTheme(option.value)}
          >
            <Icon aria-hidden="true" size={16} />
          </Button>
        );
      })}
    </div>
  );
}
