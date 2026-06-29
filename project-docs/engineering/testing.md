# Testing / Verificación — Prompts y Decisiones

Registros de prompts relacionados con la verificación, el build y el control de
calidad del proyecto.

---

## Registro TS-01 — Verificación de tipos y build de producción

- **Fecha:** 2026-06-18
- **Objetivo:** Garantizar 0 errores de tipos y build exitoso.
- **Prompt completo:** (regla de proyecto) "Después de cambios de código:
  ejecutar `npm run check-types-errors` y luego `npm run build`."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Compilación TypeScript estricta y build Next.js sin
  errores.
- **Resultado obtenido:** `next build` compila correctamente y genera todas las
  rutas (`/`, `/nosotros`, `/productos`, `/productos/[slug]`, `/descargas`,
  `/ubicacion`, `/contacto`, `sitemap.xml`).
- **Decisiones tomadas:** Tipado estricto en todo el dominio; los JSON de
  respuestas se castean explícitamente (`as { ok: boolean; data?: ... }`).
- **Observaciones técnicas:** Layout en `force-dynamic` (`revalidate = 0`) por
  requerimiento del entorno; el sitemap también es dinámico para reflejar el
  catálogo en vivo.

---

## Registro TS-02 — Validación de datos e imágenes

- **Fecha:** 2026-06-18
- **Objetivo:** Asegurar que las imágenes de producto existen y se muestran.
- **Prompt completo:** (regla de proyecto) "Cuando un registro tiene
  archivo/imagen, usar el campo `url`. Validar imágenes."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Imágenes visibles en tarjetas y fichas.
- **Resultado obtenido:** Los 16 productos tienen imagen WebP en Totalum; la UI
  usa `record.image.url` (nunca construye URLs manualmente).
- **Decisiones tomadas:** Estado vacío elegante en descargas/catálogo si no hay
  datos, evitando páginas en blanco.
- **Observaciones técnicas:** Pruebas de navegador con Playwright reservadas a
  solicitud explícita del usuario (modo normal).
