# Documentación de Ingeniería — Tradesika

Trazabilidad de prompts y decisiones técnicas del desarrollo del sitio
corporativo **Tradesika** (distribuidor autorizado Sika Ecuador).

> **Nota de ubicación:** la guía del proyecto (`CLAUDE.md`) reserva `./docs`
> para la documentación oficial de Totalum y exige que toda documentación nueva
> viva en `./project-docs`. Por eso la estructura solicitada
> (`engineering/architecture.md`, `design.md`, …) se ubica aquí, en
> `project-docs/engineering/`, conservando exactamente el mismo árbol de archivos.

## Estructura

| Archivo | Área |
|---------|------|
| [`architecture.md`](./architecture.md) | Arquitectura, capas, dominio, patrones |
| [`design.md`](./design.md) | UI/UX, sistema de diseño, identidad visual |
| [`seo.md`](./seo.md) | SEO técnico, metadatos, datos estructurados |
| [`content.md`](./content.md) | Contenido, catálogo, datos del negocio |
| [`development.md`](./development.md) | Implementación, stack, integración Totalum |
| [`testing.md`](./testing.md) | Verificación, build, control de calidad |
| [`other-prompts.md`](./other-prompts.md) | Prompts varios y decisiones transversales |

## Formato de cada registro

Cada entrada documenta obligatoriamente: **Fecha · Objetivo · Prompt completo ·
Modelo de IA · Versión · Plataforma · Resultado esperado · Resultado obtenido ·
Decisiones tomadas · Observaciones técnicas.**

## Stack y plataforma

- **Modelo de IA:** Claude Opus 4.8 (contexto 1M) — `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Stack ejecutado:** Next.js 15 (App Router) · React 19 · TypeScript estricto ·
  Tailwind CSS v4 · TotalumSDK (base de datos)
