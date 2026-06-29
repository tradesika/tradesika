import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/catalog/catalog.repository";
import {
  buildMetadata,
  breadcrumbJsonLd,
  itemListJsonLd,
} from "@/lib/seo/seo";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ASSETS } from "@/assets/files";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render all 8 category landing pages at build time. */
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return buildMetadata({
      title: "Categoría no encontrada",
      path: `/productos/categoria/${slug}`,
      description: "La categoría que buscas no está disponible.",
    });
  }
  return buildMetadata({
    title: `${category.name} Sika en Ecuador`,
    path: `/productos/categoria/${category.slug}`,
    description:
      category.description ||
      `Productos Sika de ${category.name} en Ecuador. Asesoría técnica y venta al por menor y al por mayor en Guayaquil.`,
    keywords: [
      category.name,
      `${category.name} Sika`,
      `${category.name} Guayaquil`,
      `${category.name} Ecuador`,
    ],
  });
}

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Productos", path: "/productos" },
          { name: category.name, path: `/productos/categoria/${category.slug}` },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(products, `/productos/categoria/${category.slug}`)}
      />

      <PageHero
        eyebrow="Categoría"
        title={`${category.name} Sika`}
        description={category.description}
        crumbs={[{ name: "Productos", path: "/productos" }, { name: category.name }]}
        image={ASSETS.structure.url}
      />

      <section className="bg-secondary/30 py-14 md:py-20">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {products.length}{" "}
              {products.length === 1 ? "producto" : "productos"} en{" "}
              {category.name}
            </p>
            <Link
              href="/productos"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
            >
              <ArrowLeft className="size-4" /> Ver todo el catálogo
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Pronto agregaremos productos en esta categoría. Escríbenos y te
              asesoramos.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
