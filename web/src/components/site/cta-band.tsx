import type { ReactNode } from "react";
import { H2, Lead, Section } from "./section";

/** Abschluss-Sektion (UB04 6.2): h2 (display-2), Lead, Buttons; einspaltig, linksbündig, max. 60ch. */
export function CtaBand({
  id,
  title,
  lead,
  actions,
  background = "paper",
}: {
  id: string;
  title: ReactNode;
  lead: ReactNode;
  actions: ReactNode;
  background?: "white" | "paper";
}) {
  return (
    <Section variant={background} labelledBy={id} innerClassName="gap-7">
      <div className="flex max-w-[60ch] flex-col gap-4">
        <H2 id={id}>{title}</H2>
        <Lead>{lead}</Lead>
      </div>
      <div className="flex flex-wrap items-center gap-3">{actions}</div>
    </Section>
  );
}
