import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-[var(--primary)] text-[var(--primary-contrast)] hover:opacity-90",
  secondary: "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
  ghost: "border-transparent bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
  danger: "border-transparent bg-[var(--danger)] text-white hover:opacity-90",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className = "", variant = "primary", type = "button", ...props },
  ref,
) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant]} ${className}`}
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});
