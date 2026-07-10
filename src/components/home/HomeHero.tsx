import Link from "next/link";
import { ArrowRight, ShieldCheck, MessageCircle, Truck } from "lucide-react";
import { ASSETS } from "@/assets/files";
import { buildWhatsAppLink } from "@/lib/site.config";

const STATS = [
  { value: "16+", label: "Productos Sika" },
  { value: "8", label: "Líneas de solución" },
  { value: "100%", label: "Producto original" },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Background image + overlays */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSETS.heroJobsite.url}
          alt="Obra de construcción en Ecuador"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
      </div>

      {/* Brand accent bar */}
      <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-brand via-brand to-gold" />

      <div className="container-x relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:py-32">
        <div className="reveal lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <ShieldCheck className="size-4 text-gold" />
            Distribuidor autorizado Sika · Guayaquil, Ecuador
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Soluciones <span className="text-gradient-brand">Sika</span> en
            Guayaquil para construir mejor
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Impermeabilizantes, selladores, morteros, aditivos y sistemas para
            pisos industriales. Atención al por menor y al por mayor con asesoría
            técnica especializada en Guayaquil.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-7 py-4 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-xl"
            >
              Ver catálogo de productos
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <MessageCircle className="size-4 text-gold" />
              Solicitar cotización
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-extrabold text-white">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-white/55">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating highlight card */}
        <div className="reveal hidden lg:col-span-5 lg:block" style={{ animationDelay: "150ms" }}>
          <div className="relative ml-auto max-w-sm">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.heroEngineer.url}
                alt="Asesoría técnica en obra"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 max-w-[15rem] rounded-xl border border-white/10 bg-white p-5 text-ink shadow-xl">
              <Truck className="size-7 text-brand" />
              <p className="mt-2 font-display text-base font-bold leading-snug">
                Despacho mayorista
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Abastecemos ferreterías, constructoras y maestros en todo el país.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
