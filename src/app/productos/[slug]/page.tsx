import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Layers,
  Package,
  MessageCircle,
  Phone,
  ArrowLeft,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import {
  getProductBySlug,
  getRelatedProducts,
  getAllProductSlugs,
} from "@/lib/catalog/catalog.repository";
import { getCategory } from "@/domain/catalog/catalog.types";
import { parseLines, parseTechSpecs } from "@/lib/catalog/format";
import {
  buildMetadata,
  breadcrumbJsonLd,
  productJsonLd,
} from "@/lib/seo/seo";
import { JsonLd } from "@/components/common/JsonLd";
import { WhatsAppAvailabilityNote } from "@/components/common/WhatsAppAvailabilityNote";
import { ProductCard } from "@/components/catalog/ProductCard";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SITE, buildWhatsAppLink } from "@/lib/site.config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every product page at build time (static = fast indexing). */
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return buildMetadata({
      title: "Producto no encontrado",
      path: `/productos/${slug}`,
      description: "El producto que buscas no está disponible.",
    });
  }
  const category = getCategory(product);
  const intro = (product.tagline || product.description?.slice(0, 110) || product.name)
    .trim()
    .replace(/\.+$/, "");
  return buildMetadata({
    title: `${product.name} en Guayaquil`,
    path: `/productos/${product.slug}`,
    description: `${intro}. Compra ${product.name} en Tradesika, distribuidor autorizado Sika en Guayaquil. Cotiza por WhatsApp con asesoría técnica.`,
    image: product.image?.url,
    keywords: [
      product.name,
      `comprar ${product.name}`,
      `${product.name} Guayaquil`,
      `${product.name} Ecuador`,
      `precio ${product.name} Ecuador`,
      "Sika",
      category?.name ?? "",
    ].filter(Boolean),
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product);
  const applications = parseLines(product.applications);
  const benefits = parseLines(product.benefits);
  const specs = parseTechSpecs(product.technical_info);
  const related = category
    ? await getRelatedProducts(category._id, product._id, 3)
    : [];

  const waMessage = `Hola Tradesika, me interesa el producto ${product.name}. ¿Me pueden dar información y precio?`;

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Productos", path: "/productos" },
          ...(category
            ? [{ name: category.name, path: `/productos/categoria/${category.slug}` }]
            : []),
          { name: product.name, path: `/productos/${product.slug}` },
        ])}
      />

      {/* Breadcrumb bar */}
      <div className="border-b border-border bg-secondary/40">
        <div className="container-x flex items-center gap-2 py-3 text-sm text-muted-foreground">
          <Link href="/productos" className="inline-flex items-center gap-1.5 hover:text-brand">
            <ArrowLeft className="size-4" /> Volver al catálogo
          </Link>
        </div>
      </div>

      {/* Main */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
              {product.image?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image.url}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center">
                  <CategoryIcon name={category?.icon} className="size-16 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            {category && (
              <Link
                href={`/productos/categoria/${category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand transition-colors hover:bg-brand/15"
              >
                <CategoryIcon name={category.icon} className="size-3.5" />
                {category.name}
              </Link>
            )}

            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="mt-2 text-lg font-semibold text-brand">
                {product.tagline}
              </p>
            )}
            {product.description && (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            {product.presentation && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-secondary/50 p-4">
                <Package className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Presentación
                  </div>
                  <div className="mt-0.5 font-semibold text-ink">
                    {product.presentation}
                  </div>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
              >
                <MessageCircle className="size-4" /> Cotizar este producto
              </a>
              <a
                href={`tel:${SITE.phones[0].e164}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/15 px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <Phone className="size-4" /> Llamar ahora
              </a>
            </div>

            <WhatsAppAvailabilityNote waMessage={waMessage} className="mt-6" />

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="mt-9">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <Sparkles className="size-5 text-brand" /> Beneficios
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-ink">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Applications + technical info */}
      {(applications.length > 0 || specs.length > 0) && (
        <section className="border-t border-border bg-secondary/30 py-14 md:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-2">
            {applications.length > 0 && (
              <div>
                <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
                  <ClipboardList className="size-5 text-brand" /> Aplicaciones
                </h2>
                <ul className="mt-5 space-y-3">
                  {applications.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-3 rounded-lg border border-border bg-white p-4 text-sm text-ink"
                    >
                      <Layers className="mt-0.5 size-4 shrink-0 text-brand" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {specs.length > 0 && (
              <div>
                <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
                  <ClipboardList className="size-5 text-brand" /> Información técnica
                </h2>
                <dl className="mt-5 overflow-hidden rounded-lg border border-border bg-white">
                  {specs.map((s, i) => (
                    <div
                      key={`${s.label}-${i}`}
                      className="flex flex-col gap-0.5 border-b border-border px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <dt className="text-sm font-semibold text-muted-foreground">
                        {s.label}
                      </dt>
                      <dd className="text-sm font-medium text-ink sm:text-right">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-muted-foreground">
                  Los valores técnicos son referenciales. Consulta la ficha
                  técnica oficial en la sección{" "}
                  <Link href="/descargas" className="font-semibold text-brand hover:underline">
                    Descargas
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="También te puede interesar"
              title={`Más de ${category?.name ?? "esta línea"}`}
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
