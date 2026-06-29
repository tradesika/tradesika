// All static assets (images, logos, documents) used across the Tradesika site.
// Atmospheric / editorial imagery is sourced from Unsplash (validated URLs).
// Product imagery lives in /public/images (use record.image.url).

export const ASSETS = {
  // Hero — construction / engineering jobsite
  heroJobsite: {
    description: "Obra de construcción al atardecer — hero principal",
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
  },
  heroEngineer: {
    description: "Ingeniero revisando planos en obra",
    url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
  },
  // About / company
  warehouse: {
    description: "Centro de distribución de materiales de construcción",
    url: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80",
  },
  siteOverview: {
    description: "Vista general de obra civil",
    url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
  },
  concreteTexture: {
    description: "Textura de hormigón / banda CTA",
    url: "https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=1600&q=80",
  },
  structure: {
    description: "Estructura de hormigón armado",
    url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
  },
} as const;

// Legacy/compat map kept for any code expecting `files`.
export const files: { [fileName: string]: { description: string; url: string } } = {
  heroJobsite: ASSETS.heroJobsite,
  warehouse: ASSETS.warehouse,
};
