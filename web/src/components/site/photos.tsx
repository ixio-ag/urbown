import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";
import startSchaufenster from "@/assets/landing/start-schaufenster.jpg";
import eigentuemerPassanten from "@/assets/landing/eigentuemer-passanten.jpg";
import eigentuemerLadenflaeche from "@/assets/landing/eigentuemer-ladenflaeche.jpg";
import staedteFussgaengerzone from "@/assets/landing/staedte-fussgaengerzone.jpg";
import kontaktTasche from "@/assets/landing/kontakt-tasche.jpg";

type PhotoDef = { src: StaticImageData; focus: string; alt: string };

// Fotos, Fokuspunkte und Alt-Texte nach UB03 Abschnitt 4 (wörtlich)
export const PHOTOS = {
  startSchaufenster: {
    src: startSchaufenster,
    focus: "70% 35%",
    alt: "Frau mit Smartphone zeigt lächelnd auf ein Schaufenster in einer Einkaufsstrasse.",
  },
  eigentuemerPassanten: {
    src: eigentuemerPassanten,
    focus: "45% 50%",
    alt: "Zwei Personen mit Einkaufstaschen gehen an einem Ladeneingang vorbei.",
  },
  eigentuemerLadenflaeche: {
    src: eigentuemerLadenflaeche,
    focus: "50% 50%",
    alt: "Helle Ladenfläche mit Kleiderständern, Regalen und einer Kundin.",
  },
  staedteFussgaengerzone: {
    src: staedteFussgaengerzone,
    focus: "50% 55%",
    alt: "Belebte Fussgängerzone mit Altbauten und Strassencafés.",
  },
  kontaktTasche: {
    src: kontaktTasche,
    focus: "50% 30%",
    alt: "Mann im dunklen Anzug hält eine schwarze Stofftasche mit dem urbown-Logo.",
  },
} satisfies Record<string, PhotoDef>;

/**
 * Bildband (UB03 4): eigene Zeile in Containerbreite, Rahmen 1,5 px, 4 : 3 auf dem Handy, 21 : 9 ab 680 px,
 * Fokuspunkt, Abstand oben/unten halbe Sektionshöhe, Hintergrund wie die vorherige Sektion. Nie priority.
 */
export function ImageBand({ photo, background = "white" }: { photo: PhotoDef; background?: "white" | "paper" }) {
  return (
    <div className={cn("band py-[clamp(1.75rem,4vw,3.5rem)]", background === "paper" ? "bg-paper" : "bg-white")}>
      <figure className="relative mx-auto aspect-[4/3] max-w-site overflow-hidden border-[1.5px] border-ink md:aspect-[21/9]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          placeholder="blur"
          loading="lazy"
          sizes="(min-width: 1232px) 1200px, calc(100vw - 2rem)"
          className="object-cover"
          style={{ objectPosition: photo.focus }}
        />
      </figure>
    </div>
  );
}

/** Einzelfoto mit festem Seitenverhältnis (4 : 3 bzw. 2 : 3), Rahmen 1,5 px. */
export function Photo({
  photo,
  ratio,
  sizes,
  className,
}: {
  photo: PhotoDef;
  ratio: "4/3" | "2/3";
  sizes: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden border-[1.5px] border-ink",
        ratio === "4/3" ? "aspect-[4/3]" : "aspect-[2/3] max-h-[32.5rem]",
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        placeholder="blur"
        loading="lazy"
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: photo.focus }}
      />
    </figure>
  );
}
