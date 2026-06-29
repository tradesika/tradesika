import { Award, Truck, Headphones, Boxes, MapPin, BadgeCheck } from "lucide-react";

const ITEMS = [
  { icon: BadgeCheck, label: "Producto Sika 100% original" },
  { icon: Headphones, label: "Asesoría técnica especializada" },
  { icon: Truck, label: "Despacho al por mayor y por menor" },
  { icon: Boxes, label: "Amplio stock disponible" },
  { icon: Award, label: "Distribuidor autorizado" },
  { icon: MapPin, label: "Atención en Guayaquil y Ecuador" },
];

export function BrandStrip() {
  // Duplicate the list for a seamless marquee loop.
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section className="border-y border-border bg-secondary/60 py-4">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track">
          {loop.map((item, i) => (
            <span
              key={i}
              className="mx-6 inline-flex items-center gap-2.5 text-sm font-semibold text-ink/70"
            >
              <item.icon className="size-4 text-brand" />
              {item.label}
              <span className="ml-6 text-border">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
