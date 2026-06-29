# Contenido — Prompts y Decisiones

Registros de prompts relacionados con el contenido del sitio, el catálogo de
productos y los datos del negocio.

---

## Registro CT-01 — Datos del negocio (Tradesika)

- **Fecha:** 2026-06-18
- **Objetivo:** Cargar la información corporativa real proporcionada.
- **Prompt completo:**
  > "La web se llamará Tradesika… distribuidor autorizado especializado en
  > productos de Sika Ecuador… Dirección: Acuarela del Río Mz. 1179 Sl. 1-25.
  > Teléfonos: 99 088 2133 / 99 076 5376. Referencia de marca:
  > https://ecu.sika.com"
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Datos de contacto y dirección centralizados.
- **Resultado obtenido:** `src/lib/site.config.ts` con nombre, tagline,
  dirección (Guayaquil/Guayas), teléfonos en formato E.164
  (`+593990882133`, `+593990765376`), WhatsApp, horarios y helpers de mapa.
- **Decisiones tomadas:** Teléfonos normalizados a E.164 para enlaces `tel:` y
  `wa.me`. La línea principal se usa para WhatsApp.
- **Observaciones técnicas:** Coordenadas aproximadas de Guayaquil para el
  `LocalBusiness` JSON-LD; el mapa usa Google Maps embebido sin API key.

---

## Registro CT-02 — Catálogo de productos Sika

- **Fecha:** 2026-06-18
- **Objetivo:** Poblar el catálogo con productos, categorías y contenido técnico.
- **Prompt completo:**
  > "Listado completo de productos con: Imagen, Nombre, Descripción,
  > Aplicaciones, Beneficios, Información técnica relevante. Productos más
  > vendidos. Soluciones por categoría (Impermeabilización, Sellado y pegado,
  > Reparación estructural, Construcción, Pisos industriales, Cubiertas,
  > Morteros, Otras líneas Sika). No se mostrarán precios."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** 8 categorías y productos representativos por categoría,
  con imágenes.
- **Resultado obtenido:** 8 categorías (con icono lucide y descripción) y 16
  productos reales de la línea Sika (Sika-1, Sikaflex-1a Plus, SikaTop Seal-107,
  Sikalastic-560, Sika Grout-212, Sika ViscoCrete-3300, etc.), cada uno con
  descripción, aplicaciones, beneficios, información técnica, presentación e
  imagen WebP. Marcado de "más vendidos" (`is_best_seller`).
- **Decisiones tomadas:**
  - **Sin precios:** los PDFs "lista de precios" adjuntos NO se publican como
    descargas; se usaron como fuente de contenido técnico/comercial.
  - Imágenes de producto en formato WebP almacenadas en Totalum (campo `image`,
    compresión activa).
- **Observaciones técnicas:** El contenido de listas (aplicaciones/beneficios) se
  almacena como texto multilínea y se renderiza parseado; ver `format.ts`.

---

## Registro CT-03 — Documentación descargable

- **Fecha:** 2026-06-18
- **Objetivo:** Repositorio de documentación técnica.
- **Prompt completo:**
  > "Descargas de documentación: Catálogos, Manual del Constructor, Hojas de
  > seguridad, Fichas técnicas, Documentos comerciales."
- **Modelo de IA:** Claude Opus 4.8 (contexto 1M)
- **Versión del modelo:** `claude-opus-4-8[1m]`
- **Plataforma:** Totalum Agent (Claude Code)
- **Resultado esperado:** Sección de descargas con el material proporcionado.
- **Resultado obtenido:** "Manual del Constructor Sika 2022" disponible para
  descarga (enlace al PDF proporcionado). La página soporta más documentos por
  tipo (catálogo, manual, ficha técnica, hoja de seguridad, comercial).
- **Decisiones tomadas:** Las listas de precios quedan fuera por la restricción
  de "sin precios"; la sección invita a solicitar fichas por WhatsApp.
- **Observaciones técnicas:** El campo `external_url` permite servir archivos
  grandes por enlace cuando exceden el límite de subida.
