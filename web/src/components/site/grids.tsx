import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/icons";
import { typo } from "@/components/ui/typo";
import { cn } from "@/lib/cn";
import type { Feature } from "@/content/features";
import { Eyebrow, H3 } from "./section";

const COLS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

// fillLast (K7): eine allein stehende letzte Zelle spannt über die restlichen Spalten; die Linien bleiben gemeinsam,
// weil sie ihre rechte und untere Linie behält und am Rasterrand endet.
const FILL_LAST = {
  2: "md:[&>li:last-child:nth-child(odd)]:col-span-2",
  3: "md:[&>li:last-child:nth-child(3n+1)]:col-span-3 md:[&>li:last-child:nth-child(3n+2)]:col-span-2",
  4: "md:[&>li:last-child:nth-child(odd)]:col-span-2 lg:[&>li:last-child:nth-child(4n+1)]:col-span-4 lg:[&>li:last-child:nth-child(4n+2)]:col-span-3 lg:[&>li:last-child:nth-child(4n+3)]:col-span-2",
} as const;

/**
 * Raster mit gemeinsamen schwarzen Linien (UB02 7.2, UB03 6 «RuleGrid»):
 * border-l/border-t am Raster, border-r/border-b an den Zellen. 1 Spalte → 2/3 ab 680 px → 4 ab 900 px (g4).
 */
export function RuleGrid({
  cols,
  fillLast = false,
  children,
  className,
}: {
  cols: 2 | 3 | 4;
  fillLast?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <ul role="list" className={cn("grid grid-cols-1 border-t border-l border-ink", COLS[cols], fillLast && FILL_LAST[cols], className)}>
      {children}
    </ul>
  );
}

/** Zelle im Raster. */
export function RuleCell({ children, dense = false }: { children: ReactNode; dense?: boolean }) {
  return (
    <li className={cn("flex min-w-0 flex-col gap-2.5 border-r border-b border-ink bg-white", dense ? "p-5.5" : "p-6")}>
      {children}
    </li>
  );
}

/** Funktion mit Icon 28 px, h3 und Text in ink-2 (UB03 6 «FeatureTile»). */
export function FeatureTile({ icon, title, text, dense }: { icon?: IconName; title: string; text: ReactNode; dense?: boolean }) {
  return (
    <RuleCell dense={dense}>
      {icon ? <Icon name={icon} size={28} /> : null}
      <H3>{title}</H3>
      <p className="text-ink-2">{typo(text)}</p>
    </RuleCell>
  );
}

export function FeatureGrid({ features, cols, fillLast }: { features: Feature[]; cols: 3 | 4; fillLast?: boolean }) {
  return (
    <RuleGrid cols={cols} fillLast={fillLast}>
      {features.map((f) => (
        <FeatureTile key={f.title} icon={f.icon} title={f.title} text={f.text} dense={cols === 4} />
      ))}
    </RuleGrid>
  );
}

/** Zielgruppen-Raster: 3 verlinkte Felder mit Linien, Pfeil «→» (UB03 6 «AudienceGrid»). */
export function AudienceGrid({ items }: { items: { label: string; text: string; href: string }[] }) {
  return (
    <div className="band border-t border-ink bg-white">
      <ul role="list" className="mx-auto grid max-w-site grid-cols-1 md:grid-cols-3">
        {items.map((it) => (
          <li key={it.label} className="flex border-b border-ink last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0">
            <Link
              href={it.href}
              className="flex w-full min-w-0 flex-col gap-2 px-5 pt-5.5 pb-6.5 no-underline transition-colors duration-150 hover:bg-paper focus-visible:-outline-offset-2"
            >
              <Eyebrow>{it.label}</Eyebrow>
              <span className="font-display text-xl font-bold">{typo(it.text)}</span>
              <span aria-hidden="true" className="font-display text-2xl font-extrabold">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Referenz-Kennzahlen: Kasten 1,5 px, drei Zahlen Archivo 900 (UB03 6 «RefStats»). */
export function RefStats({ items }: { items: { value: string; text: string }[] }) {
  return (
    <dl className="grid grid-cols-1 border-[1.5px] border-ink md:grid-cols-3">
      {items.map((it) => (
        <div
          key={it.value}
          className="flex flex-col-reverse gap-1 border-b border-ink p-6 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
        >
          <dt className="text-ink-2">{typo(it.text)}</dt>
          <dd className="num font-display-black text-stat-lg font-black">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
