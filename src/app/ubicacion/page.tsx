import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Navigation,
  Truck,
} from "lucide-react";
import { buildMetadata, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo/seo";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import {
  SITE,
  buildWhatsAppLink,
  getMapsEmbedUrl,
  getMapsDirectionsUrl,
} from "@/lib/site.config";
import { ASSETS } from "@/assets/files";

export const metadata: Metadata = buildMetadata({
  title: "Ubicación y horarios",
  path: "/ubicacion",
  description:
    "Visítanos en Acuarela del Río, Guayaquil. Encuentra cómo llegar a Tradesika, distribuidor autorizado Sika en Ecuador: dirección, mapa, horarios de atención y teléfonos.",
  keywords: [
    "ubicación Tradesika",
    "Sika Guayaquil dirección",
    "distribuidor Sika Acuarela del Río",
  ],
});

const HIGHLIGHTS = [
  {
    icon: MapPin,
    title: "Dirección",
    lines: [SITE.address.street, `${SITE.address.city}, ${SITE.address.country}`],
  },
  {
    icon: Clock,
    title: "Horario de atención",
    lines: SITE.hours.map((h) => `${h.days}: ${h.time}`),
  },
  {
    icon: Truck,
    title: "Cobertura",
    lines: ["Despachos al por menor y por mayor", "Envíos a nivel nacional"],
  },
];

export default function UbicacionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Ubicación", path: "/ubicacion" }])}
      />
      <JsonLd data={localBusinessJsonLd()} />

      <PageHero
        eyebrow="Ubicación"
        title="Encuéntranos en Guayaquil"
        description="Estamos ubicados en Acuarela del Río, Guayaquil. Acércate a nuestro punto de atención o coordina tu pedido y despacho a nivel nacional."
        crumbs={[{ name: "Ubicación" }]}
        image={ASSETS.warehouse.url}
      />

      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="container-x">
          {/* Highlights */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="card-lift flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <item.icon className="size-6" />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-bold text-ink">
                    {item.title}
                  </h2>
                  <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
                    {item.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Map + actions */}
          <div className="mt-10 grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
                <iframe
                  title={`Ubicación de ${SITE.name} en ${SITE.address.city}`}
                  src={getMapsEmbedUrl()}
                  width="100%"
                  height="460"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-ink">
                  ¿Cómo llegar?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Te esperamos en {SITE.address.street}, {SITE.address.city}.
                  Abre la ruta en Google Maps o escríbenos por WhatsApp y un
                  asesor te guía paso a paso.
                </p>

                <a
                  href={getMapsDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-brand px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  <Navigation className="size-4" /> Cómo llegar
                </a>
                <a
                  href={buildWhatsAppLink(
                    "Hola Tradesika, quisiera indicaciones para llegar a su local."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-3.5 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  <MessageCircle className="size-4" /> Escribir por WhatsApp
                </a>

                <div className="mt-6 space-y-2 border-t border-border pt-5">
                  {SITE.phones.map((p) => (
                    <a
                      key={p.e164}
                      href={`tel:${p.e164}`}
                      className="flex items-center gap-3 text-sm font-semibold text-ink transition-colors hover:text-brand"
                    >
                      <Phone className="size-4 text-brand" />
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
