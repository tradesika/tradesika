import type { Category } from "@/domain/catalog/catalog.types";

/**
 * Static catalog categories (formerly the Totalum `product_category` table).
 * `display_order` defines the order shown across the site.
 * Images are rendered locally from /public when present.
 */
export const CATEGORIES: Category[] = [
  {
    _id: "cat-impermeabilizacion",
    name: "Impermeabilización",
    slug: "impermeabilizacion",
    icon: "Droplets",
    display_order: 1,
    image: null,
    description:
      "Soluciones para proteger estructuras contra el agua y la humedad: cimentaciones, cisternas, tanques, baños, terrazas y muros. Sistemas integrales que prolongan la vida útil de la obra.",
  },
  {
    _id: "cat-sellado-y-pegado",
    name: "Sellado y Pegado",
    slug: "sellado-y-pegado",
    icon: "Combine",
    display_order: 2,
    image: null,
    description:
      "Selladores elásticos y adhesivos de alto desempeño para juntas, fisuras, fachadas, ventanería y pegado estructural. Flexibilidad y adherencia duraderas frente al movimiento y la intemperie.",
  },
  {
    _id: "cat-reparacion-estructural",
    name: "Reparación Estructural",
    slug: "reparacion-estructural",
    icon: "Wrench",
    display_order: 3,
    image: null,
    description:
      "Morteros de reparación, puentes de adherencia y sistemas epóxicos para restaurar y reforzar elementos de concreto deteriorados, recuperando capacidad estructural y protección anticorrosiva.",
  },
  {
    _id: "cat-construccion",
    name: "Construcción",
    slug: "construccion",
    icon: "Building2",
    display_order: 4,
    image: null,
    description:
      "Aditivos para concreto y mortero que optimizan la trabajabilidad, resistencia y durabilidad: plastificantes, superplastificantes, acelerantes, curadores y desmoldantes para obra civil.",
  },
  {
    _id: "cat-pisos-industriales",
    name: "Pisos Industriales",
    slug: "pisos-industriales",
    icon: "LayoutGrid",
    display_order: 5,
    image: null,
    description:
      "Recubrimientos epóxicos y poliuretánicos, autonivelantes y endurecedores para pisos de alto tránsito en industria, bodegas, parqueaderos y áreas de proceso. Superficies resistentes, higiénicas y fáciles de limpiar.",
  },
  {
    _id: "cat-cubiertas",
    name: "Cubiertas",
    slug: "cubiertas",
    icon: "House",
    display_order: 6,
    image: null,
    description:
      "Membranas líquidas y sistemas de impermeabilización para techos, losas y cubiertas. Protección continua, transitable y resistente a los rayos UV y al clima del litoral ecuatoriano.",
  },
  {
    _id: "cat-morteros",
    name: "Morteros",
    slug: "morteros",
    icon: "BrickWall",
    display_order: 7,
    image: null,
    description:
      "Morteros predosificados de relleno, nivelación, anclaje y acabado de alta resistencia. Soluciones listas para usar que garantizan desempeño uniforme y rendimiento controlado en obra.",
  },
  {
    _id: "cat-otras-lineas-sika",
    name: "Otras Líneas Sika",
    slug: "otras-lineas-sika",
    icon: "Boxes",
    display_order: 8,
    image: null,
    description:
      "Anclajes químicos, protección de fachadas, curadores y soluciones especializadas que complementan el portafolio Sika para necesidades específicas de cada proyecto.",
  },
];

/** Lookup a category by its slug (used to attach categories to products). */
export const CATEGORY_BY_SLUG: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);
