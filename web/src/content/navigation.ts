// Kopfzeile und Footer (UB03 2.2, 2.3)
export const MAIN_NAV = [
  { href: "/eigentuemer", label: "Für Eigentümer" },
  { href: "/staedte", label: "Für Städte & Ämter" },
  { href: "/funktionen", label: "Funktionen" },
  { href: "/preise", label: "Preise" },
  { href: "/netzwerke", label: "Login" },
] as const;

export const MOBILE_NAV = [
  { href: "/", label: "Start" },
  { href: "/eigentuemer", label: "Für Eigentümer" },
  { href: "/staedte", label: "Für Städte & Ämter" },
  { href: "/funktionen", label: "Funktionen" },
  { href: "/preise", label: "Preise" },
  { href: "/netzwerke", label: "Netzwerke & Login" },
  { href: "/kontakt", label: "Demo anfragen" },
] as const;

export const FOOTER_NAV = [
  {
    title: "Für wen",
    links: [
      { href: "/eigentuemer", label: "Eigentümer" },
      { href: "/eigentuemer", label: "Gewerbe" },
      { href: "/staedte", label: "Städte & Ämter" },
    ],
  },
  {
    title: "urbown",
    links: [
      { href: "/funktionen", label: "Funktionen" },
      { href: "/preise", label: "Preise" },
      { href: "/netzwerke", label: "Netzwerke & Login" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/agb", label: "AGB" },
    ],
  },
] as const;

/** Hauptseiten für Sitemap, Tests, Lighthouse und Abnahme-Bildschirmfotos. */
export const MAIN_PAGES = ["/", "/eigentuemer", "/staedte", "/funktionen", "/preise", "/netzwerke", "/kontakt"] as const;
