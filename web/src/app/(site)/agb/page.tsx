import { LegalPlaceholder } from "@/components/site/legal-placeholder";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ path: "/agb", title: "AGB", noindex: true });

export default function AgbPage() {
  return (
    <LegalPlaceholder title="Allgemeine Geschäftsbedingungen">
      <p>Die AGB für die neue urbown.com werden vor dem Go-Live hier veröffentlicht.</p>
    </LegalPlaceholder>
  );
}
