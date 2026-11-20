import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

/** WCAG 2.2 AA (UB02 9, Auftrag F1). */
export const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

export async function expectNoAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    // Turnstile-Iframe von Cloudflare liegt ausserhalb unserer Kontrolle
    .exclude('iframe[src*="challenges.cloudflare.com"]')
    .analyze();
  const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
  expect(summary, "axe-Verstösse").toEqual([]);
}

/** Konsolenfehler sammeln (ab Aufruf). */
export function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return errors;
}

export const MAILPIT_URL = process.env.MAILPIT_URL ?? "http://127.0.0.1:8125";
