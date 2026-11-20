import type { MetadataRoute } from "next";
import { MAIN_PAGES } from "@/content/navigation";
import { SITE_URL } from "@/lib/site";

// Nur die 7 Hauptseiten (UB03 Teil E7)
export default function sitemap(): MetadataRoute.Sitemap {
  return MAIN_PAGES.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
