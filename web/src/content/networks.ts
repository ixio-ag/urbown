// Netzwerkliste (UB03 3.6). Statisch in Block 1, ab UB05 aus der Datenbank (nur Status «aktiv»).
export type NetworkRow = {
  city: string;
  network: string;
  shortAddress: string;
  status: { kind: "badge-solid" | "badge-outline"; label: string } | { kind: "link"; label: string; href: string };
};

export const NETWORKS: NetworkRow[] = [
  {
    city: "Mannheim",
    network: "app.urbown.com/mannheim",
    shortAddress: "mannheim.urbown.com",
    status: { kind: "badge-solid", label: "aktiv" },
  },
  {
    city: "Demo",
    network: "app.urbown.com/demo",
    shortAddress: "demo.urbown.com",
    status: { kind: "badge-outline", label: "zum Testen" },
  },
  {
    city: "Ihre Stadt",
    network: "app.urbown.com/ihrestadt",
    shortAddress: "ihrestadt.urbown.com",
    status: { kind: "link", label: "So starten Sie", href: "/staedte" },
  },
];
