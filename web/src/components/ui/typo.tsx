import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";

/** Markenname «urbown»: nie trennen, nie umbrechen (UB04 6.2, K1). */
export function Brand() {
  return <span className="whitespace-nowrap hyphens-none">urbown</span>;
}

/** Kurze Wörter zusammenhalten, z. B. «6-stelligen», «2-Faktor» (UB04 6.2, K6). */
export function Nowrap({ children }: { children: ReactNode }) {
  return <span className="whitespace-nowrap">{children}</span>;
}

// «urbown» als eigenes Wort oder Wortteil (nicht in «urbown.com»), kurze Bindestrich-Wörter mit Zahl («6-stelligen», «2-Faktor»)
const PATTERN = /(urbown(?!\.com)|\d+-[A-Za-zÄÖÜäöü]+)/g;

function typoString(text: string, keyPrefix: string): ReactNode {
  const parts = text.split(PATTERN);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const key = `${keyPrefix}${i}`;
    return part === "urbown" ? <Brand key={key} /> : <Nowrap key={key}>{part}</Nowrap>;
  });
}

/**
 * Typografie für Inhalte (K1, K6): setzt «urbown» als <Brand> und kurze Bindestrich-Wörter mit Zahl in <Nowrap>.
 * Bearbeitet Zeichenketten, Listen und Fragmente; andere Elemente bleiben unverändert.
 */
export function typo(node: ReactNode, keyPrefix = "t"): ReactNode {
  if (typeof node === "string") return typoString(node, keyPrefix);
  if (Array.isArray(node)) return Children.map(node, (child, i) => typo(child, `${keyPrefix}${i}-`));
  if (isValidElement(node) && node.type === Fragment) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    return <Fragment key={el.key}>{typo(el.props.children, keyPrefix)}</Fragment>;
  }
  return node;
}
