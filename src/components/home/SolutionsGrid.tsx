import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/domain/catalog/catalog.types";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

/** "Soluciones por categoría" — the 8 Sika solution lines. */
export function SolutionsGrid({ categories }: { categories: Category[] }) {
  return (
    <section id="soluciones" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Soluciones por categoría"
          title="Encuentra el sistema Sika para cada etapa de tu obra"
          description="Organizamos nuestro portafolio en líneas de solución para que llegues más rápido al producto que tu proyecto necesita."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal as="article" key={cat._id} delay={i * 60}>
              <Link
                href={`/productos/categoria/${cat.slug}`}
                className="card-lift group flex h-full flex-col rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <CategoryIcon name={cat.icon} className="size-6" />
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {cat.name}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
                {typeof cat.productCount === "number" && (
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand">
                    {cat.productCount} productos
                  </span>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
