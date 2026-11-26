import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Symbole (UB02 Abschnitt 6): 24 × 24-Raster, Linie 1,7 px, runde Enden, ohne Füllung, currentColor.
 * Bestand 1:1 aus dem Prototyp (netzwerk-app.html Objekt «P», landing.html Objekt «I» inkl. feed/phone).
 * Ergänzungen im gleichen Stil; wo der Styleguide (UB02-styleguide.html) sie zeigt, mit dessen Pfaden.
 */
const PATHS = {
  // Prototyp netzwerk-app.html, Objekt P
  home: <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
  store: (
    <>
      <path d="M3 9l2-5h14l2 5" />
      <path d="M4 9v11h16V9" />
      <path d="M3 9h18" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
    </>
  ),
  forum: (
    <>
      <path d="M4 5h12v9H8l-4 3z" />
      <path d="M16 9h4v9l-3-2h-7v-2" />
    </>
  ),
  news: (
    <>
      <rect x="3" y="4" width="18" height="16" />
      <path d="M7 8h10M7 12h10M7 16h6" />
    </>
  ),
  cal: (
    <>
      <rect x="3" y="5" width="18" height="16" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  folder: <path d="M3 6h7l2 2h9v11H3z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14c3 0 5 2.2 5 5" />
    </>
  ),
  group: (
    <>
      <circle cx="12" cy="7" r="3" />
      <circle cx="5" cy="10" r="2.2" />
      <circle cx="19" cy="10" r="2.2" />
      <path d="M7 20c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    </>
  ),
  map: (
    <>
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  msg: <path d="M4 4h16v12H9l-5 4z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  invite: (
    <>
      <circle cx="10" cy="8" r="4" />
      <path d="M3 21c0-3.9 3.1-7 7-7" />
      <path d="M18 14v6M15 17h6" />
    </>
  ),
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  logout: (
    <>
      <path d="M10 4H5v16h5" />
      <path d="M14 8l4 4-4 4M18 12H9" />
    </>
  ),
  poll: <path d="M5 20V10M12 20V4M19 20v-7" />,
  img: (
    <>
      <rect x="3" y="5" width="18" height="14" />
      <circle cx="9" cy="10" r="2" />
      <path d="M21 16l-5-5-8 8" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" />
      <path d="M16 10l5-3v10l-5-3" />
    </>
  ),
  text: <path d="M5 6h14M5 12h14M5 18h9" />,
  status: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  // Prototyp landing.html, Objekt I (zusätzlich zu P)
  feed: <path d="M4 5h16M4 10h16M4 15h10M4 20h7" />,
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="1" />
      <path d="M11 18h2" />
    </>
  ),
  // Ergänzungen UB02 Abschnitt 6 (Pfade aus dem Styleguide)
  close: <path d="M6 6l12 12M18 6L6 18" />,
  "chevron-left": <path d="M15 6l-6 6 6 6" />,
  "chevron-right": <path d="M9 6l6 6-6 6" />,
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  check: <path d="M5 12l5 5 9-10" />,
  alert: (
    <>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5M12 18v.01" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 16v4h16v-4" />
    </>
  ),
  "eye-off": (
    <>
      <path d="M3 3l18 18" />
      <path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 9 6 9 6a17 17 0 0 1-2.6 3.2M6.6 6.6C4.3 8.1 3 12 3 12s4 6 9 6a8.8 8.8 0 0 0 4-1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  // Ergänzungen UB02 Abschnitt 6 (neu gezeichnet, gleicher Stil)
  download: (
    <>
      <path d="M12 4v12M7 11l5 5 5-5" />
      <path d="M4 16v4h16v-4" />
    </>
  ),
  edit: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16z" />
      <path d="M13 7l4 4" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  filter: <path d="M4 5h16l-6 7.5V19l-4 2v-8.5z" />,
  location: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  "calendar-plus": (
    <>
      <rect x="3" y="5" width="18" height="16" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M12 13v6M9 16h6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4l-9 9" />
      <path d="M18 14v6H4V6h6" />
    </>
  ),
  crosshair: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;
export const ICON_NAMES = Object.keys(PATHS) as IconName[];
/** In Block 1 neu gezeichnet (nicht im Styleguide UB02), vorläufig freigegeben, Abnahme über die Icon-Tafel in UB05 (K8). */
export const ICONS_REDRAWN: readonly IconName[] = ["download", "edit", "trash", "filter", "location", "calendar-plus", "lock", "external", "crosshair"];

type IconProps = {
  name: IconName;
  /** Grösse in px: 18 Navigation/Buttons, 20 Kopfzeile Handy, 22 Tab-Leiste, 24 Erstellen, 28 Landing, 48 nur Icon-Tafel. */
  size?: 12 | 16 | 18 | 20 | 22 | 24 | 28 | 48;
  className?: string;
};

/** Symbol, immer dekorativ (aria-hidden). Ein Icon ist nie die einzige Beschriftung (UB02 6). */
export function Icon({ name, size = 18, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
    >
      {PATHS[name]}
    </svg>
  );
}
