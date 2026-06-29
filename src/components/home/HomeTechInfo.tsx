import Link from "next/link";
import {
  FileText,
  BookOpen,
  ShieldAlert,
  Wrench,
  Download,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const RESOURCES = [
  {
    icon: FileText,
    title: "Fichas técnicas",
    text: "Datos de rendimiento, dosificación y aplicación de cada producto.",
  },
  {
    icon: Wrench,
    title: "Modo de uso",
    text: "Recomendaciones de preparación, mezcla y puesta en obra.",
  },
  {
    icon: ShieldAlert,
    title: "Hojas de seguridad",
    text: "Manejo seguro, almacenamiento y primeros auxilios.",
  },
  {
    icon: BookOpen,
    title: "Manual del Constructor",
    text: "Guía técnica integral Sika para profesionales de la construcción.",
  },
];

export function HomeTechInfo() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
      <div className="absolute inset-0 bg-grid-dark opacity-50" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-3 text-gold">Información técnica</p>
          <h2 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
            Documentación que respalda cada aplicación
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            Accede a fichas técnicas, modos de uso, hojas de seguridad y al
            Manual del Constructor Sika. Toda la información para aplicar
            correctamente y obtener el mejor resultado en obra.
          </p>
          <Link
            href="/descargas"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            <Download className="size-4" />
            Ir a descargas
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {RESOURCES.map((r, i) => (
            <Reveal as="article" key={r.title} delay={i * 70}>
              <Link
                href="/descargas"
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-gold/40 hover:bg-white/10"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <r.icon className="size-5" />
                </span>
                <h3 className="mt-4 inline-flex items-center gap-1.5 font-display text-base font-bold text-white">
                  {r.title}
                  <ArrowRight className="size-4 text-gold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {r.text}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
