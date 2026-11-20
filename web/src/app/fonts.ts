import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";

// Schriften nach UB02 Abschnitt 4.1 (selbst gehostet über next/font, kein Aufruf zu Google im Browser).
// Abweichung nach Auftrag UB03 Teil D1 / UB02 Abschnitt 11: Archivo 900 nicht hier, sondern als eigene
// Instanz «archivoBlack», die nur im Landing-Layout geladen wird.
export const archivo = Archivo({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-archivo", display: "swap" });
export const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
export const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

/** Nur Landingpage: Archivo 900 für h1, Konturziffern und grosse Zahlen (Utility font-display-black). */
export const archivoBlack = Archivo({ subsets: ["latin"], weight: ["900"], variable: "--font-archivo-black", display: "swap" });
