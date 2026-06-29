import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Tradesika logo (TRADE · Sika — Distribuidor Especializado).
 * El asset vive en /public/logo.png. En la variante "light" (footer oscuro)
 * se coloca sobre un fondo blanco redondeado para mantener legibilidad.
 */
export function Logo({
  className,
  imgSize = "h-28",
  variant = "dark",
}: {
  className?: string;
  /** Tailwind height class for the logo image (overridable per placement) */
  imgSize?: string;
  variant?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label="Tradesika — Inicio"
      className={cn("inline-flex items-center", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Tradesika — Distribuidor especializado Sika"
        className={cn(
          imgSize,
          "w-auto object-contain",
          variant === "light" && "rounded-md bg-white p-1.5"
        )}
        loading="eager"
      />
    </Link>
  );
}
