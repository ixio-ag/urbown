import { KontaktView } from "@/components/site/kontakt-view";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/kontakt",
  title: "Kontakt",
  description: "Demo-Termin, Infopaket für den Gemeinderat oder Pilotanfrage. Wir melden uns innerhalb von zwei Werktagen.",
});

// Ohne ?anliegen= (bzw. «demo»). Andere Anliegen schreibt proxy.ts auf /kontakt/[anliegen] um.
export default function KontaktPage() {
  return <KontaktView anliegen="demo" />;
}
