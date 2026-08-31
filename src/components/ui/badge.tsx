import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "neutral" | "primary" | "warning" | "success" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  neutral: "border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-secondary)]",
  primary: "border-transparent bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] text-[var(--primary)]",
  warning: "border-transparent bg-[color-mix(in_srgb,var(--warning)_16%,transparent)] text-[var(--warning)]",
  success: "border-transparent bg-[color-mix(in_srgb,var(--success)_16%,transparent)] text-[var(--success)]",
  danger: "border-transparent bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] text-[var(--danger)]",
};

export function Badge({ children, className = "", tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[calc(var(--radius)-2px)] border px-2 py-1 text-xs font-medium ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
