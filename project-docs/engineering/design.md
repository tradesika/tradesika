# Diseño (UI/UX) — Prompts y Decisiones

Registros de prompts relacionados con el sistema de diseño, identidad visual,
experiencia de usuario y componentes.

---

## Registro DS-01 — Identidad visual y sistema de diseño

- **Fecha:** 2026-06-18
- **Objetivo:** Definir una identidad moderna, minimalista y corporativa,
  alineada con Sika y el entorno industrial.
- **Prompt completo:**
  > "Diseño moderno, minimalista y corporativo. Totalmente responsive
  > (mobile-first). UX/UI optimizada para navegación rápida. Enfoque en claridad
  > y conversión. Identidad visual alineada con Sika y entorno industrial.
  > Animaciones sutiles y optimizadas. Carga rápida en todos los dispositivos."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Lenguaje visual coherente con tokens reutilizables.
- **Resultado obtenido:** Sistema de tokens en `globals.css`:
  - **Paleta:** rojo Sika (`--brand`), tinta/`ink` para texto y bandas oscuras,
    dorado (`--gold`) como acento industrial, gris suave de superficie.
  - **Tipografía:** `Archivo` (display) + `Manrope` (cuerpo) — distintivas, no
    genéricas.
  - **Utilidades:** `container-x`, `card-lift`, reveals sutiles (`Reveal`).
- **Decisiones tomadas:**
  - Mobile-first con navegación tipo drawer en `< lg` y barra utilitaria
    (teléfonos + dirección) en escritorio.
  - CTA persistente "Cotizar por WhatsApp" + botón flotante (`WhatsAppFloat`)
    para maximizar conversión sin e-commerce.
- **Observaciones técnicas:** Animaciones basadas en `IntersectionObserver`
  (`Reveal`) con `transition` CSS, respetando rendimiento; sin librerías de
  animación adicionales.

---

## Registro DS-02 — Componentes reutilizables de presentación

- **Fecha:** 2026-06-18
- **Objetivo:** Evitar duplicación de UI (DRY) entre páginas.
- **Prompt completo:** (derivado de) "Componentes reutilizables. Modularidad por
  dominio."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Bloques compartidos para encabezados de página,
  tarjetas de producto y secciones del home.
- **Resultado obtenido:** `common/` (PageHero, SectionHeading, Reveal, JsonLd,
  CategoryIcon), `layout/` (SiteHeader, SiteFooter, WhatsAppFloat, Logo),
  `home/` (8 secciones), `catalog/` (CatalogBrowser, ProductCard),
  `contact/ContactForm`.
- **Decisiones tomadas:** `CategoryIcon` mapea el nombre de icono lucide
  almacenado en la BD a su componente, manteniendo el contenido data-driven.
- **Observaciones técnicas:** El catálogo (`CatalogBrowser`) es el único bloque
  cliente del catálogo (filtro/búsqueda); el resto es Server Component.
