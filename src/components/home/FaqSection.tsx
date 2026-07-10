import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { JsonLd } from "@/components/common/JsonLd";
import { faqPageJsonLd, type FaqItem } from "@/lib/seo/seo";
import { SITE } from "@/lib/site.config";

/**
 * Respuestas construidas con los datos reales del negocio (site.config) y las
 * categorías del catálogo. Las preguntas replican las búsquedas reales en
 * Ecuador ("dónde comprar Sika en Guayaquil", "distribuidores especializados
 * Sika") para posicionar en resultados de tipo pregunta.
 */
function buildFaqs(categoryNames: string[]): FaqItem[] {
  const phone = SITE.phones[0].display;
  const weekdays = SITE.hours[0];
  return [
    {
      question: "¿Dónde puedo comprar productos Sika en Guayaquil?",
      answer: `En Tradesika, distribuidor autorizado Sika. Visítanos en ${SITE.address.street}, ${SITE.address.city}, o escríbenos por WhatsApp al ${phone} y coordinamos tu pedido. Atendemos de ${weekdays.days.toLowerCase()}, de ${weekdays.time}.`,
    },
    {
      question: "¿Tradesika es un distribuidor especializado de Sika?",
      answer:
        "Sí. Somos distribuidor autorizado y especializado de Sika en Ecuador: comercializamos exclusivamente producto original y te asesoramos para elegir el sistema correcto, calcular rendimientos y aplicarlo bien en obra.",
    },
    {
      question: "¿Venden productos Sika al por menor y al por mayor?",
      answer:
        "Sí, atendemos ambos. Desde una unidad para maestros y hogares hasta volúmenes al por mayor para ferreterías, distribuidores y constructoras con proyectos en marcha.",
    },
    {
      question: "¿Qué productos Sika ofrecen en Guayaquil?",
      answer: `Manejamos el portafolio Sika en ${categoryNames.length} líneas: ${categoryNames.join(", ")}. Explora el catálogo completo en nuestra sección de productos.`,
    },
    {
      question: "¿Cómo cotizo productos Sika y consulto precios en Ecuador?",
      answer: `Escríbenos por WhatsApp o llámanos al ${phone}. Te confirmamos disponibilidad, precios al por menor o por volumen y la mejor opción técnica para tu obra.`,
    },
    {
      question: "¿Atienden fuera de Guayaquil?",
      answer: `Sí. Atendemos ${SITE.serviceAreas.join(", ")} y proyectos en todo el Ecuador. Contáctanos y coordinamos la entrega o el retiro de tu pedido.`,
    },
  ];
}

export function FaqSection({ categoryNames }: { categoryNames: string[] }) {
  const faqs = buildFaqs(categoryNames);
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <JsonLd data={faqPageJsonLd(faqs)} />
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Preguntas frecuentes"
          title="Comprar Sika en Guayaquil, sin vueltas"
          description="Lo que más nos consultan sobre dónde comprar, cotizaciones y cobertura de entrega."
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 60}>
              <details className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown className="size-5 shrink-0 text-brand transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
