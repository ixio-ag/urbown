import { LegalPlaceholder } from "@/components/site/legal-placeholder";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ path: "/impressum", title: "Impressum", noindex: true });

export default function ImpressumPage() {
  return (
    <LegalPlaceholder title="Impressum">
      <address className="not-italic">
        urbown ist ein Angebot der
        <br />
        IXIO AG
        <br />
        Bahnhofplatz
        <br />
        6300 Zug
        <br />
        Schweiz
      </address>
      <p>
        E-Mail:{" "}
        <a href="mailto:info@urbown.com" className="underline underline-offset-[3px] hover:decoration-2">
          info@urbown.com
        </a>
        <br />
        Handelsregister / UID: [folgt]
        <br />
        Vertretungsberechtigt: [folgt]
      </p>
      <p className="text-ink-2">Vollständige Angaben folgen vor dem Go-Live.</p>
    </LegalPlaceholder>
  );
}
