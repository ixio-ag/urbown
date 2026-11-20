import { expect, test } from "@playwright/test";
import { collectConsoleErrors, expectNoAxeViolations } from "./helpers";

// Alle Routen (UB03 Teil F1): Aufruf, eine h1, Titel, keine Konsolenfehler, axe ohne Verstösse.
const ROUTES: { path: string; title: string; h1: RegExp; status?: number }[] = [
  { path: "/", title: "urbown – das geschlossene Netzwerk für Ihre Innenstadt", h1: /Die Innenstadt gehört denen/ },
  { path: "/eigentuemer", title: "Für Eigentümer und Gewerbe – urbown", h1: /Ihr Haus\. Ihre Strasse\./ },
  { path: "/staedte", title: "Für Städte & Ämter – urbown", h1: /Ein Netzwerk für alle, die Ihre/ },
  { path: "/funktionen", title: "Funktionen – urbown", h1: /Alles, was eine Innenstadt/ },
  { path: "/preise", title: "Preise – urbown", h1: /Kostenlos starten\./ },
  { path: "/netzwerke", title: "Netzwerke & Login – urbown", h1: /Ein Login für/ },
  { path: "/kontakt", title: "Kontakt – urbown", h1: /Lassen Sie uns über Ihre/ },
  { path: "/impressum", title: "Impressum – urbown", h1: /^Impressum$/ },
  { path: "/datenschutz", title: "Datenschutz – urbown", h1: /^Datenschutzerklärung$/ },
  { path: "/agb", title: "AGB – urbown", h1: /^Allgemeine Geschäftsbedingungen$/ },
  { path: "/diese-seite-gibt-es-nicht", title: "Seite nicht gefunden – urbown", h1: /Diese Seite gibt es nicht\./, status: 404 },
];

for (const route of ROUTES) {
  test(`Route ${route.path}`, async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(route.status ?? 200);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(route.h1);
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    await page.waitForLoadState("load");
    await expectNoAxeViolations(page);
    // 404 erzeugt im Browser die Meldung zur Antwort 404 – das ist gewollt
    const relevant = errors.filter((e) => !(route.status === 404 && /404/.test(e)));
    expect(relevant, "Konsolenfehler").toEqual([]);
  });
}

test("Styleguide ist ohne ENABLE_STYLEGUIDE nicht erreichbar (404)", async ({ page }) => {
  const response = await page.goto("/_styleguide");
  expect(response?.status()).toBe(404);
});

test("Styleguide mit ENABLE_STYLEGUIDE: erreichbar, noindex, axe ohne Verstösse", async ({ page }) => {
  const errors = collectConsoleErrors(page);
  const response = await page.goto("http://localhost:3103/_styleguide");
  expect(response?.status()).toBe(200);
  expect(response?.headers()["x-robots-tag"]).toContain("noindex");
  await expect(page.locator("h1")).toHaveCount(1);
  await expectNoAxeViolations(page);
  expect(errors).toEqual([]);
});

test("app.localhost zeigt den Platzhalter der Netzwerk-App", async ({ page }) => {
  const response = await page.goto("http://app.localhost:3100/irgendein/pfad");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("Die Netzwerk-App folgt.");
  expect(response?.headers()["x-robots-tag"]).toContain("noindex");
  await expectNoAxeViolations(page);
});

test("Interner App-Bereich ist unter der Landing-Domain nicht erreichbar", async ({ page }) => {
  const response = await page.goto("/app-intern");
  expect(response?.status()).toBe(404);
});

test("Ohne SITE_INDEXABLE: noindex-Kopfzeile und robots.txt «Disallow: /»", async ({ request }) => {
  for (const path of ["/", "/kontakt", "/favicon.ico"]) {
    const res = await request.get(path);
    expect(res.headers()["x-robots-tag"], path).toBe("noindex, nofollow");
  }
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /");
});

test("Sicherheits-Kopfzeilen", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["content-security-policy"]).toContain("https://challenges.cloudflare.com");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["permissions-policy"]).toContain("camera=()");
});

test("Sitemap enthält genau die 7 Hauptseiten", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml.match(/<loc>/g)?.length).toBe(7);
});
