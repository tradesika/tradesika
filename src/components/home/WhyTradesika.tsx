import { BadgeCheck, Headphones, Truck, Layers } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

const REASONS = [
  {
    icon: BadgeCheck,
    title: "Producto original y garantizado",
    text: "Comercializamos exclusivamente productos Sika auténticos, con la calidad y el respaldo de una marca líder mundial en construcción.",
  },
  {
    icon: Headphones,
    title: "Asesoría técnica real",
    text: "No solo vendemos: te ayudamos a elegir el sistema correcto, calcular rendimientos y resolver problemas en obra.",
  },
  {
    icon: Truck,
    title: "Por menor y mayoreo",
    text: "Desde una unidad hasta volúmenes para proyectos. Atendemos a maestros, ferreterías y constructoras por igual.",
  },
  {
    icon: Layers,
    title: "Portafolio completo",
    text: "Impermeabilización, sellado, reparación, pisos, morteros y aditivos. Todo lo que tu obra necesita, en un solo lugar.",
  },
];

export function WhyTradesika() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Por qué Tradesika"
          title="Tu aliado técnico en cada proyecto"
          description="Combinamos producto original, stock y conocimiento para que avances con confianza."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal as="article" key={r.title} delay={i * 70}>
              <div className="h-full rounded-xl border border-border bg-card p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-ink text-gold">
                  <r.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {r.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
