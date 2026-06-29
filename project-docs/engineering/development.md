# Desarrollo — Prompts y Decisiones

Registros de prompts relacionados con la implementación, el stack tecnológico y
la integración con Totalum.

---

## Registro DV-01 — Implementación del sitio y rutas

- **Fecha:** 2026-06-18
- **Objetivo:** Construir todas las secciones requeridas con rendimiento alto.
- **Prompt completo:**
  > "Secciones principales: Inicio, Nosotros, Productos, Contacto, Ubicación,
  > Footer. Alto rendimiento general. Lazy loading de imágenes. Code splitting.
  > Optimización de bundles. Imágenes optimizadas (WebP)."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Rutas funcionales y optimizadas.
- **Resultado obtenido:** Rutas App Router:
  - `/` (home con 8 secciones), `/nosotros`, `/productos`,
    `/productos/[slug]`, `/descargas`, `/ubicacion`, `/contacto`.
  - API `/api/contact` para el formulario (persiste en `contact_message`).
- **Decisiones tomadas:**
  - Server Components por defecto; cliente solo en header, catálogo y formulario.
  - Imágenes vía `<img>` con `loading="lazy"` (no `next/image`, por restricción
    del entorno Cloudflare/OpenNext).
- **Observaciones técnicas:** Fuentes con `next/font` (`display: "swap"`) para
  evitar bloqueo de render.

---

## Registro DV-02 — Acceso a datos con TotalumSDK

- **Fecha:** 2026-06-18
- **Objetivo:** Centralizar el acceso a datos del catálogo.
- **Prompt completo:** (regla de proyecto) "TotalumSDK: nunca usar en
  frontend/cliente. Importar `totalumSdk` desde `@/lib/totalum`. Manejo de
  errores sin fallos silenciosos."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Repositorio robusto en servidor.
- **Resultado obtenido:** `catalog.repository.ts` marcado `server-only`, con
  `safeQuery()` que registra errores (`console.error`) y devuelve un fallback no
  vacío para no romper el render; funciones: categorías con conteo, productos,
  best-sellers, producto por slug, slugs, relacionados y documentos.
- **Decisiones tomadas:**
  - Errores **siempre** visibles en logs; el formulario de contacto propaga
    errores al frontend con `{ ok, data | error }`.
  - Convención de API: respuestas `{ ok: true, data }` y cliente vía
    `src/lib/api.ts`.
- **Observaciones técnicas:** Se corrigió un fallo crítico de configuración: las
  rutas públicas (`/productos`, `/nosotros`, `/descargas`, `/ubicacion`,
  `/contacto`) faltaban en `middleware.ts` y eran redirigidas a `/login`; se
  añadieron a `publicRoutes`.

---

## Registro DV-03 — Restricciones técnicas (sin telemetría/trackers)

- **Fecha:** 2026-06-18
- **Objetivo:** Cumplir restricciones de privacidad y peso.
- **Prompt completo:**
  > "Sin telemetría. Sin trackers. Sin dependencias innecesarias. Sin frameworks
  > CSS. Sin funcionalidad de e-commerce. Sin gestión de pagos ni precios."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Sitio sin rastreadores ni e-commerce activo.
- **Resultado obtenido:** Sin scripts de analítica/trackers; `NEXT_TELEMETRY_DISABLED=1`
  en los scripts; ningún flujo de pago/precio expuesto en el sitio público.
- **Decisiones tomadas:** El andamiaje de auth/Stripe del template permanece sin
  enlazar desde la navegación (no se muestra al visitante); el catálogo es 100%
  informativo con CTA a WhatsApp/teléfono.
- **Observaciones técnicas:** "Sin frameworks CSS" se interpretó como sin
  librerías de componentes UI pesadas; se usa Tailwind (utilidades) por ser el
  estándar obligatorio del entorno — ver `other-prompts.md` (OP-01).
