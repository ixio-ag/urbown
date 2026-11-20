import { archivoBlack } from "../fonts";
import { SkipLink } from "@/components/ui/skip-link";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/** Landing-Layout (UB03 Teil E1): Sprunglink, Kopfzeile, Inhalt, Footer. Archivo 900 nur hier. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className={`${archivoBlack.variable} flex min-h-dvh flex-col`}>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
