import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  name: string;
  path?: string;
}

/** Compact hero banner for inner pages, with breadcrumbs. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-25"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
        <div className="absolute inset-0 bg-grid-dark opacity-40" />
      </div>
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-brand to-gold" />

      <div className="container-x relative py-14 md:py-20">
        <nav aria-label="Ruta de navegación" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/55">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Inicio
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.name} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" />
                {c.path ? (
                  <Link href={c.path} className="transition-colors hover:text-white">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-white/80">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && <p className="eyebrow mb-3 text-gold">{eyebrow}</p>}
        <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
