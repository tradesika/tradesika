import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site.config";

// Generated once at build time (required by output: export).
export const dynamic = "force-static";

/**
 * Generated robots.txt — allows full crawling and points to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
