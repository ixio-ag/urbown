"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type Option = { value: string; label: string };

type SegmentProps = {
  label: string;
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Handy: volle Breite mit gleich breiten Optionen. */
  block?: boolean;
};

/** Segment-Umschalter (UB02 8.4): radiogroup, Pfeiltasten wechseln. */
export function Segment({ label, options, value, defaultValue, onChange, block = false }: SegmentProps) {
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (v: string, focusIndex?: number) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
    if (focusIndex !== undefined) refs.current[focusIndex]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const last = options.length - 1;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next >= 0) {
      e.preventDefault();
      select(options[next].value, next);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("inline-flex overflow-hidden rounded-md border border-ink", block && "flex w-full")}
    >
      {options.map((o, i) => {
        const checked = o.value === current;
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => select(o.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "min-h-11 cursor-pointer px-4 text-sm font-medium transition-colors duration-150 focus-visible:-outline-offset-4",
              i > 0 && "border-l border-ink",
              block && "flex-1",
              checked ? "bg-ink font-semibold text-white focus-visible:outline-white" : "bg-white text-ink hover:bg-muted",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
