import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/domain/catalog/catalog.types";
import { ProductCard } from "@/components/catalog/ProductCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

export function BestSellers({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Productos más vendidos"
            title="Los favoritos de constructores y maestros"
            description="Selección de los productos Sika con mayor rotación. Probados en obra, listos en stock."
          />
          <Link
            href="/productos"
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-ink/15 px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Ver todos
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p._id} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
