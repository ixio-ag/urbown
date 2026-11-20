import { NextResponse, type NextRequest } from "next/server";

/**
 * Auslieferung nach Hostname (UB03 Teil C2, UB01 2.3).
 * - Host «app.*» (lokal app.localhost:3100) → interner Bereich /app-intern (Platzhalter bis UB05).
 * - Alle anderen Hosts → Landingpage; /app-intern ist dort nicht erreichbar (404).
 * - /_styleguide nur mit ENABLE_STYLEGUIDE=true, sonst 404.
 * - Ohne SITE_INDEXABLE=true: X-Robots-Tag «noindex, nofollow» auf allen Antworten.
 */
const APP_AREA = "/app-intern";
const NOT_FOUND = "/__nicht-gefunden";

function isAppHost(host: string | null): boolean {
  if (!host) return false;
  return host.toLowerCase().split(":")[0].startsWith("app.");
}

function isAsset(pathname: string): boolean {
  return pathname.startsWith("/_next/") || /\.[a-z0-9]+$/i.test(pathname);
}

function withRobots(response: NextResponse): NextResponse {
  if (process.env.SITE_INDEXABLE !== "true") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (isAsset(pathname)) {
    return withRobots(NextResponse.next());
  }

  if (isAppHost(host)) {
    // App-Host: alles auf den Platzhalter, immer noindex
    const url = request.nextUrl.clone();
    url.pathname = APP_AREA;
    url.search = "";
    const response = NextResponse.rewrite(url);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  // Landing-Host: interner App-Bereich nicht erreichbar
  if (pathname === APP_AREA || pathname.startsWith(`${APP_AREA}/`)) {
    return withRobots(NextResponse.rewrite(new URL(NOT_FOUND, request.url)));
  }

  if (pathname === "/_styleguide" || pathname.startsWith("/_styleguide/")) {
    if (process.env.ENABLE_STYLEGUIDE !== "true") {
      return withRobots(NextResponse.rewrite(new URL(NOT_FOUND, request.url)));
    }
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return withRobots(NextResponse.next());
}

export const config = {
  matcher: ["/:path*"],
};
