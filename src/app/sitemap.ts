import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site.config";
import {
  getAllProductSlugs,
  getCategories,
} from "@/lib/catalog/catalog.repository";

// Generated once at build time (required by output: export).
export const dynamic = "force-static";

/**
 * XML sitemap generated at build time from the static catalog data.
 * Includes the marketing pages, every category landing page and product.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/productos`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/descargas`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/ubicacion`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const [slugs, categories] = await Promise.all([
    getAllProductSlugs(),
    getCategories(),
  ]);

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/productos/categoria/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/productos/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
