import type { MetadataRoute } from "next";

// Web-App-Manifest nach UB02 5.4. Service Worker folgt mit der App (UB22).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "urbown",
    short_name: "urbown",
    description: "Das geschlossene Netzwerk für Ihre Innenstadt.",
    lang: "de",
    start_url: "/",
    display: "standalone",
    theme_color: "#FFFFFF",
    background_color: "#FFFFFF",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192", purpose: "any" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "any" },
      { src: "/icon-maskable-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}
