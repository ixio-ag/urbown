// Adressen und Firmenangaben (UB03 Abschnitt 2.1). Login und Demo öffnen im selben Fenster.
const trimSlash = (url: string) => url.replace(/\/+$/, "");

export const SITE_URL = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || "https://urbown.com");
export const APP_URL = trimSlash(process.env.NEXT_PUBLIC_APP_URL || "https://app.urbown.com");
export const DEMO_URL = trimSlash(process.env.NEXT_PUBLIC_DEMO_URL || "https://demo.urbown.com");

export const CONTACT_EMAIL = "info@urbown.com";

export const COMPANY = {
  name: "IXIO AG",
  street: "Bahnhofplatz",
  postalCode: "6300",
  city: "Zug",
  country: "Schweiz",
  countryCode: "CH",
} as const;

export const SITE_NAME = "urbown";
