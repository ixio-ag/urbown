import "server-only";
import { createHash, randomBytes } from "node:crypto";

// Rate-Limit im Speicher (UB03 3.7): 5 Anfragen pro IP und Stunde. Die IP wird nur gehasht
// (mit zufälligem Salz je Prozess) und nur für das Zeitfenster gehalten.
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;
const SALT = randomBytes(16);
const hits = new Map<string, number[]>();

function hashIp(ip: string): string {
  return createHash("sha256").update(SALT).update(ip).digest("hex");
}

function prune(now: number) {
  for (const [key, times] of hits) {
    const fresh = times.filter((t) => now - t < WINDOW_MS);
    if (fresh.length) hits.set(key, fresh);
    else hits.delete(key);
  }
}

/** true = Anfrage erlaubt (und gezählt), false = Limit erreicht. */
export function takeRateLimit(ip: string, now = Date.now()): boolean {
  prune(now);
  const key = hashIp(ip || "unbekannt");
  const times = hits.get(key) ?? [];
  if (times.length >= LIMIT) return false;
  times.push(now);
  hits.set(key, times);
  return true;
}
