/**
 * Pure formatting helpers for catalog content.
 * Database stores lists as newline-separated text and technical info as
 * "key: value" pairs per line — these helpers parse them safely.
 */

export interface TechSpec {
  label: string;
  value: string;
}

/** Split a newline-separated text field into trimmed, non-empty items. */
export function parseLines(text?: string | null): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/** Parse "key: value" lines into structured technical specs. */
export function parseTechSpecs(text?: string | null): TechSpec[] {
  return parseLines(text).map((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return { label: "", value: line };
    return {
      label: line.slice(0, idx).trim(),
      value: line.slice(idx + 1).trim(),
    };
  });
}

const DOC_TYPE_LABELS: Record<string, string> = {
  catalogo: "Catálogo",
  manual: "Manual",
  ficha_tecnica: "Ficha técnica",
  hoja_seguridad: "Hoja de seguridad",
  comercial: "Documento comercial",
};

export const docTypeLabel = (type?: string): string =>
  (type && DOC_TYPE_LABELS[type]) || "Documento";
