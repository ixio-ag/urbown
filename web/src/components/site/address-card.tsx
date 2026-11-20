"use client";

import { useState } from "react";
import { Input } from "@/components/ui/form";
import { citySlug } from "@/lib/slug";
import { HeroCard } from "./section";

/** Adress-Kasten mit Live-Eingabe (UB03 3.1): «Wie heisst Ihre Stadt?» → app.urbown.com/kuerzel. */
export function AddressCard() {
  const [city, setCity] = useState("");
  const slug = citySlug(city) || "ihrestadt";

  return (
    <HeroCard label="Jede Stadt ihr eigenes Netzwerk">
      <section aria-label="Ihre Stadt bei urbown" className="flex flex-col gap-3.5">
        <p
          aria-live="polite"
          className="border-b-[1.5px] border-ink pb-2.5 font-mono text-addr break-all"
        >
          app.urbown.com/<b className="bg-ink px-1 font-medium text-white">{slug}</b>
        </p>
        <p className="font-mono text-sm text-ink-2">Kurzadresse {slug}.urbown.com</p>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="stadt" className="text-sm font-semibold">
            Wie heisst Ihre Stadt?
          </label>
          <Input
            id="stadt"
            shape="site"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="z. B. Heidelberg oder Winterthur"
            autoComplete="off"
            maxLength={60}
          />
        </div>
        <p className="text-sm text-ink-2">Geschlossen, nur mit Login und nur auf Einladung. Ein Login für alle Netzwerke.</p>
      </section>
    </HeroCard>
  );
}
