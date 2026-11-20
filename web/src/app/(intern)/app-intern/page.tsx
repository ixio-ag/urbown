import type { Metadata } from "next";
import { Logo } from "@/components/ui/logo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "urbown – Netzwerk-App" },
  robots: { index: false, follow: false },
};

// Platzhalter für app.urbown.com bis UB05. Nur über den App-Host erreichbar (proxy.ts).
export default function AppPlaceholder() {
  return (
    <main id="main" className="band grid min-h-dvh place-items-center bg-paper py-16 lg:text-ui">
      <div className="flex w-full max-w-login flex-col items-start gap-6">
        <Logo variant="original" height={44} />
        <div className="flex flex-col gap-2">
          <span className="lbl">app.urbown.com</span>
          <h1 className="text-4xl font-extrabold">Die Netzwerk-App folgt.</h1>
          <p className="text-ink-2">Hier entsteht der zentrale Login für alle urbown-Netzwerke.</p>
        </div>
        <a href={SITE_URL} className="font-medium underline underline-offset-[3px] hover:decoration-2">
          Zur Website urbown.com
        </a>
      </div>
    </main>
  );
}
