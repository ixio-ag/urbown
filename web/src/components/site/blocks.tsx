import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { typo } from "@/components/ui/typo";
import { cn } from "@/lib/cn";
import { PRICE_BOXES } from "@/content/prices";
import { STEPS } from "@/content/steps";
import { Eyebrow, H3 } from "./section";

/** Schritte 01–05 als geordnete Liste mit Konturziffern 34 px (Handy 30 px) (UB03 6 «Steps»). */
export function Steps() {
  return (
    <ol className="flex flex-col border-t border-ink">
      {STEPS.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-4 border-b border-line py-5 md:grid-cols-[4.5rem_minmax(0,1fr)]">
          <span aria-hidden="true" className="num font-display-black text-step font-black text-outline md:text-step-lg">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-1">
            <H3>{s.title}</H3>
            <p className="text-ink-2">{typo(s.text)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Preis-Block (UB03 2.5): drei Kästen 1,5 px, der erste mit 3-px-Innenrahmen (outline, keine Schatten). */
export function PriceBlock() {
  return (
    <ul role="list" className="grid grid-cols-1 border-t-[1.5px] border-l-[1.5px] border-ink lg:grid-cols-3">
      {PRICE_BOXES.map((box, i) => (
        <li
          key={box.label}
          className={cn(
            "flex min-w-0 flex-col gap-3.5 border-r-[1.5px] border-b-[1.5px] border-ink p-7",
            i === 0 && "outline-3 -outline-offset-3 outline-ink",
          )}
        >
          <Eyebrow>{box.label}</Eyebrow>
          <H3 className="text-4xl">{box.title}</H3>
          {box.texts.map((t) => (
            <p key={t} className="text-ink-2">
              {typo(t)}
            </p>
          ))}
          {box.cta ? (
            <ButtonLink href={box.cta.href} size="lg" lift className="self-start">
              {box.cta.label}
            </ButtonLink>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/** Häufige Fragen als details/summary, «+»/«–» rechts (UB03 6 «Faq»). */
export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div>
      {items.map((it, i) => (
        <details key={it.q} className={cn("group border-b border-line py-2", i === 0 && "border-t-[1.5px] border-t-ink")}>
          <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 py-2 font-display text-faq font-bold">
            <span>{typo(it.q)}</span>
            <span aria-hidden="true" className="font-sans text-2xl leading-none font-normal group-open:hidden">
              +
            </span>
            <span aria-hidden="true" className="hidden font-sans text-2xl leading-none font-normal group-open:inline">
              –
            </span>
          </summary>
          <p className="max-w-[70ch] pb-2.5 text-ink-2">{typo(it.a)}</p>
        </details>
      ))}
    </div>
  );
}

/** Zeilen «Auf einen Blick» (Städte-Hero). */
export function GlanceList({ rows }: { rows: { term: string; value: string }[] }) {
  return (
    <dl className="flex flex-col gap-2.5">
      {rows.map((r, i) => (
        <div key={r.term} className={cn("flex flex-wrap justify-between gap-x-3 gap-y-1", i < rows.length - 1 && "border-b border-line pb-2")}>
          <dt>{r.term}</dt>
          <dd className="font-bold">{typo(r.value)}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Liste mit quadratischem Aufzählungszeichen 8 px in ink (UB04 4.4). */
export function SquareList({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul role="list" className={cn("flex flex-col gap-2", className)}>
      {items.map((it, i) => (
        <li key={i} className="relative pl-5 before:absolute before:top-[0.6em] before:left-0 before:size-2 before:bg-ink">
          {typo(it)}
        </li>
      ))}
    </ul>
  );
}

/** Aufgabenteilung (UB04 4.4): Raster g2 mit Rahmen 1,5 px wie der Preis-Block, ohne Hervorhebung. */
export function TaskSplit({ columns }: { columns: { label: string; items: string[] }[] }) {
  return (
    <ul role="list" className="grid grid-cols-1 border-t-[1.5px] border-l-[1.5px] border-ink md:grid-cols-2">
      {columns.map((col) => (
        <li key={col.label} className="flex min-w-0 flex-col gap-4 border-r-[1.5px] border-b-[1.5px] border-ink bg-white p-7">
          <h3 className="lbl">{col.label}</h3>
          <SquareList items={col.items} />
        </li>
      ))}
    </ul>
  );
}
