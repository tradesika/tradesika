"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/site.config";

/** Floating WhatsApp action that appears after a short scroll. */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-4 font-bold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle className="size-6" />
      <span className="hidden text-sm sm:inline">WhatsApp</span>
    </a>
  );
}
