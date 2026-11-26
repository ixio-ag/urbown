import { DownloadLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { typo } from "@/components/ui/typo";
import { downloadHref, downloadMeta, downloadSummary, type Download } from "@/content/downloads";
import { H3 } from "./section";

/**
 * Download-Kachel im RuleGrid (UB04 6.2): Icon 28 px, h3, Text, Mono-Zeile (Typ · Seiten · Grösse),
 * je Datei ein Button sekundär sm mit download-Attribut. Die Kachel selbst ist nicht verlinkt.
 */
export function DownloadCard({ download }: { download: Download }) {
  const first = download.files[0];
  return (
    <li className="flex min-w-0 flex-col gap-2.5 border-r border-b border-ink bg-white p-6">
      <Icon name="download" size={28} />
      <H3>{download.title}</H3>
      <p className="font-mono text-xs text-ink-2">{downloadSummary(first.file)}</p>
      <p className="text-ink-2">{typo(download.text)}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {download.files.map((f) => {
          const m = downloadMeta(f.file);
          return (
            <DownloadLink
              key={f.file}
              href={downloadHref(f.file)}
              variant="secondary"
              size="sm"
              download={f.view ? undefined : true}
              aria-label={`${f.label}: ${download.title} (${m.type}, ${m.size})`}
            >
              {f.label}
            </DownloadLink>
          );
        })}
      </div>
    </li>
  );
}
