import { notFound } from "next/navigation";
import { KontaktView } from "@/components/site/kontakt-view";
import { ANLIEGEN, isAnliegen } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";

// Vorauswahl ohne JavaScript (UB03 3.7): /kontakt?anliegen=pilot wird in proxy.ts intern hierher umgeschrieben.
// Alle fünf Varianten sind statisch vorgerendert; Canonical bleibt /kontakt.
export function generateStaticParams() {
  return ANLIEGEN.map((a) => ({ anliegen: a.value }));
}

export const metadata = pageMetadata({
  path: "/kontakt",
  title: "Kontakt",
  description: "Demo-Termin, Infopaket für den Gemeinderat oder Pilotanfrage. Wir melden uns innerhalb von zwei Werktagen.",
});

export default async function KontaktAnliegenPage({ params }: PageProps<"/kontakt/[anliegen]">) {
  const { anliegen } = await params;
  if (!isAnliegen(anliegen)) notFound();
  return <KontaktView anliegen={anliegen} />;
}
