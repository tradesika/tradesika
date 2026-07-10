"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { NAV_LINKS, SITE, buildWhatsAppLink } from "@/lib/site.config";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden bg-ink text-white/80 md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5 text-gold" />
            {SITE.address.street}, {SITE.address.city}
          </span>
          <div className="flex items-center gap-5">
            {SITE.phones.map((p) => (
              <a
                key={p.e164}
                href={`tel:${p.e164}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Phone className="size-3.5 text-gold" />
                {p.display}
              </a>
            ))}
            <span className="text-white/40">·</span>
            <span>Distribuidor autorizado Sika</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-border bg-white/90 shadow-sm backdrop-blur-md"
            : "border-transparent bg-white"
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <Logo imgSize="h-36" />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-md px-3.5 py-2 text-sm font-semibold transition-colors",
                  isActive(link.href)
                    ? "text-brand"
                    : "text-ink/70 hover:text-ink"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-brand" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-dark hover:shadow-md md:inline-flex"
            >
              <MessageCircle className="size-4" />
              Cotizar ahora
            </a>

            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-md border border-border text-ink lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "overflow-hidden border-t border-border bg-white transition-[max-height] duration-300 ease-out lg:hidden",
            open ? "max-h-[28rem]" : "max-h-0 border-transparent"
          )}
        >
          <nav className="container-x flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-semibold transition-colors",
                  isActive(link.href)
                    ? "bg-secondary text-brand"
                    : "text-ink/80 hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 text-base font-bold text-white"
            >
              <MessageCircle className="size-5" />
              Cotizar por WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
