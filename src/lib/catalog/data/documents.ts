import type { SiteDocument } from "@/domain/catalog/catalog.types";

/**
 * Static downloadable documents (formerly the Totalum `document` table).
 * Files live in /public/files; set `file.url` to the public path
 * (or use `external_url` for externally hosted files).
 */
export const DOCUMENTS: SiteDocument[] = [
  {
    _id: "doc-manual-del-constructor-2022",
    title: "Manual del Constructor 2022",
    description:
      "Guía técnica integral de Sika con información detallada sobre aplicaciones, modos de uso, beneficios y recomendaciones para impermeabilización, reparación, sellado, pisos, morteros y aditivos. Referencia indispensable para constructores, maestros y profesionales de la construcción.",
    doc_type: "manual",
    file: {
      name: "manual_del_constructor_2022.pdf",
      url: "/files/manual_del_constructor_2022.pdf",
    },
    display_order: 1,
  },
];
