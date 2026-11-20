import "server-only";

// Öffentliche Testschlüssel von Cloudflare (developers.cloudflare.com/turnstile/troubleshooting/testing/).
// Sie sind dokumentiert und keine Geheimnisse: «immer bestanden» bzw. «unsichtbar».
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function testKeysAllowed(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.TURNSTILE_ALLOW_TEST_KEYS === "true";
}

/** Schlüssel für Turnstile. Ausserhalb von production ohne Werte: Testschlüssel. */
export function getTurnstileKeys(): { siteKey: string; secretKey: string; isTest: boolean } {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (siteKey && secretKey) return { siteKey, secretKey, isTest: false };
  if (testKeysAllowed()) {
    return { siteKey: TURNSTILE_TEST_SITE_KEY, secretKey: TURNSTILE_TEST_SECRET_KEY, isTest: true };
  }
  throw new Error(
    "Turnstile-Schlüssel fehlen: NEXT_PUBLIC_TURNSTILE_SITE_KEY und TURNSTILE_SECRET_KEY setzen (production).",
  );
}

/** Prüft beim Start in production, dass Turnstile konfiguriert ist (Abbruch mit klarer Meldung). */
export function assertTurnstileConfigured(): void {
  getTurnstileKeys();
}

/** Serverseitige Prüfung des Turnstile-Tokens. */
export async function verifyTurnstile(token: string | null | undefined, remoteIp?: string): Promise<boolean> {
  const { secretKey } = getTurnstileKeys();
  if (!token) return false;
  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);
  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
