import {
  Droplets,
  Combine,
  Wrench,
  Building2,
  LayoutGrid,
  House,
  BrickWall,
  Boxes,
  Package,
  type LucideIcon,
} from "lucide-react";

/** Maps the icon name stored in the DB to a concrete lucide icon. */
const ICONS: Record<string, LucideIcon> = {
  Droplets,
  Combine,
  Wrench,
  Building2,
  LayoutGrid,
  House,
  BrickWall,
  Boxes,
};

export function CategoryIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const Icon = (name && ICONS[name]) || Package;
  return <Icon className={className} aria-hidden="true" />;
}
