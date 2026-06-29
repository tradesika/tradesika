import type { Metadata } from "next";
import {
  getAllProducts,
  getCategoriesWithCounts,
} from "@/lib/catalog/catalog.repository";
import {
  buildMetadata,
  breadcrumbJsonLd,
  itemListJsonLd,
} from "@/lib/seo/seo";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { WhatsAppAvailabilityNote } from "@/components/common/WhatsAppAvailabilityNote";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { ASSETS } from "@/assets/files";

export const metadata: Metadata = buildMetadata({
  title: "Catálogo de productos Sika",
  path: "/productos",
  description:
    "Catálogo completo de productos Sika en Ecuador: impermeabilizantes, selladores, morteros, aditivos para concreto, pisos industriales y más. Filtra por categoría y encuentra tu solución.",
  keywords: ["catálogo Sika", "productos Sika Guayaquil", "Sika impermeabilizantes"],
});

export default async function ProductosPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategoriesWithCounts(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Productos", path: "/productos" }])}
      />
      <JsonLd data={itemListJsonLd(products, "/productos")} />

      <PageHero
        eyebrow="Catálogo"
        title="Productos Sika para tu obra"
        description="Explora nuestro portafolio de soluciones profesionales. Usa el buscador o filtra por categoría para encontrar el producto ideal."
        crumbs={[{ name: "Productos" }]}
        image={ASSETS.structure.url}
      />

      <section className="bg-secondary/30 py-14 md:py-20">
        <div className="container-x">
          <WhatsAppAvailabilityNote className="mb-8" />
          <CatalogBrowser products={products} categories={categories} />
        </div>
      </section>
    </>
  );
}
