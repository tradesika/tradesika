import type { Metadata } from "next";
import { SITE, getSiteUrl, getMapsDirectionsUrl } from "@/lib/site.config";
import { ASSETS } from "@/assets/files";
import type { Product, SiteDocument } from "@/domain/catalog/catalog.types";
import { getCategory } from "@/domain/catalog/catalog.types";

const SITE_URL = getSiteUrl();
const DEFAULT_OG_IMAGE = ASSETS.heroJobsite.url;

/**
 * Keywords base para todo el sitio, deducidas de cómo se busca un distribuidor
 * Sika en Ecuador: intención transaccional (dónde comprar / venta / cotizar),
 * navegacional (distribuidor autorizado / tienda) y geolocalizada (Guayaquil).
 */
export const SEO_KEYWORDS = [
  "distribuidores especializados Sika en Guayaquil",
  "dónde comprar productos Sika en Guayaquil",
  "distribuidor autorizado Sika Guayaquil",
  "distribuidor Sika Ecuador",
  "venta de productos Sika en Guayaquil",
  "tienda de productos Sika Guayaquil",
  "comprar Sika en Ecuador",
  "Sika Guayaquil",
  "Sika Ecuador",
  "impermeabilizantes Sika Guayaquil",
  "selladores Sikaflex Guayaquil",
  "productos Sika al por mayor Ecuador",
  "cotizar productos Sika Guayaquil",
  "asesoría técnica Sika Ecuador",
  "materiales de construcción Guayaquil",
];

interface PageMetaInput {
  title: string;
  description: string;
  /** Path beginning with "/" */
  path?: string;
  image?: string;
  keywords?: string[];
}

/** Build a complete Next.js Metadata object for a page. */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  keywords = [],
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle =
    path === "/" ? `${SITE.name} — ${SITE.shortTagline}` : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [...SEO_KEYWORDS, ...keywords],
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: fullTitle,
      description,
      url,
      locale: SITE.locale,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

/* ----------------------------- JSON-LD builders ---------------------------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE_URL,
    description: SITE.description,
    slogan: SITE.shortTagline,
    knowsAbout: [
      "Impermeabilización",
      "Selladores y adhesivos",
      "Morteros y reparación de concreto",
      "Aditivos para hormigón",
      "Pisos industriales",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.countryCode,
    },
    contactPoint: SITE.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.e164,
      contactType: "sales",
      areaServed: "EC",
      availableLanguage: ["Spanish"],
    })),
  };
}

/** WebSite schema with a SearchAction (enables Google sitelinks search box). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE.name,
    alternateName: SITE.legalName,
    url: SITE_URL,
    inLanguage: "es-EC",
    publisher: { "@id": `${SITE_URL}/#localbusiness` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/productos?buscar={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * LocalBusiness enriquecido para búsquedas "distribuidor / dónde comprar Sika
 * en Guayaquil". `offerCatalog` (nombres de categorías del repositorio) señala
 * explícitamente qué líneas de producto vende el negocio.
 */
export function localBusinessJsonLd(offerCatalog: string[] = []) {
  const sameAs = [SITE.social.facebook, SITE.social.instagram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE.legalName,
    alternateName: SITE.name,
    description: SITE.description,
    slogan: SITE.shortTagline,
    keywords: SEO_KEYWORDS.join(", "),
    brand: { "@type": "Brand", name: "Sika" },
    image: DEFAULT_OG_IMAGE,
    logo: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    telephone: SITE.phones[0].e164,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Efectivo, Transferencia bancaria, Tarjeta de crédito",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.latitude,
      longitude: SITE.address.longitude,
    },
    hasMap: getMapsDirectionsUrl(),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Ecuador" },
      ...SITE.serviceAreas.map((city) => ({ "@type": "City", name: city })),
    ],
    ...(offerCatalog.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Catálogo de productos Sika",
            itemListElement: offerCatalog.map((name) => ({
              "@type": "OfferCatalog",
              name,
            })),
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** FAQPage schema — las preguntas deben ser visibles en la página que lo emite. */
export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function productJsonLd(product: Product) {
  const category = getCategory(product);
  const url = `${SITE_URL}/productos/${product.slug}`;
  const image = product.image?.url
    ? `${SITE_URL}${product.image.url}`
    : DEFAULT_OG_IMAGE;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.slug,
    description: product.description || product.tagline,
    image: [image],
    category: category?.name,
    brand: { "@type": "Brand", name: "Sika" },
    manufacturer: { "@type": "Organization", name: "Sika" },
    url,
    // Venta consultiva sin precio público: Offer con disponibilidad, sin precio falso.
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceCurrency: "USD",
      seller: { "@type": "Organization", name: SITE.legalName },
      areaServed: { "@type": "Country", name: "Ecuador" },
    },
  };
}

export function itemListJsonLd(products: Product[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: `${SITE_URL}${path}`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/productos/${p.slug}`,
      name: p.name,
    })),
  };
}

export function documentListJsonLd(docs: SiteDocument[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Documentación técnica Sika — Tradesika",
    numberOfItems: docs.length,
    itemListElement: docs.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.title,
    })),
  };
}
