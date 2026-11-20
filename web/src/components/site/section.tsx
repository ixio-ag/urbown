import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Mono-Label über Titeln (Landing). */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="lbl">{children}</span>;
}

/** Lead-Absatz Landing (UB02 3.3 text-lead, ink-2, max. 60ch). */
export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("max-w-[60ch] text-lead text-ink-2", className)}>{children}</p>;
}

/** Landing h2 (Archivo 800, display-2). */
export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-display-2 font-extrabold">
      {children}
    </h2>
  );
}

/** Landing h3 (Archivo 700, 20 px). */
export function H3({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-xl font-bold", className)}>{children}</h3>;
}

/** Konturschrift für Titelwörter (ab 30 px). */
export function Outline({ children }: { children: ReactNode }) {
  return <span className="text-outline">{children}</span>;
}

type SectionProps = {
  variant?: "white" | "paper";
  /** Titel-ID für aria-labelledby (Landmark mit Namen). */
  labelledBy?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

/** Sektion (UB03 6): Linie oben in ink, section-y, Inhalt max-w-site. */
export function Section({ variant = "white", labelledBy, className, innerClassName, children }: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn("band section-y border-t border-ink", variant === "paper" ? "bg-paper" : "bg-white", className)}
    >
      <div className={cn("mx-auto flex max-w-site flex-col gap-8", innerClassName)}>{children}</div>
    </section>
  );
}

/** Titelblock: Label + h2 (+ optional Lead/Button). */
export function SectionTitle({ label, title, id, children }: { label: string; title: ReactNode; id: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow>{label}</Eyebrow>
      <H2 id={id}>{title}</H2>
      {children}
    </div>
  );
}

/** Split: Titelspalte (1) und Inhalt (1,4), untereinander unter 900 px. */
export function Split({ aside, children, className }: { aside: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid items-start gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-4">{aside}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

type HeroProps = {
  label: string;
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  /** Kasten rechts (1); ohne = einspaltig. */
  aside?: ReactNode;
  /** Zusätzlicher Inhalt unter den Buttons (z. B. Hinweis-Kasten Kontakt). */
  children?: ReactNode;
};

/** Hero (UB03 6): Text (1,5) + Kasten (1); einspaltig unter 900 px. Weiss, ohne Linie oben. */
export function Hero({ label, title, lead, actions, aside, children }: HeroProps) {
  return (
    <section aria-labelledby="seitentitel" className="band bg-white pt-[clamp(3rem,8vw,6.5rem)] pb-[clamp(2.5rem,6vw,4.5rem)]">
      <div
        className={cn(
          "mx-auto grid max-w-site gap-[clamp(2rem,5vw,4.5rem)]",
          aside ? "items-end lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]" : "",
        )}
      >
        <div className="flex min-w-0 flex-col gap-7">
          <Eyebrow>{label}</Eyebrow>
          <h1 id="seitentitel" className="font-display-black text-display-1 font-black">
            {title}
          </h1>
          <Lead>{lead}</Lead>
          {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
          {children}
        </div>
        {aside ? <div className="min-w-0">{aside}</div> : null}
      </div>
    </section>
  );
}

/** Kasten rechts im Hero (Rahmen 1,5 px). */
export function HeroCard({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3.5 border-[1.5px] border-ink bg-white p-5.5", className)}>
      <Eyebrow>{label}</Eyebrow>
      {children}
    </div>
  );
}

/** Hinweis-Kasten 1,5 px (UB03 6 «Note»). */
export function Note({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-1.5 border-[1.5px] border-ink px-4.5 py-4", className)}>{children}</div>;
}
