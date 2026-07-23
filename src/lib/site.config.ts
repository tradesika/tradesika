/**
 * Central business / brand configuration for Tradesika.
 * Safe to import from both server and client components (no secrets here).
 */

export interface PhoneNumber {
  /** Human readable, Ecuador national format */
  display: string;
  /** E.164 format for tel:/wa.me links */
  e164: string;
}

export const getSiteUrl = (): string => {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://www.tradesika.com";
  return raw.replace(/\/$/, "");
};

export const SITE = {
  name: "Tradesika",
  legalName: "Tradesika — Distribuidor Autorizado Sika",
  /** Used in <title> templates and headers */
  shortTagline: "Distribuidor autorizado Sika en Guayaquil, Ecuador",
  longTagline:
    "Soluciones Sika para construcción, impermeabilización y reparación en Guayaquil y todo el Ecuador.",
  description:
    "¿Dónde comprar productos Sika en Guayaquil? Tradesika es distribuidor autorizado Sika en Ecuador: impermeabilizantes, selladores, morteros, aditivos y pisos industriales, al por menor y al por mayor, con asesoría técnica especializada.",
  locale: "es_EC",
  countryName: "Ecuador",

  /** Google Analytics 4 measurement ID (público, no es secreto) */
  gaId: "G-1F88FP0H46",

  /** Ciudades con atención directa — alimenta areaServed (SEO local) y el FAQ */
  serviceAreas: ["Guayaquil", "Samborondón", "Durán", "Daule"],

  address: {
    street: "Acuarela del Río Mz. 1179 Sl. 1-25",
    city: "Guayaquil",
    region: "Guayas",
    country: "Ecuador",
    countryCode: "EC",
    /** Exact store coordinates (map pin, directions y datos estructurados) */
    latitude: -2.137944,
    longitude: -79.882528,
  },

  phones: [
    { display: "099 285 5980", e164: "+593992855980" },
  ] as PhoneNumber[],

  /** WhatsApp uses the primary line */
  whatsapp: {
    e164: "593992855980",
    defaultMessage:
      "Hola Tradesika, quisiera información sobre productos Sika.",
  },

  hours: [
    { days: "Lunes a Viernes", time: "08:00 – 17:00" },
    { days: "Sábados y Domingos", time: "Cerrado" },
  ],

  social: {
    facebook: "",
    instagram: "",
  },
} as const;

/** Primary navigation shared by header and footer */
export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Productos", href: "/productos" },
  { label: "Descargas", href: "/descargas" },
  { label: "Ubicación", href: "/ubicacion" },
  { label: "Contacto", href: "/contacto" },
] as const;

/** Build a wa.me deep link with an optional prefilled message */
export const buildWhatsAppLink = (message?: string): string => {
  const text = encodeURIComponent(message ?? SITE.whatsapp.defaultMessage);
  return `https://wa.me/${SITE.whatsapp.e164}?text=${text}`;
};

/** Google Maps embed URL centrado en las coordenadas exactas (sin API key) */
export const getMapsEmbedUrl = (): string =>
  `https://www.google.com/maps?q=${SITE.address.latitude},${SITE.address.longitude}&z=17&output=embed`;

/** Google Maps directions URL hacia las coordenadas exactas */
export const getMapsDirectionsUrl = (): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${SITE.address.latitude},${SITE.address.longitude}`;
