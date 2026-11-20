import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { SITE_URL } from "@/lib/site";

// robots.txt (UB03 2.4): ohne SITE_INDEXABLE=true «Disallow: /». Zur Laufzeit gelesen.
export default async function robots(): Promise<MetadataRoute.Robots> {
  await connection();
  if (process.env.SITE_INDEXABLE !== "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/_styleguide", "/app-intern"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
