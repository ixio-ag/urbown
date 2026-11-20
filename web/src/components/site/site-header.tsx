import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { SiteNav } from "./site-nav";

/** Kopfzeile Landingpage (UB02 7.2, UB03 2.2): sticky, weiss, schwarze Linie unten, Logo Web 30 px. */
export function SiteHeader() {
  return (
    <header className="band sticky top-[env(safe-area-inset-top)] z-(--z-header) border-b border-ink bg-white">
      <div className="relative mx-auto flex max-w-site items-center justify-between gap-4 py-2.5">
        <Link href="/" aria-label="urbown Startseite" className="inline-flex min-h-11 items-center">
          <Logo variant="web" height={30} />
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
