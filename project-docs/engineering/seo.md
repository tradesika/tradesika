# SEO — Prompts y Decisiones

Registros de prompts relacionados con SEO técnico, metadatos, datos
estructurados y rendimiento orientado a buscadores.

---

## Registro SEO-01 — SEO técnico avanzado (Ecuador / Guayaquil)

- **Fecha:** 2026-06-18
- **Objetivo:** Posicionamiento orgánico en Ecuador con foco en Guayaquil.
- **Prompt completo:**
  > "SEO técnico avanzado. Estrategia enfocada en Ecuador y Guayaquil. URLs
  > limpias y semánticas. Meta tags optimizados. Open Graph y Twitter Cards.
  > Sitemap XML automático. Robots.txt configurado. Datos estructurados
  > (Schema.org). Optimización de encabezados (H1-H6). Optimización semántica
  > del contenido. Optimización de imágenes para buscadores. Estrategia enfocada
  > en Core Web Vitals."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Cobertura SEO completa lista para indexación.
- **Resultado obtenido:**
  - Fábrica de metadatos `buildMetadata()` (`src/lib/seo/seo.ts`): título
    templado, descripción, keywords geolocalizadas, canónica, Open Graph y
    Twitter Cards por página.
  - **Datos estructurados** JSON-LD: `Organization`, `LocalBusiness`
    (HardwareStore con geo, horarios y área Ecuador), `BreadcrumbList`,
    `Product` e `ItemList`.
  - **Sitemap XML automático** (`src/app/sitemap.ts`): páginas fijas + productos
    y categorías leídos en vivo desde Totalum.
  - **robots.txt** con `Allow` por bot y referencia `Sitemap:`.
  - URLs semánticas: `/productos/[slug]`, `/productos?categoria=<slug>`.
- **Decisiones tomadas:**
  - Keywords base geolocalizadas ("Sika Ecuador", "Sika Guayaquil",
    "impermeabilizante Guayaquil") inyectadas en todas las páginas.
  - `lang="es-EC"` y `locale: "es_EC"` para señal regional.
  - Sin precios públicos: el `Offer` del Product schema marca disponibilidad
    `InStock` con venta consultiva (sin precio real expuesto).
- **Observaciones técnicas:** El sitemap es `force-dynamic` para reflejar nuevos
  productos sin redeploy; tolera fallos de BD devolviendo al menos las rutas
  estáticas.

---

## Registro SEO-02 — Jerarquía de encabezados y semántica

- **Fecha:** 2026-06-18
- **Objetivo:** Estructura H1-H6 correcta y HTML semántico.
- **Prompt completo:** (derivado de) "Optimización de encabezados (H1-H6).
  Optimización semántica del contenido."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Un H1 por página y jerarquía descendente.
- **Resultado obtenido:** Cada página tiene un único H1 vía `PageHero`/Hero;
  secciones usan H2/H3; uso de `<section>`, `<nav>`, `<main>`, `<header>`,
  `<footer>`.
- **Decisiones tomadas:** Imágenes con `alt` descriptivo y `loading="lazy"` en
  contenido por debajo del pliegue.
- **Observaciones técnicas:** Los `<iframe>` de mapa usan `loading="lazy"` para
  no penalizar LCP.
