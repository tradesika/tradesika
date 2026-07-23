import type { SiteDocument } from "@/domain/catalog/catalog.types";

/**
 * Static downloadable documents (formerly the Totalum `document` table).
 * Files live in /public/files; set `file.url` to the public path
 * (or use `external_url` for externally hosted files).
 */
export const DOCUMENTS: SiteDocument[] = [
  {
    _id: "doc-guia-maestra-de-bolsillo-2026",
    title: "Guía Maestra de Bolsillo 2026",
    description:
      "Guía técnica integral de Sika con información detallada sobre aplicaciones, modos de uso, beneficios y recomendaciones para impermeabilización, reparación, sellado, pisos, morteros y aditivos. Referencia indispensable para constructores, maestros y profesionales de la construcción.",
    doc_type: "manual",
    file: {
      name: "guia_maestra_de_bolsillo_2026.pdf",
      url: "/files/guia_maestra_de_bolsillo_2026.pdf",
    },
    display_order: 1,
  },
];
