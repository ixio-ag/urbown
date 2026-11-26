import Link from "next/link";
import { typo } from "@/components/ui/typo";
import { Logo } from "@/components/ui/logo";
import { FOOTER_NAV } from "@/content/navigation";
import { CONTACT_EMAIL } from "@/lib/site";

/** Footer (UB03 2.3): vierspaltig → zweispaltig → einspaltig. */
export function SiteFooter() {
  return (
    <footer className="band border-t-[1.5px] border-ink pt-12 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto grid max-w-site gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,3fr)]">
        <div className="flex flex-col gap-4">
          <Logo variant="web" height={32} />
          <p className="max-w-[36ch] text-ink-2">Geschlossene Netzwerke für Innenstädte. Für Eigentümer, Gewerbe und Stadt.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="self-start py-2 font-mono text-sm text-ink underline-offset-[3px] hover:underline">
            {CONTACT_EMAIL}
          </a>
        </div>
        <nav aria-label="Fusszeile" className="grid gap-8 sm:grid-cols-3">
          {FOOTER_NAV.map((col) => (
            <div key={col.title} className="flex flex-col">
              <p className="lbl mb-1">{typo(col.title)}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="flex min-h-11 items-center text-ink-2 no-underline transition-colors duration-150 hover:text-ink hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {col.title === "Rechtliches" ? <p className="mt-2 text-sm text-ink-2">IXIO AG, Zug</p> : null}
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
