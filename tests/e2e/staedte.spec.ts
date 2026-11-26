import { expect, test } from "@playwright/test";
import { expectNoAxeViolations } from "./helpers";

// Seite «Für Städte & Ämter» und Downloads (UB04 Teil E1)
const PDF = "application/pdf";
const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const DOWNLOADS = [
  { file: "urbown-infopaket-staedte.pdf", type: PDF, disposition: "inline", template: false },
  { file: "urbown-muster-beschlussvorlage.docx", type: DOCX, disposition: "attachment", template: true },
  { file: "urbown-muster-beschlussvorlage.pdf", type: PDF, disposition: "inline", template: true },
  { file: "urbown-av-vertrag-entwurf.docx", type: DOCX, disposition: "attachment", template: true },
  { file: "urbown-av-vertrag-entwurf.pdf", type: PDF, disposition: "inline", template: true },
];

test("/staedte: axe ohne Verstösse, genau eine h1, Abschnitte in der Reihenfolge von UB04", async ({ page }) => {
  await page.goto("/staedte");
  await expect(page).toHaveTitle("Für Städte & Ämter – urbown");
  await expect(page.locator("h1")).toHaveCount(1);
  const h2 = await page.locator("main h2").allTextContents();
  expect(h2).toEqual([
    "Was Ihre Verwaltung gewinnt.",
    "So arbeiten wir mit Ihrer Verwaltung.",
    "Mannheim ist seit 2022 dabei.",
    "Erst testen, dann entscheiden.",
    "Programme, an die urbown anknüpfen kann.",
    "Vertraulich von Anfang an.",
    "Alles für Verwaltung und Gemeinderat.",
    "Fragen aus Verwaltungen.",
    "Sehen Sie sich urbown in 30 Minuten an.",
  ]);
  await expectNoAxeViolations(page);
});

test("/staedte: alle 11 FAQ-Einträge per Tastatur öffnen und schliessen", async ({ page }) => {
  await page.goto("/staedte");
  const summaries = page.locator('section[aria-labelledby="fragen"] summary');
  await expect(summaries).toHaveCount(11);
  for (let i = 0; i < 11; i++) {
    const summary = summaries.nth(i);
    const details = summary.locator("..");
    await summary.focus();
    await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(details).toHaveAttribute("open", "");
    await page.keyboard.press("Space");
    await expect(details).not.toHaveAttribute("open", "");
  }
});

test("/staedte: Hero-Button zeigt auf das Infopaket", async ({ page }) => {
  await page.goto("/staedte");
  const button = page.getByRole("link", { name: /^Infopaket herunterladen \(PDF, \d+ KB\)$/ });
  await expect(button).toHaveAttribute("href", "/downloads/urbown-infopaket-staedte.pdf");
  await expect(button).toHaveAttribute("download", "");
});

test("/staedte: Unterlagen mit Typ, Seiten und Grösse aus den Dateien", async ({ page }) => {
  await page.goto("/staedte");
  const section = page.locator('section[aria-labelledby="unterlagen"]');
  await expect(section.getByText(/^PDF · 8 Seiten · \d+ KB$/)).toBeVisible();
  await expect(section.getByText(/^Word · \d+ KB$/)).toHaveCount(2);
  const hrefs = await section.locator("a[href^='/downloads/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  expect(hrefs.sort()).toEqual(DOWNLOADS.map((d) => `/downloads/${d.file}`).sort());
});

test("Downloads: HTTP 200, Content-Type und Kopfzeilen (UB04 C3)", async ({ request }) => {
  for (const d of DOWNLOADS) {
    const res = await request.get(`/downloads/${d.file}`);
    expect(res.status(), d.file).toBe(200);
    const h = res.headers();
    expect(h["content-type"], d.file).toContain(d.type);
    expect(h["content-disposition"], d.file).toBe(d.disposition);
    expect(h["cache-control"], d.file).toBe("public, max-age=3600");
    // Testserver läuft ohne SITE_INDEXABLE: alle noindex; die Vorlagen tragen noindex immer (next.config)
    expect(h["x-robots-tag"], d.file).toContain("noindex");
  }
});
