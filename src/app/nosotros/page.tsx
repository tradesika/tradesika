import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Users,
  Truck,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/seo";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ASSETS } from "@/assets/files";
import { buildWhatsAppLink } from "@/lib/site.config";

export const metadata: Metadata = buildMetadata({
  title: "Nosotros",
  path: "/nosotros",
  description:
    "Conoce a Tradesika, distribuidor autorizado de Sika en Ecuador. Materiales de construcción con asesoría técnica especializada, atención al por menor y al por mayor en Guayaquil.",
  keywords: ["Tradesika", "distribuidor Sika Ecuador", "quiénes somos"],
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Calidad garantizada",
    text: "Solo producto Sika original, con el respaldo de un líder mundial en química para la construcción.",
  },
  {
    icon: HeartHandshake,
    title: "Compromiso con el cliente",
    text: "Acompañamos cada proyecto con atención cercana, honesta y orientada a resolver.",
  },
  {
    icon: Users,
    title: "Conocimiento técnico",
    text: "Un equipo que entiende la obra y traduce las fichas técnicas en soluciones reales.",
  },
  {
    icon: Truck,
    title: "Disponibilidad",
    text: "Stock permanente y logística para atender desde una unidad hasta grandes volúmenes.",
  },
];

const STATS = [
  { value: "8", label: "Líneas de solución Sika" },
  { value: "16+", label: "Productos en catálogo" },
  { value: "100%", label: "Producto original" },
  { value: "Menor + Mayor", label: "Modalidad de venta" },
];

export default function NosotrosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Nosotros", path: "/nosotros" }])} />

      <PageHero
        eyebrow="Quiénes somos"
        title="Acercamos la calidad Sika a cada obra del Ecuador"
        description="Somos un distribuidor autorizado enfocado en producto original, asesoría técnica y atención cercana para constructores, ferreterías y maestros."
        crumbs={[{ name: "Nosotros" }]}
        image={ASSETS.siteOverview.url}
      />

      {/* Story */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3 text-brand">Nuestra historia</p>
            <h2 className="title-rule font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
              Más que vender materiales, resolvemos problemas de obra
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Tradesika nace para acercar el portafolio de Sika a quienes
                construyen el Ecuador. Sabemos que detrás de cada compra hay un
                reto técnico: una losa que filtra, una junta que se mueve, un
                piso que debe resistir años de tránsito.
              </p>
              <p>
                Por eso combinamos producto original, stock confiable y una
                asesoría honesta que recomienda lo que tu proyecto realmente
                necesita. Atendemos al por menor y al por mayor, con la misma
                dedicación a un maestro independiente que a una constructora.
              </p>
            </div>
            <Link
              href="/productos"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-ink-2"
            >
              Explorar productos <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.warehouse.url}
                  alt="Almacén Tradesika"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.heroEngineer.url}
                  alt="Asesoría técnica en obra"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-ink py-14 text-white">
        <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-extrabold text-gold md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-white p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Target className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                Misión
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Proveer soluciones Sika originales con asesoría técnica
                confiable, ayudando a nuestros clientes a construir con calidad,
                durabilidad y eficiencia en cada proyecto.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-border bg-white p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Eye className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                Visión
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Ser el distribuidor Sika de referencia en la región, reconocido
                por la calidad de su servicio, su conocimiento técnico y su
                compromiso con el éxito de cada obra.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Nuestros valores"
            title="Lo que nos guía"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal as="article" key={v.title} delay={i * 70}>
                <div className="h-full rounded-xl border border-border bg-card p-7">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-ink text-gold">
                    <v.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/40 py-16">
        <div className="container-x flex flex-col items-center justify-between gap-6 rounded-2xl bg-ink p-10 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              ¿Listo para tu próximo proyecto?
            </h2>
            <p className="mt-2 text-white/65">
              Conversemos. Te asesoramos sin compromiso.
            </p>
          </div>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            <MessageCircle className="size-5" /> Hablar con un asesor
          </a>
        </div>
      </section>
    </>
  );
}
