import type { ReactNode } from "react";

/** Rechtstext-Platzhalter bis UB25 (UB03 3.8). */
export function LegalPlaceholder({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby="seitentitel" className="band bg-white pt-[clamp(3rem,8vw,6.5rem)] pb-[clamp(3.5rem,8vw,7rem)]">
      <div className="mx-auto flex max-w-site flex-col gap-6">
        <h1 id="seitentitel" className="text-display-2 font-extrabold">
          {title}
        </h1>
        <div className="flex max-w-[70ch] flex-col gap-4">{children}</div>
      </div>
    </section>
  );
}
