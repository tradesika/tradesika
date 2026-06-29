import Link from "next/link";
import { Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { ASSETS } from "@/assets/files";
import { SITE, buildWhatsAppLink } from "@/lib/site.config";
import { Reveal } from "@/components/common/Reveal";

export function HomeContactCTA() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink p-8 md:p-14">
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.concreteTexture.url}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover opacity-15"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-brand/30" />
            </div>

            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  Cotiza tu pedido o agenda una asesoría
                </h2>
                <p className="mt-4 max-w-lg text-base text-white/65">
                  Cuéntanos qué necesita tu obra. Te orientamos con el producto
                  Sika correcto y te damos precio al por menor o por mayor.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                  >
                    <MessageCircle className="size-4" /> WhatsApp
                  </a>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10"
                  >
                    Formulario de contacto
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <a
                  href={`tel:${SITE.phones[0].e164}`}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:bg-white/10"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <div className="text-xs text-white/55">Llámanos</div>
                    <div className="font-display text-base font-bold text-white">
                      {SITE.phones.map((p) => p.display).join(" · ")}
                    </div>
                  </div>
                </a>
                <Link
                  href="/ubicacion"
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:bg-white/10"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <div className="text-xs text-white/55">Visítanos</div>
                    <div className="font-display text-base font-bold text-white">
                      {SITE.address.city}, {SITE.address.country}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
