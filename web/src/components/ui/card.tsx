import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Card (UB02 8.6): weisse Fläche, feine Linie, Rundung md. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-md border border-line bg-white", className)} {...props} />;
}

/** Titelzeile einer Card: h2 links, optional Aktion rechts. */
export function CardHeader({ title, action, as: Tag = "h2" }: { title: ReactNode; action?: ReactNode; as?: "h2" | "h3" }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-2">
      <Tag className="text-xl font-bold">{title}</Tag>
      {action}
    </div>
  );
}

/** Liste in einer Card, getrennt durch feine Linien. */
export function List({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("divide-y divide-line", className)} {...props} />;
}

type ListItemProps = {
  title: ReactNode;
  /** Ganzer Eintrag klickbar (Titel-Link über die ganze Fläche, UB02 8.6). */
  href?: string;
  meta?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

export function ListItem({ title, href, meta, leading, trailing, className }: ListItemProps) {
  return (
    <li
      className={cn(
        "relative flex items-start gap-3 px-4 py-3.5",
        href && "transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-ink hover:bg-hover",
        className,
      )}
    >
      {leading}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {href ? (
          <Link href={href} className="font-semibold no-underline outline-none after:absolute after:inset-0">
            {title}
          </Link>
        ) : (
          <span className="font-semibold">{title}</span>
        )}
        {meta ? <span className="text-sm text-ink-2">{meta}</span> : null}
      </div>
      {trailing ? <div className="relative z-10 shrink-0">{trailing}</div> : null}
    </li>
  );
}

/** Kennwerte als Beschreibungsliste (UB02 8.6 «kv»). */
export function Kv({ items, className }: { items: { term: ReactNode; value: ReactNode }[]; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm", className)}>
      {items.map((it, i) => (
        <div key={i} className="contents">
          <dt className="text-ink-2">{it.term}</dt>
          <dd className="font-medium">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Stat-Kachel: Label + grosse Zahl (UB02 8.6). */
export function Stat({ label, value, className }: { label: ReactNode; value: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1 bg-white px-4 py-3.5", className)}>
      <span className="lbl">{label}</span>
      <span className="num font-display text-3xl font-extrabold">{value}</span>
    </div>
  );
}

/** Raster aus Stat-Kacheln mit gemeinsamen Linien. */
export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 border-t border-l border-line md:grid-cols-4 [&>*]:border-r [&>*]:border-b [&>*]:border-line",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Leerer Zustand: ein Satz + Hauptaktion (UB02 8.6). */
export function EmptyState({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-7 text-center text-ink-2">
      <p>{children}</p>
      {action}
    </div>
  );
}

/** Lade-Platzhalter ohne Animation; bei > 1 s zusätzlich «Wird geladen» für Screenreader. */
export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block rounded-xs bg-muted", className)} />;
}

export function LoadingNote() {
  return (
    <span className="sr-only" aria-live="polite">
      Wird geladen
    </span>
  );
}
