"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export type SelectOption = { value: string; label: string; disabled?: boolean };

type SelectProps = {
  value: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
};

export function Select({ value, options, onValueChange, className = "", "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.findIndex((option) => option.value === value)));
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) return;
    const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
    requestAnimationFrame(() => optionRefs.current[selectedIndex]?.focus());

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isOpen, options, value]);

  const openDropdown = () => {
    setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value)));
    setIsOpen(true);
  };

  const moveFocus = (direction: 1 | -1) => {
    let nextIndex = activeIndex;
    do {
      nextIndex = (nextIndex + direction + options.length) % options.length;
    } while (options[nextIndex]?.disabled && nextIndex !== activeIndex);
    setActiveIndex(nextIndex);
    optionRefs.current[nextIndex]?.focus();
  };

  const selectOption = (option: SelectOption) => {
    if (option.disabled) return;
    onValueChange(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      <button
        ref={triggerRef}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-[var(--radius)] border bg-[var(--surface)] py-2.5 pl-3.5 pr-3 text-left text-sm font-medium text-[var(--text-primary)] shadow-sm transition-all duration-200 ease-out hover:border-[color-mix(in_srgb,var(--primary)_65%,var(--border))] hover:bg-[color-mix(in_srgb,var(--primary)_4%,var(--surface))] focus:outline-none focus:2 focus:ring-[color-mix(in_srgb,var(--primary)_22%,transparent)] ${isOpen ? "border-[var(--primary)] ring-2 ring-[color-mix(in_srgb,var(--primary)_22%,transparent)]" : "border-[var(--border)]"}`}
        type="button"
        onClick={() => {
          if (isOpen) setIsOpen(false);
          else openDropdown();
        }}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
            event.preventDefault();
            openDropdown();
          }
        }}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] text-[var(--primary)]">
          <ChevronDown aria-hidden="true" className={`transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : ""}`} size={18} strokeWidth={2.25} />
        </span>
      </button>

      <div className={`absolute left-0 right-0 z-30 mt-2 origin-top overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-xl transition-[opacity,transform,visibility] duration-200 ease-out ${isOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-[0.98] opacity-0"}`}>
        <div id={listboxId} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy} className="max-h-64 overflow-y-auto" role="listbox">
          {options.map((option, index) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value}
                ref={(element) => { optionRefs.current[index] = element; }}
                aria-selected={selected}
                className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 focus:outline-none ${selected ? "bg-[color-mix(in_srgb,var(--primary)_18%,transparent)] font-semibold text-[var(--text-primary)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)] focus:bg-[var(--surface-muted)]"} disabled:cursor-not-allowed disabled:opacity-40`}
                disabled={option.disabled}
                role="option"
                tabIndex={isOpen && index === activeIndex ? 0 : -1}
                type="button"
                onClick={() => selectOption(option)}
                onFocus={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    moveFocus(event.key === "ArrowDown" ? 1 : -1);
                  } else if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectOption(option);
                  } else if (event.key === "Escape" || event.key === "Tab") {
                    setIsOpen(false);
                    if (event.key === "Escape") {
                      event.preventDefault();
                      triggerRef.current?.focus();
                    }
                  }
                }}
              >
                <span>{option.label}</span>
                {selected ? <Check aria-hidden="true" className="shrink-0 text-[var(--primary)]" size={17} /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
