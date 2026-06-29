import { cn } from "@/lib/utils";

/** Consistent section header with eyebrow, title and accent rule. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-3", light ? "text-gold" : "text-brand")}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "title-rule font-display text-3xl font-extrabold leading-tight md:text-4xl",
          align === "center" && "is-center",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            light ? "text-white/65" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
