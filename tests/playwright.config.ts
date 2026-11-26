import { defineConfig, devices } from "@playwright/test";

// Tests gegen «next start» (vorher: npm --prefix web run build).
// Port 3100: wie live (ohne Styleguide, ohne SITE_INDEXABLE). Port 3103: mit ENABLE_STYLEGUIDE=true.
// Kontaktformular: Mail per SMTP an Mailpit (docker compose -f docker/compose.yml up -d mailpit).
const common = {
  TURNSTILE_ALLOW_TEST_KEYS: "true",
  MAIL_TRANSPORT: "smtp",
  SMTP_URL: process.env.SMTP_URL ?? "smtp://127.0.0.1:1125",
  MAIL_TO_CONTACT: "info@urbown.com",
  MAIL_FROM: "urbown <no-reply@urbown.com>",
};

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  timeout: 60_000,
  use: {
    baseURL: "http://localhost:3100",
    locale: "de-CH",
    timezoneId: "Europe/Zurich",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "e2e",
      testIgnore: /abnahme\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    // Nur mit --project=abnahme (npm run abnahme); npm run test:e2e wählt --project=e2e
    { name: "abnahme", testMatch: /abnahme\.spec\.ts/, use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: [
    {
      command: "npx next start -p 3100",
      cwd: "../web",
      url: "http://localhost:3100/",
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      // ausdrücklich aus: eine lokale web/.env.local darf den Test nicht beeinflussen
      env: { ...common, ENABLE_STYLEGUIDE: "false" },
    },
    {
      command: "npx next start -p 3103",
      cwd: "../web",
      url: "http://localhost:3103/",
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      env: { ...common, ENABLE_STYLEGUIDE: "true" },
    },
  ],
});
