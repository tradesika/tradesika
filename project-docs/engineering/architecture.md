# Arquitectura — Prompts y Decisiones

Registros de prompts relacionados con la arquitectura, separación de capas,
modelado de dominio y patrones de diseño del proyecto Tradesika.

---

## Registro AR-01 — Arquitectura base del sitio corporativo

- **Fecha:** 2026-06-18
- **Objetivo:** Definir una arquitectura limpia, modular por dominio y escalable
  para un sitio corporativo de catálogo (sin e-commerce).
- **Prompt completo:**
  > "El proyecto deberá seguir estrictamente: SOLID, Clean Architecture, Clean
  > Code, DRY, KISS, Separation of Concerns, Principio de inversión de
  > dependencias, Componentes reutilizables, Modularidad por dominio, Tipado
  > estricto en TypeScript, Escalabilidad y mantenibilidad a largo plazo."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Estructura por capas con dominio aislado del acceso a
  datos y de la presentación.
- **Resultado obtenido:** Se implementó una separación en tres capas:
  - `src/domain/catalog/` — modelos puros y type guards (sin dependencias de I/O).
  - `src/lib/catalog/` — repositorio de acceso a datos (`catalog.repository.ts`)
    y formateadores puros (`format.ts`).
  - `src/app/` + `src/components/` — capa de presentación (Server Components por
    defecto; `"use client"` solo donde hay interacción).
- **Decisiones tomadas:**
  - El repositorio es la **única** frontera con TotalumSDK (`server-only`),
    cumpliendo inversión de dependencias: la UI depende de tipos de dominio, no
    del SDK.
  - Configuración de negocio centralizada en `src/lib/site.config.ts`
    (importable en cliente y servidor, sin secretos).
  - Mantener el stack obligatorio del entorno (Next.js + React + TotalumSDK) en
    lugar de Vite/CSS puro solicitado; ver `other-prompts.md` (registro OP-01).
- **Observaciones técnicas:** El stack solicitado por el cliente (Vite + CSS
  puro) se sustituyó por Next.js + Tailwind por restricción de la plataforma
  Totalum; la filosofía de arquitectura limpia se respetó íntegramente.

---

## Registro AR-02 — Modelo de datos y relaciones

- **Fecha:** 2026-06-18
- **Objetivo:** Modelar el catálogo en Totalum con relaciones explícitas.
- **Prompt completo:**
  > "Cuando crees/edites estructura de base de datos, añade todas las relaciones
  > necesarias entre tablas usando campos objectReference."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Tablas normalizadas con relación producto↔categoría.
- **Resultado obtenido:** Cuatro tablas:
  - `product_category` (1) ←→ (N) `product` vía `objectReference`
    (`oneToMany` / `manyToOne`).
  - `document` — repositorio de descargas (catálogos, manuales, fichas).
  - `contact_message` — bandeja del formulario de contacto.
- **Decisiones tomadas:** Listas (aplicaciones, beneficios) se guardan como
  `long-string` separado por saltos de línea y se parsean en `format.ts`,
  evitando sobre-normalización (KISS) para contenido editorial.
- **Observaciones técnicas:** Las lecturas usan `query()` con expansión anidada
  (`category: true`, `_count`) para evitar el problema N+1.
