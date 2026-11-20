import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

type PageMeta = {
  path: string;
  /** Titel ohne «– urbown» (Vorlage im Root-Layout). */
  title?: string;
  /** Vollständiger Titel (Startseite). */
  absoluteTitle?: string;
  description?: string;
  /** Rechtstexte bis UB25: noindex. */
  noindex?: boolean;
};

/** Metadaten je Seite (UB03 2.4): Titel, Beschreibung, Canonical, Open Graph. */
export function pageMetadata({ path, title, absoluteTitle, description, noindex }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ?? `${title} – ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "de_CH",
      siteName: SITE_NAME,
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      title: fullTitle,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "urbown – Das geschlossene Netzwerk für Ihre Innenstadt" }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og-image.png"] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
