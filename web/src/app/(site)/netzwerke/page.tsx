import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Hero, HeroCard, Outline, Section, SectionTitle, Note } from "@/components/site/section";
import { NETWORKS } from "@/content/networks";
import { pageMetadata } from "@/lib/metadata";
import { APP_URL, DEMO_URL } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/netzwerke",
  title: "Netzwerke & Login",
  description: "Ein Login für alle urbown-Netzwerke unter app.urbown.com. Jede Stadt mit eigener Kurzadresse.",
});

export default function NetzwerkePage() {
  return (
    <>
      <Hero
        label="Login"
        title={
          <>
            Ein Login für <Outline>alle</Outline> Netzwerke.
          </>
        }
        lead="Melden Sie sich unter app.urbown.com an. Sie landen automatisch in Ihrem Netzwerk. Sind Sie in mehreren Städten Mitglied, wechseln Sie mit einem Klick."
        actions={
          <>
            <ButtonLink href={APP_URL} size="lg" lift>
              Anmelden
            </ButtonLink>
            <ButtonLink href={DEMO_URL} variant="secondary" size="lg" lift>
              Demo öffnen
            </ButtonLink>
          </>
        }
        aside={
          <HeroCard label="Adresse">
            <p className="border-b-[1.5px] border-ink pb-2.5 font-mono text-addr break-all">app.urbown.com</p>
            <p className="text-sm text-ink-2">Jede Stadt hat zusätzlich eine Kurzadresse, z. B. mannheim.urbown.com. Sie führt direkt zum Login.</p>
          </HeroCard>
        }
      />

      <Section variant="paper" labelledBy="netzwerke" innerClassName="gap-7">
        <SectionTitle label="Netzwerke" title="Diese Städte sind dabei." id="netzwerke" />
        <div role="region" aria-label="Netzwerke" tabIndex={0} className="overflow-x-auto border-t-[1.5px] border-ink">
          <table className="w-full border-collapse text-ui">
            <thead>
              <tr>
                {["Stadt", "Netzwerk", "Kurzadresse", "Status"].map((h) => (
                  <th key={h} scope="col" className="lbl border-b border-ink px-3.5 py-3 text-left font-normal whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NETWORKS.map((n) => (
                <tr key={n.city}>
                  <th scope="row" className="border-b border-line p-3.5 text-left align-top font-bold whitespace-nowrap">
                    {n.city}
                  </th>
                  <td className="border-b border-line p-3.5 align-top font-mono whitespace-nowrap">{n.network}</td>
                  <td className="border-b border-line p-3.5 align-top font-mono whitespace-nowrap">{n.shortAddress}</td>
                  <td className="border-b border-line px-3.5 py-2.5 align-top whitespace-nowrap">
                    {n.status.kind === "link" ? (
                      <ButtonLink href={n.status.href} variant="secondary" size="sm" className="rounded-sm">
                        {n.status.label}
                      </ButtonLink>
                    ) : (
                      <Badge variant={n.status.kind === "badge-solid" ? "solid" : "outline"}>{n.status.label}</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note>
          <p className="font-bold">Erster Login nach der Umstellung?</p>
          <p className="text-ink-2">
            Geben Sie wie gewohnt Ihre E-Mail-Adresse ein. Sie erhalten dann automatisch eine E-Mail mit einem 6-stelligen Code. Damit
            bestätigen Sie, dass das Konto Ihnen gehört, und legen einmalig ein neues Passwort fest.
          </p>
        </Note>
      </Section>
    </>
  );
}
