import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ASSETS } from "@/assets/files";
import { Reveal } from "@/components/common/Reveal";

const POINTS = [
  "Distribuidor autorizado de Sika en Ecuador",
  "Atención personalizada al por menor y al por mayor",
  "Stock permanente de las líneas de mayor demanda",
  "Equipo con experiencia en el sector construcción",
];

export function AboutTeaser() {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow mb-3 text-brand">Quiénes somos</p>
          <h2 className="title-rule font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
            Materiales de construcción con respaldo técnico de verdad
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            En Tradesika acercamos la calidad Sika a constructores, ferreterías
            y maestros de todo el Ecuador. Más que un punto de venta, somos un
            aliado que entiende la obra y recomienda la solución correcta para
            cada desafío.
          </p>

          <ul className="mt-7 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-ink">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                {p}
              </li>
            ))}
          </ul>

          <Link
            href="/nosotros"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-ink-2"
          >
            Conoce más sobre nosotros
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={120}>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.warehouse.url}
                alt="Centro de distribución Tradesika"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -right-4 -top-4 hidden rounded-xl bg-brand px-6 py-5 text-white shadow-lg sm:block">
              <div className="font-display text-3xl font-extrabold">Sika®</div>
              <div className="text-xs text-white/80">Calidad mundial</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
