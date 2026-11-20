import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./icons";

/*
 * Formularfelder (UB02 8.2). Label oben (immer sichtbar), Hilfetext/Fehler darunter mit aria-describedby.
 * Freiwillige Felder tragen «(optional)» im Label; Pflichtfelder werden nicht markiert, sind aber required.
 */

/** Rundung: App = md (6 px), Landingpage = sm (4 px). */
export type FieldShape = "app" | "site";

/** IDs für Hilfe und Fehler eines Feldes. */
export function fieldIds(id: string) {
  return { hint: `${id}-hilfe`, error: `${id}-fehler` };
}

/** Wert für aria-describedby aus Hilfe/Fehler. */
export function describedBy(id: string, opts: { hint?: boolean; error?: boolean }) {
  const ids = fieldIds(id);
  const list = [opts.error ? ids.error : null, opts.hint ? ids.hint : null].filter(Boolean);
  return list.length ? list.join(" ") : undefined;
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm font-medium text-ink">
      <Icon name="alert" size={16} className="mt-px" />
      <span>{children}</span>
    </p>
  );
}

type FieldProps = {
  id: string;
  label: ReactNode;
  optional?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Hülle aus Label, Feld, Hilfetext und Fehlermeldung. Das Feld bekommt id und aria-describedby selbst. */
export function Field({ id, label, optional, hint, error, className, children }: FieldProps) {
  const ids = fieldIds(id);
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional ? <span className="font-normal text-ink-2"> (optional)</span> : null}
      </label>
      {children}
      {error ? <FieldError id={ids.error}>{error}</FieldError> : null}
      {hint ? (
        <p id={ids.hint} className="text-sm text-ink-2">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const controlBase = [
  "w-full min-h-11 bg-white border border-field text-base text-ink",
  "placeholder:text-ink-3 hover:border-ink-2",
  "focus:border-ink focus:outline-2 focus:outline-ink focus:-outline-offset-1",
  "aria-[invalid=true]:border-2 aria-[invalid=true]:border-ink",
  "disabled:cursor-not-allowed disabled:border-line disabled:bg-muted disabled:text-ink-2",
  "[&[readonly]]:border-line [&[readonly]]:bg-paper",
];

export function controlClass(shape: FieldShape = "app", className?: string) {
  return cn(controlBase, "px-3 py-2.5", shape === "site" ? "rounded-sm" : "rounded-md", className);
}

type InputProps = ComponentProps<"input"> & {
  shape?: FieldShape;
  /** Einheit rechts im Feld (EUR, CHF, m², m) in Mono (UB02 8.2 «Betrag»). */
  unit?: string;
};

export function Input({ shape = "app", unit, className, ...props }: InputProps) {
  if (!unit) return <input className={controlClass(shape, className)} {...props} />;
  return (
    <div className="relative">
      <input className={controlClass(shape, cn("pr-14", className))} {...props} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-sm text-ink-2"
      >
        {unit}
      </span>
    </div>
  );
}

type TextareaProps = ComponentProps<"textarea"> & { shape?: FieldShape };

export function Textarea({ shape = "app", className, ...props }: TextareaProps) {
  return <textarea className={controlClass(shape, cn("min-h-[5.5rem] resize-y", className))} {...props} />;
}

type SelectProps = ComponentProps<"select"> & { shape?: FieldShape };

/** Natives select mit eigenem Pfeil. */
export function Select({ shape = "app", className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select className={controlClass(shape, cn("cursor-pointer appearance-none pr-10", className))} {...props}>
        {children}
      </select>
      <Icon
        name="chevron-down"
        size={18}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink"
      />
    </div>
  );
}

/** Code-Eingabe (6 Stellen, Login): ein Feld, nicht aufgeteilt (UB02 8.2). */
export function CodeInput({ className, ...props }: Omit<ComponentProps<"input">, "type">) {
  return (
    <input
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      maxLength={6}
      pattern="[0-9]{6}"
      className={controlClass("app", cn("min-h-14 text-center font-mono text-2xl tracking-code", className))}
      {...props}
    />
  );
}

type ChoiceProps = Omit<ComponentProps<"input">, "type"> & { label: ReactNode; description?: ReactNode };

/** Checkbox: ganze Zeile klickbar, min. 44 px hoch (UB02 8.2). */
export function Checkbox({ label, description, className, id, ...props }: ChoiceProps) {
  return (
    <label htmlFor={id} className={cn("flex min-h-11 cursor-pointer items-center gap-3", className)}>
      <span className="relative inline-grid size-5 shrink-0 place-items-center">
        <input
          id={id}
          type="checkbox"
          className="peer size-5 cursor-pointer appearance-none rounded-xs border border-field bg-white checked:border-ink checked:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
          {...props}
        />
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="pointer-events-none absolute hidden size-4 text-white peer-checked:block"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12l5 5 9-10" />
        </svg>
      </span>
      <span className="flex flex-col">
        <span>{label}</span>
        {description ? <span className="text-sm text-ink-2">{description}</span> : null}
      </span>
    </label>
  );
}

/** Radio: ganze Zeile klickbar, min. 44 px hoch. */
export function Radio({ label, description, className, id, ...props }: ChoiceProps) {
  return (
    <label htmlFor={id} className={cn("flex min-h-11 cursor-pointer items-center gap-3", className)}>
      <span className="relative inline-grid size-5 shrink-0 place-items-center">
        <input
          id={id}
          type="radio"
          className="peer size-5 cursor-pointer appearance-none rounded-full border border-field bg-white checked:border-ink checked:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
          {...props}
        />
        <span className="pointer-events-none absolute hidden size-2 rounded-full bg-white peer-checked:block" />
      </span>
      <span className="flex flex-col">
        <span>{label}</span>
        {description ? <span className="text-sm text-ink-2">{description}</span> : null}
      </span>
    </label>
  );
}

type DisclosureProps = ComponentProps<"details"> & { summary?: ReactNode };

/** «Weitere Angaben (optional)» – eingeklappte optionale Felder (UB02 8.2, UB01). */
export function Disclosure({ summary = "Weitere Angaben (optional)", className, children, ...props }: DisclosureProps) {
  return (
    <details className={cn("group border-t border-line", className)} {...props}>
      <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 font-semibold">
        {summary}
        <Icon name="chevron-down" size={18} className="transition-transform duration-150 group-open:rotate-180" />
      </summary>
      <div className="flex flex-col gap-3.5 pt-2 pb-3">{children}</div>
    </details>
  );
}

type VisibilityFieldProps = {
  name: string;
  /** Netzwerkname, z. B. «Mannheim». */
  network: string;
  defaultValue?: "netz" | "alle";
  idPrefix?: string;
};

/** Sichtbarkeit je Inhalt (Master 3.18, UB02 8.2). Standard: nur Netzwerk. */
export function VisibilityField({ name, network, defaultValue = "netz", idPrefix = name }: VisibilityFieldProps) {
  const hintId = `${idPrefix}-hilfe`;
  return (
    <fieldset className="flex min-w-0 flex-col gap-1" aria-describedby={hintId}>
      <legend className="mb-1 text-sm font-semibold">Sichtbar für</legend>
      <Radio
        id={`${idPrefix}-netz`}
        name={name}
        value="netz"
        defaultChecked={defaultValue === "netz"}
        label={`Nur Netzwerk ${network}`}
      />
      <Radio
        id={`${idPrefix}-alle`}
        name={name}
        value="alle"
        defaultChecked={defaultValue === "alle"}
        label="Alle urbown-Mitglieder"
      />
      <p id={hintId} className="text-sm text-ink-2">
        Freigegebene Inhalte tragen die Kennzeichnung urbown-weit.
      </p>
    </fieldset>
  );
}
