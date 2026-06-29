import type { Metadata } from "next";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  FileText,
  Wrench,
  PackageCheck,
  Truck,
  ArrowRight,
} from "lucide-react";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/seo";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import {
  SITE,
  buildWhatsAppLink,
  getMapsEmbedUrl,
  getMapsDirectionsUrl,
} from "@/lib/site.config";
import { ASSETS } from "@/assets/files";

const HELP_TOPICS = [
  {
    icon: FileText,
    title: "Cotizaciones",
    text: "Precios al por menor y al por mayor para tu obra.",
  },
  {
    icon: Wrench,
    title: "Asesoría técnica",
    text: "Te ayudamos a elegir el producto Sika correcto.",
  },
  {
    icon: PackageCheck,
    title: "Disponibilidad de stock",
    text: "Consulta presentaciones y existencias al instante.",
  },
  {
    icon: Truck,
    title: "Pedidos y despacho",
    text: "Coordinamos entrega para tu proyecto en Ecuador.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  path: "/contacto",
  description:
    "Contáctanos para cotizaciones, asesoría técnica y pedidos de productos Sika en Ecuador. Atención al por menor y al por mayor en Guayaquil. WhatsApp y teléfono.",
  keywords: ["contacto Tradesika", "cotización Sika Ecuador", "Sika Guayaquil teléfono"],
});

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contacto", path: "/contacto" }])} />

      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu proyecto"
        description="Cotizaciones, asesoría técnica o pedidos al por mayor. Escríbenos y te respondemos lo antes posible."
        crumbs={[{ name: "Contacto" }]}
        image={ASSETS.heroJobsite.url}
      />

      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          {/* Info column */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-ink">
              Información de contacto
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Estamos para ayudarte a elegir el producto correcto y darte el
              mejor precio para tu obra.
            </p>

            <div className="mt-7 space-y-4">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-colors hover:border-brand"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle className="size-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">WhatsApp</div>
                  <div className="font-semibold text-ink">
                    Chatea con un asesor
                  </div>
                </div>
              </a>

              {SITE.phones.map((p) => (
                <a
                  key={p.e164}
                  href={`tel:${p.e164}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-colors hover:border-brand"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <div className="text-xs text-muted-foreground">Teléfono</div>
                    <div className="font-semibold text-ink">{p.display}</div>
                  </div>
                </a>
              ))}

              <a
                href={getMapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-colors hover:border-brand"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Dirección</div>
                  <div className="font-semibold text-ink">
                    {SITE.address.street}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {SITE.address.city}, {SITE.address.country}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-4">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Clock className="size-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Horario</div>
                  <div className="text-sm font-semibold text-ink">
                    {SITE.hours[0].days}: {SITE.hours[0].time}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {SITE.hours[1].days}: {SITE.hours[1].time}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Direct-contact CTA column */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-display text-2xl font-bold text-ink">
                ¿En qué podemos ayudarte?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Escríbenos por WhatsApp o llámanos y un asesor te atiende de
                forma personalizada en horario laboral. Sin formularios: hablas
                directamente con nuestro equipo.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {HELP_TOPICS.map((t) => (
                  <div
                    key={t.title}
                    className="flex gap-3 rounded-xl border border-border bg-secondary/30 p-4"
                  >
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <t.icon className="size-5" />
                    </span>
                    <div>
                      <div className="font-semibold text-ink">{t.title}</div>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {t.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1ebe5d]"
                >
                  <MessageCircle className="size-4" />
                  Escribir por WhatsApp
                </a>
                <a
                  href={`tel:${SITE.phones[0].e164}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-ink-2"
                >
                  <Phone className="size-4" />
                  Llamar ahora
                </a>
              </div>

              <a
                href="/productos"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
              >
                Ver catálogo de productos
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="container-x mt-12">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title={`Ubicación de ${SITE.name}`}
              src={getMapsEmbedUrl()}
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
