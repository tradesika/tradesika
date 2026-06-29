import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { Product } from "@/domain/catalog/catalog.types";
import { getCategory } from "@/domain/catalog/catalog.types";
import { CategoryIcon } from "@/components/common/CategoryIcon";

/** Presentational product card used across catalog, home and detail pages. */
export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product);
  const isBestSeller = product.is_best_seller === "yes";

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="card-lift group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {product.image?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image.url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <CategoryIcon name={category?.icon} className="size-10" />
          </div>
        )}

        {isBestSeller && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink shadow-sm">
            <Star className="size-3 fill-ink" /> Más vendido
          </span>
        )}

        {category && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur">
            <CategoryIcon name={category.icon} className="size-3 text-brand" />
            {category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="mt-1.5 text-sm font-medium text-brand">
            {product.tagline}
          </p>
        )}
        {product.description && (
          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          {product.presentation && (
            <span className="text-xs text-muted-foreground">
              {product.presentation.split("·")[0].trim()}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors group-hover:text-brand">
            Ver ficha
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
