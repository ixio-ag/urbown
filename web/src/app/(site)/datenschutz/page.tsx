import { LegalPlaceholder } from "@/components/site/legal-placeholder";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ path: "/datenschutz", title: "Datenschutz", noindex: true });

export default function DatenschutzPage() {
  return (
    <LegalPlaceholder title="Datenschutzerklärung">
      <p>
        Die Datenschutzerklärung für die neue urbown.com wird vor dem Go-Live hier veröffentlicht. Fragen beantworten wir gern unter{" "}
        <a href="mailto:info@urbown.com" className="underline underline-offset-[3px] hover:decoration-2">
          info@urbown.com
        </a>
        .
      </p>
    </LegalPlaceholder>
  );
}
