import type { Metadata, Viewport } from "next";
import { archivo, inter, plexMono } from "./fonts";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "urbown – das geschlossene Netzwerk für Ihre Innenstadt", template: "%s – urbown" },
  applicationName: SITE_NAME,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

// Ein Root-Layout für alle Bereiche. body.site = Landingpage (UB02 4.2); App-Platzhalter und
// Styleguide setzen ihren Hintergrund selbst (Entscheid Block 1, siehe docs/claude-code-uebergabe.md).
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="site">{children}</body>
    </html>
  );
}
