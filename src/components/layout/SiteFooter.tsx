import Link from "next/link";
import { Phone, MapPin, Clock, MessageCircle, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import {
  SITE,
  NAV_LINKS,
  buildWhatsAppLink,
  getMapsDirectionsUrl,
} from "@/lib/site.config";

const SOLUTION_LINKS = [
  { label: "Impermeabilización", href: "/productos/categoria/impermeabilizacion" },
  { label: "Sellado y pegado", href: "/productos/categoria/sellado-y-pegado" },
  { label: "Reparación estructural", href: "/productos/categoria/reparacion-estructural" },
  { label: "Pisos industriales", href: "/productos/categoria/pisos-industriales" },
  { label: "Aditivos para concreto", href: "/productos/categoria/construccion" },
];

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="bg-ink text-white/70">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              ¿Tu próxima obra necesita Sika?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/60">
              Asesoría técnica gratuita, atención al por menor y al por mayor. Te
              ayudamos a elegir la solución correcta para tu proyecto.
            </p>
          </div>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            <MessageCircle className="size-5" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-x grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Distribuidor autorizado de productos Sika en Ecuador. Soluciones
            profesionales para construcción, impermeabilización y reparación,
            con respaldo técnico en Guayaquil.
          </p>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold/80"
          >
            <MessageCircle className="size-4" /> Cotiza tu pedido
          </a>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Soluciones
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SOLUTION_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Contacto
          </h3>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <a
                href={getMapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {SITE.address.street}, {SITE.address.city} — {SITE.address.country}
              </a>
            </li>
            {SITE.phones.map((p) => (
              <li key={p.e164} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a
                  href={`tel:${p.e164}`}
                  className="transition-colors hover:text-white"
                >
                  {p.display}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>
                {SITE.hours[0].days}: {SITE.hours[0].time}
                <br />
                {SITE.hours[1].days}: {SITE.hours[1].time}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 md:flex-row">
          <p>
            © {year} {SITE.name}. Todos los derechos reservados. Sika® es una
            marca registrada de Sika AG.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacidad
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Términos
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center gap-1 hover:text-white"
            >
              Catálogo <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
