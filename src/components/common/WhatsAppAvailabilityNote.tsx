import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/site.config";
import { cn } from "@/lib/utils";

interface Props {
  /** Optional prefilled WhatsApp message (e.g. about a specific product). */
  waMessage?: string;
  className?: string;
}

/**
 * Reassurance callout: every product shown on the site is part of our stock.
 * Invites the visitor to confirm availability and price by WhatsApp.
 */
export function WhatsAppAvailabilityNote({ waMessage, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 p-5 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#1aa64b]">
          <MessageCircle className="size-5" />
        </span>
        <p className="text-sm text-ink">
          <span className="font-bold">
            ¿No encuentras el producto que buscas en la web?
          </span>{" "}
          Escríbenos por WhatsApp: nuestro catálogo es más amplio de lo que ves
          aquí y seguramente lo tenemos. Te confirmamos disponibilidad y precio
          al instante.
        </p>
      </div>
      <a
        href={buildWhatsAppLink(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-[filter] hover:brightness-95"
      >
        <MessageCircle className="size-4" /> Consultar por WhatsApp
      </a>
    </div>
  );
}
