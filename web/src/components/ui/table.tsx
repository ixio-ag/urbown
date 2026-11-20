import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Kv } from "./card";

export type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  /** Zahlen rechtsbündig mit tabellarischen Ziffern. */
  numeric?: boolean;
};

type TableProps<T> = {
  label: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /**
   * «cards»: unter 680 px als Kartenliste (Admin/Superadmin, UB02 8.10).
   * «scroll»: immer Tabelle, horizontal scrollbar (kurze Vergleichstabellen, Landing).
   */
  mobile?: "cards" | "scroll";
  /** Spalten für die Kartenliste (Titel = erste Spalte). */
  actions?: (row: T) => ReactNode;
  className?: string;
};

/** Tabelle (UB02 8.10) mit per Tastatur scrollbarer Hülle. */
export function Table<T>({ label, columns, rows, rowKey, mobile = "scroll", actions, className }: TableProps<T>) {
  const [first, ...rest] = columns;
  return (
    <div className={className}>
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cn("overflow-x-auto", mobile === "cards" && "hidden md:block")}
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={cn(
                    "lbl border-b border-ink px-3 py-2.5 text-left font-normal whitespace-nowrap",
                    c.numeric && "text-right",
                  )}
                >
                  {c.header}
                </th>
              ))}
              {actions ? (
                <th scope="col" className="lbl border-b border-ink px-3 py-2.5 text-left font-normal">
                  <span className="sr-only">Aktionen</span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={rowKey(row)} className="transition-colors duration-150 hover:bg-hover">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn("border-b border-line px-3 py-2.5 align-top", c.numeric && "num text-right")}
                  >
                    {c.cell(row)}
                  </td>
                ))}
                {actions ? <td className="border-b border-line px-3 py-1 align-top">{actions(row)}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mobile === "cards" ? (
        <ul className="divide-y divide-line border-t border-ink md:hidden" aria-label={label}>
          {rows.map((row) => (
            <li key={rowKey(row)} className="flex flex-col gap-2 py-3.5">
              <div className="font-semibold">{first.cell(row)}</div>
              <Kv items={rest.map((c) => ({ term: c.header, value: c.cell(row) }))} />
              {actions ? <div className="flex flex-wrap gap-2">{actions(row)}</div> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
