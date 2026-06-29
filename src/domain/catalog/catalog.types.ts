/**
 * Domain models for the Tradesika product catalog.
 * These mirror the Totalum tables: product, product_category, document.
 */

export interface TotalumFile {
  name: string;
  url: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  /** lucide-react icon name, e.g. "Droplets" */
  icon?: string;
  description?: string;
  image?: TotalumFile | null;
  display_order?: number;
  /** Present when counts are requested */
  productCount?: number;
}

export type YesNo = "yes" | "no";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  /** Newline-separated list */
  applications?: string;
  /** Newline-separated list */
  benefits?: string;
  /** Newline-separated "key: value" pairs */
  technical_info?: string;
  presentation?: string;
  image?: TotalumFile | null;
  is_best_seller?: YesNo;
  display_order?: number;
  /** Expanded category or raw id */
  category?: Category | string;
}

export type DocType =
  | "catalogo"
  | "manual"
  | "ficha_tecnica"
  | "hoja_seguridad"
  | "comercial";

export interface SiteDocument {
  _id: string;
  title: string;
  description?: string;
  doc_type?: DocType;
  file?: TotalumFile | null;
  external_url?: string;
  display_order?: number;
}

/** Narrowing helper: category may be a string id or an expanded object */
export const getCategory = (
  product: Product
): Category | undefined =>
  product.category && typeof product.category === "object"
    ? (product.category as Category)
    : undefined;
