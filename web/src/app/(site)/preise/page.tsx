import { PriceBlock } from "@/components/site/blocks";
import { RuleCell, RuleGrid } from "@/components/site/grids";
import { H3, Hero, Outline, Section } from "@/components/site/section";
import { typo } from "@/components/ui/typo";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/preise",
  title: "Preise",
  description:
    "6 Monate kostenlos testen, danach ein individuelles Angebot als fester Jahrespreis in Euro oder Franken. Für Mitglieder immer kostenlos.",
});

const EXTRAS = [
  ["Region", "Mehrere Gemeinden oder ein Landkreis unter einem Vertrag."],
  ["Mehrjährig", "Bei längerer Laufzeit wird es günstiger. Das planen wir gern gemeinsam."],
  ["Partner", "Banken, Verwaltungen und Makler können ein Netzwerk als Partner unterstützen."],
] as const;

export default function PreisePage() {
  return (
    <>
      <Hero
        label="Preise"
        title={
          <>
            Kostenlos starten. <Outline>Passend weiter&shy;machen.</Outline>
          </>
        }
        lead="Sechs Monate unverbindlich testen. Danach ein Angebot, das zur Grösse Ihrer Innenstadt passt, in Euro oder Franken."
      />

      <Section variant="paper" innerClassName="gap-7">
        <h2 className="sr-only">Pilot und Angebot</h2>
        <PriceBlock />
        <RuleGrid cols={3}>
          {EXTRAS.map(([title, text]) => (
            <RuleCell key={title}>
              <H3>{title}</H3>
              <p className="text-ink-2">{typo(text)}</p>
            </RuleCell>
          ))}
        </RuleGrid>
      </Section>
    </>
  );
}
