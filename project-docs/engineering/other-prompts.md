# Otros Prompts — Decisiones Transversales

Registros de prompts que no encajan en una sola área o que afectan a varias.

---

## Registro OP-01 — Stack tecnológico (decisión transversal)

- **Fecha:** 2026-06-18
- **Objetivo:** Resolver el conflicto entre el stack solicitado y el del entorno.
- **Prompt completo:**
  > "Stack tecnológico: React. TypeScript. Vite. CSS puro. Sin frameworks CSS."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Proyecto en el stack indicado por el cliente.
- **Resultado obtenido:** Se construyó con **Next.js 15 + React 19 + TypeScript +
  Tailwind CSS v4 + TotalumSDK**, manteniendo React y TypeScript del pedido.
- **Decisiones tomadas:** La plataforma Totalum solo permite crear proyectos con
  Next.js (frontend + backend) y Totalum como base de datos; Vite y CSS puro no
  son soportados. Se priorizó un entregable desplegable y mantenible cumpliendo
  los principios de arquitectura/SEO/rendimiento solicitados.
- **Observaciones técnicas:** Se conservó el espíritu del pedido: tipado estricto,
  componentes reutilizables, modularidad por dominio y alto rendimiento.

---

## Registro OP-02 — Página de entrada y navegación

- **Fecha:** 2026-06-18
- **Objetivo:** Garantizar un punto de entrada nunca vacío.
- **Prompt completo:** (regla de plataforma) "Siempre debe haber una pantalla de
  entrada en `src/app/page.tsx`; nunca debe estar en blanco y debe enlazar
  correctamente a las demás secciones."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Home rica que enlaza a todas las secciones.
- **Resultado obtenido:** `page.tsx` renderiza Hero, franja de marca, soluciones
  por categoría, más vendidos, "por qué Tradesika", teaser de Nosotros, info
  técnica y CTA de contacto, con navegación global (header/footer) a todas las
  rutas.
- **Decisiones tomadas:** Se añadió la página `/ubicacion` (faltaba pese a estar
  en la navegación) y se incorporó al sitemap y a `publicRoutes`.
- **Observaciones técnicas:** El footer y el header comparten `NAV_LINKS` desde
  `site.config.ts` (DRY).

---

## Registro OP-03 — Documentación de prompts (este repositorio)

- **Fecha:** 2026-06-18
- **Objetivo:** Trazabilidad de prompts y decisiones técnicas.
- **Prompt completo:**
  > "Todo prompt utilizado durante el desarrollo deberá documentarse… crear la
  > estructura /docs/engineering con architecture.md, design.md, seo.md,
  > content.md, development.md, testing.md, other-prompts.md."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Estructura de documentación de ingeniería completa.
- **Resultado obtenido:** Árbol creado bajo `project-docs/engineering/` con los
  siete archivos solicitados más este índice.
- **Decisiones tomadas:** Ubicación en `project-docs/` (no `docs/`) por la regla
  del proyecto que reserva `docs/` a la documentación oficial de Totalum,
  conservando el mismo árbol de archivos solicitado.
- **Observaciones técnicas:** Cada registro mantiene el formato obligatorio
  (Fecha, Objetivo, Prompt, Modelo, Versión, Plataforma, Resultado esperado,
  Resultado obtenido, Decisiones, Observaciones).
