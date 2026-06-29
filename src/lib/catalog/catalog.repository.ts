import "server-only";
import type {
  Category,
  Product,
  SiteDocument,
} from "@/domain/catalog/catalog.types";
import { getCategory } from "@/domain/catalog/catalog.types";
import { CATEGORIES } from "./data/categories";
import { PRODUCTS } from "./data/products";
import { DOCUMENTS } from "./data/documents";

/**
 * Catalog data access for Tradesika.
 * Reads from local static data (no external database). Functions stay async so
 * call sites (Server Components, sitemap) remain unchanged.
 */

const byDisplayOrder = <T extends { display_order?: number }>(a: T, b: T) =>
  (a.display_order ?? 0) - (b.display_order ?? 0);

const sorted = <T extends { display_order?: number }>(items: T[]): T[] =>
  [...items].sort(byDisplayOrder);

const categoryIdOf = (product: Product): string | undefined =>
  getCategory(product)?._id;

/** All categories ordered for display, including how many products each has. */
export async function getCategoriesWithCounts(): Promise<Category[]> {
  return sorted(CATEGORIES).map((c) => ({
    ...c,
    productCount: PRODUCTS.filter((p) => categoryIdOf(p) === c._id).length,
  }));
}

/** Plain category list (no counts). */
export async function getCategories(): Promise<Category[]> {
  return sorted(CATEGORIES);
}

/** A single category by its slug (used by category landing pages). */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

/** Products of a category (by slug), ordered for display. */
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  return sorted(PRODUCTS.filter((p) => getCategory(p)?.slug === slug));
}

/** Full product catalog with expanded category, ordered for display. */
export async function getAllProducts(): Promise<Product[]> {
  return sorted(PRODUCTS);
}

/** Best-seller products (is_best_seller = yes). */
export async function getBestSellers(limit = 6): Promise<Product[]> {
  return sorted(PRODUCTS.filter((p) => p.is_best_seller === "yes")).slice(0, limit);
}

/** Single product by slug with its category expanded. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

/** All slugs — used for static params / sitemap. */
export async function getAllProductSlugs(): Promise<string[]> {
  return PRODUCTS.map((p) => p.slug).filter(Boolean);
}

/** Related products from the same category, excluding the current one. */
export async function getRelatedProducts(
  categoryId: string,
  excludeProductId: string,
  limit = 3
): Promise<Product[]> {
  if (!categoryId) return [];
  return sorted(
    PRODUCTS.filter(
      (p) => categoryIdOf(p) === categoryId && p._id !== excludeProductId
    )
  ).slice(0, limit);
}

/** Downloadable documents ordered for display. */
export async function getDocuments(): Promise<SiteDocument[]> {
  return sorted(DOCUMENTS);
}
