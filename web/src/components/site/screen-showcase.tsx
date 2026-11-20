import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import dashboard from "@/assets/screens/dashboard.png";
import flaechen from "@/assets/screens/flaechen.png";
import umfrage from "@/assets/screens/umfrage.png";
import karte from "@/assets/screens/karte.png";
import dokumente from "@/assets/screens/dokumente.png";

type Screen = { src: StaticImageData; caption: string; alt: string };

// Bildschirmfotos «Einblick» (UB03 Abschnitt 5, Texte wörtlich). Erzeugt mit npm run screenshots.
const SCREENS = {
  dashboard: {
    src: dashboard,
    caption: "Dashboard: alles Neue nach dem Login",
    alt: "Dashboard im Demo-Netzwerk mit Newsfeed, einer Umfrage und rechts den neuesten vakanten Flächen und Events.",
  },
  flaechen: {
    src: flaechen,
    caption: "Vakante Flächen",
    alt: "Liste vakanter Flächen auf dem Handy mit Fläche, Schaufensterfront und «verfügbar ab».",
  },
  umfrage: {
    src: umfrage,
    caption: "Umfrage im Feed",
    alt: "Umfrage im Feed auf dem Handy mit Ergebnissen in Prozent.",
  },
  karte: {
    src: karte,
    caption: "Karte mit Flächen, Inseraten und Events",
    alt: "Stadtkarte in Graustufen mit Markierungen für vakante Flächen, Immobilien, Events und Orte.",
  },
  dokumente: {
    src: dokumente,
    caption: "Dokumente in Ordnern",
    alt: "Dokumentenablage mit Ordnern und Dateien, jeweils mit Datum und Grösse.",
  },
} satisfies Record<string, Screen>;

/** Computer-Rahmen: 1,5 px, Leiste mit «app.urbown.com/demo», keine Fensterknöpfe. */
export function DesktopFrame({ screen, sizes }: { screen: Screen; sizes: string }) {
  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <div className="overflow-hidden border-[1.5px] border-ink bg-white">
        <div className="border-b border-ink px-3 py-2 font-mono text-xs text-ink-2">app.urbown.com/demo</div>
        <Image src={screen.src} alt={screen.alt} sizes={sizes} loading="lazy" placeholder="blur" className="block h-auto w-full" />
      </div>
      <figcaption className="lbl">{screen.caption}</figcaption>
    </figure>
  );
}

/** Handy-Rahmen: 1,5 px, rounded-lg, Innenabstand 6 px, Bild rounded-md, keine Geräte-Attrappe. */
export function PhoneFrame({ screen, sizes }: { screen: Screen; sizes: string }) {
  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <div className="rounded-lg border-[1.5px] border-ink bg-white p-1.5">
        <Image src={screen.src} alt={screen.alt} sizes={sizes} loading="lazy" placeholder="blur" className="block h-auto w-full rounded-md" />
      </div>
      <figcaption className="lbl">{screen.caption}</figcaption>
    </figure>
  );
}

/**
 * Anordnung (UB03 5): ab 900 px Computer links (2/3), rechts zwei Handys nebeneinander, unten bündig;
 * Variante «funktionen» mit zweiter Zeile (zwei Computer je 1/2). Handy: Computer voll, darunter zwei Handys.
 */
export function ScreenShowcase({ variant, children }: { variant: "start" | "funktionen"; children?: ReactNode }) {
  const desktopSizes = "(min-width: 1232px) 780px, (min-width: 900px) 64vw, calc(100vw - 2rem)";
  const phoneSizes = "(min-width: 1232px) 185px, (min-width: 900px) 15vw, calc(50vw - 1.5rem)";
  const halfSizes = "(min-width: 1232px) 590px, (min-width: 900px) 48vw, calc(100vw - 2rem)";
  return (
    <div className="flex flex-col gap-8">
      <div className="grid items-end gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DesktopFrame screen={SCREENS.dashboard} sizes={desktopSizes} />
        </div>
        <div className="grid grid-cols-2 items-end gap-4">
          <PhoneFrame screen={SCREENS.flaechen} sizes={phoneSizes} />
          <PhoneFrame screen={SCREENS.umfrage} sizes={phoneSizes} />
        </div>
      </div>
      {variant === "funktionen" ? (
        <div className={cn("grid gap-6 md:grid-cols-2")}>
          <DesktopFrame screen={SCREENS.karte} sizes={halfSizes} />
          <DesktopFrame screen={SCREENS.dokumente} sizes={halfSizes} />
        </div>
      ) : null}
      {children}
    </div>
  );
}
