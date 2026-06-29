"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  X,
  PackageSearch,
  SlidersHorizontal,
  ChevronDown,
  Check,
} from "lucide-react";
import type { Product, Category } from "@/domain/catalog/catalog.types";
import { getCategory } from "@/domain/catalog/catalog.types";
import { ProductCard } from "./ProductCard";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { cn } from "@/lib/utils";

interface Props {
  products: Product[];
  categories: Category[];
}

const ALL = "all";

export function CatalogBrowser({ products, categories }: Props) {
  const [active, setActive] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Deep-link support: read ?categoria= / ?buscar= from the URL on mount.
  // Done client-side so the /productos page stays statically exportable.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("categoria");
    const q = params.get("buscar");
    if (cat && categories.some((c) => c.slug === cat)) setActive(cat);
    if (q) setQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close the category dropdown on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeCategory = categories.find((c) => c.slug === active);
  const activeLabel =
    active === ALL ? "Todas las categorías" : activeCategory?.name ?? "Todas";
  const activeCount =
    active === ALL ? products.length : activeCategory?.productCount ?? 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const cat = getCategory(p);
      const matchCat = active === ALL || cat?.slug === active;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.tagline?.toLowerCase().includes(q) ?? false) ||
        (p.description?.toLowerCase().includes(q) ?? false) ||
        (cat?.name.toLowerCase().includes(q) ?? false)
      );
    });
  }, [products, active, query]);

  function select(slug: string) {
    setActive(slug);
    setOpen(false);
  }

  return (
    <div>
      {/* Search + category dropdown */}
      <div className="mx-auto mb-7 flex max-w-2xl flex-col gap-3 sm:flex-row">
        {/* Search box */}
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-white px-4 shadow-sm focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar: Sikaflex, impermeabilizante, mortero…"
            aria-label="Buscar productos"
            className="h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="text-muted-foreground hover:text-ink"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Category dropdown */}
        <div className="relative shrink-0 sm:w-64" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label="Filtrar por categoría"
            className="flex h-12 w-full items-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-ink/30"
          >
            <SlidersHorizontal className="size-4 shrink-0 text-brand" />
            <span className="flex-1 truncate text-left">{activeLabel}</span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
              {activeCount}
            </span>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-muted-foreground transition-transform",
                open && "rotate-180"
              )}
            />
          </button>

          {open && (
            <div
              role="listbox"
              aria-label="Categorías"
              className="absolute right-0 z-30 mt-2 max-h-[60vh] w-full min-w-[15rem] overflow-y-auto rounded-xl border border-border bg-white p-1.5 shadow-xl"
            >
              <DropdownItem
                label="Todas las categorías"
                count={products.length}
                active={active === ALL}
                onClick={() => select(ALL)}
              />
              {categories.map((c) => (
                <DropdownItem
                  key={c._id}
                  label={c.name}
                  icon={c.icon}
                  count={c.productCount}
                  active={active === c.slug}
                  onClick={() => select(c.slug)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result count + active category pill */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>
          {filtered.length}{" "}
          {filtered.length === 1
            ? "producto encontrado"
            : "productos encontrados"}
        </span>
        {active !== ALL && activeCategory && (
          <button
            type="button"
            onClick={() => setActive(ALL)}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand transition-colors hover:bg-brand/15"
          >
            <CategoryIcon name={activeCategory.icon} className="size-3.5" />
            {activeCategory.name}
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-secondary/40 py-20 text-center">
          <PackageSearch className="size-10 text-muted-foreground" />
          <p className="mt-4 font-display text-lg font-bold text-ink">
            Sin resultados
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            No encontramos productos con esos criterios. Prueba otra búsqueda o
            escríbenos y te asesoramos.
          </p>
          <button
            type="button"
            onClick={() => {
              setActive(ALL);
              setQuery("");
            }}
            className="mt-5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-2"
          >
            Ver todo el catálogo
          </button>
        </div>
      )}
    </div>
  );
}

function DropdownItem({
  label,
  count,
  active,
  icon,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  icon?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
        active
          ? "bg-brand/10 font-semibold text-brand"
          : "text-ink hover:bg-secondary"
      )}
    >
      {icon ? (
        <CategoryIcon
          name={icon}
          className={cn(
            "size-4 shrink-0",
            active ? "text-brand" : "text-muted-foreground"
          )}
        />
      ) : (
        <span className="size-4 shrink-0" />
      )}
      <span className="flex-1 truncate">{label}</span>
      {typeof count === "number" && (
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[11px] font-bold",
            active ? "bg-brand/15 text-brand" : "bg-secondary text-muted-foreground"
          )}
        >
          {count}
        </span>
      )}
      {active && <Check className="size-4 shrink-0 text-brand" />}
    </button>
  );
}
