"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SwitchProps = {
  id: string;
  label: ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Für Formulare: verstecktes Feld mit «true»/«false». */
  name?: string;
};

/** Schalter für Einstellungen (UB02 8.2): role="switch", Text «Ein»/«Aus» sichtbar. */
export function Switch({ id, label, defaultChecked = false, checked, onChange, disabled, name }: SwitchProps) {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;
  const toggle = () => {
    const next = !on;
    if (checked === undefined) setInner(next);
    onChange?.(next);
  };
  return (
    <div className="flex min-h-11 items-center justify-between gap-4">
      <span id={`${id}-label`} className="min-w-0">
        {label}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={`${id}-label`}
        disabled={disabled}
        onClick={toggle}
        className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2.5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span
          aria-hidden="true"
          className={cn(
            "relative inline-block h-6.5 w-11 rounded-full border border-ink transition-colors duration-150",
            on ? "bg-ink" : "bg-white",
          )}
        >
          <span
            className={cn(
              "absolute top-0.75 size-4.5 rounded-full transition-[left] duration-150",
              on ? "left-5.25 bg-white" : "left-0.75 bg-ink",
            )}
          />
        </span>
        <span aria-hidden="true" className="w-7 text-left text-sm font-medium">
          {on ? "Ein" : "Aus"}
        </span>
      </button>
      {name ? <input type="hidden" name={name} value={on ? "true" : "false"} /> : null}
    </div>
  );
}
