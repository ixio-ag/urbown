"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icons";

type ChipProps = Omit<ComponentProps<"button">, "onChange"> & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  icon?: IconName;
};

/** Filter-Chip (UB02 8.3): 36 px sichtbar + 44 px Trefferfläche, gewählt = schwarz + aria-pressed. */
export function Chip({
  pressed,
  defaultPressed = false,
  onPressedChange,
  icon,
  className,
  children,
  onClick,
  ...props
}: ChipProps) {
  const [inner, setInner] = useState(defaultPressed);
  const on = pressed ?? inner;
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={(e) => {
        if (pressed === undefined) setInner(!on);
        onPressedChange?.(!on);
        onClick?.(e);
      }}
      className={cn(
        "hit inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-field bg-white px-3 text-sm whitespace-nowrap text-ink",
        "transition-colors duration-150 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40",
        "aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white",
        className,
      )}
      {...props}
    >
      {icon ? <Icon name={icon} size={16} /> : null}
      {children}
    </button>
  );
}

/** Gruppe von Chips: auf dem Handy horizontal scrollbar, ohne Umbruch (UB02 8.3). */
export function ChipGroup({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div role="group" aria-label={label} className={cn("flex gap-2 overflow-x-auto py-1", className)}>
      {children}
    </div>
  );
}
