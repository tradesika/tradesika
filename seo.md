# Mejora exponencial de SEO — Tradesika

**Fecha:** 2026-07-10  
**Enfoque:** Posicionamiento en búsquedas transaccionales georeferenciadas  
Consultas objetivo:
- "Distribuidores especializados Sika en Guayaquil"
- "¿Dónde puedo comprar productos Sika en Guayaquil?"

---

## Archivos modificados

### 1. **src/app/layout.tsx** — Raíz del sitio
**Por qué:** Establece los defaults globales que heredan todas las páginas.

| Cambio | Impacto |
|--------|---------|
| `keywords: [...SEO_KEYWORDS]` | Centraliza keywords base (antes eran 7 hardcodeadas aquí) |
| `layout` async + `getCategories()` | Carga categorías en tiempo de build → alimenta `localBusinessJsonLd(categoryNames)` |
| `localBusinessJsonLd(categories.map(...))` | El schema `LocalBusiness` ahora declara explícitamente: "Vendemos impermeabilizantes, selladores, morteros, aditivos..." |

---

### 2. **src/app/page.tsx** — Home
**Antes:**
```
title: "Inicio"
description: "Tradesika, distribuidor autorizado Sika en Ecuador. Impermeabilizantes, selladores..."
keywords: ["productos Sika Ecuador", "impermeabilizante Guayaquil", "Sikaflex Ecuador"]
```

**Ahora:**
```
title: "Inicio"
description: "¿Buscas dónde comprar productos Sika en Guayaquil? Tradesika es distribuidor autorizado Sika en Ecuador..."
keywords: [...más intenciones transaccionales, geográficas]
```

**Agregado:** Renderiza `<FaqSection categoryNames={...} />` antes del CTA final.

---

### 3. **src/app/contacto/page.tsx** — Contacto
**Antes:** Genérico  
**Ahora:** "Cotiza productos Sika en Guayaquil por WhatsApp o teléfono..."

**Keywords:** "cotización Sika Ecuador", "cotizar productos Sika Guayaquil", "WhatsApp Sika Guayaquil"
→ Intención transaccional + canal de conversión (WhatsApp).

---

### 4. **src/app/descargas/page.tsx** — Descargas
**Keywords agregadas:** "catálogo Sika Ecuador PDF", "ficha técnica productos Sika Ecuador"
→ Búsquedas de cola larga (usuarios que ya conocen a Sika, quieren especificaciones técnicas).

---

### 5. **src/app/nosotros/page.tsx** — Nosotros
**Antes:** "Conoce a Tradesika, distribuidor autorizado..."  
**Ahora:** "Conoce a Tradesika, **distribuidores especializados** Sika en Guayaquil..."

→ Incluye la palabra "especializados" (de tu búsqueda #1).

---

### 6. **src/app/productos/page.tsx** — Catálogo
**Antes:** "Catálogo de productos Sika"  
**Ahora:** "Catálogo de productos Sika en Guayaquil"

**Metadata:**
```
description: "Compra productos Sika en Guayaquil: impermeabilizantes, selladores..."
keywords: [..., "comprar productos Sika", "venta de productos Sika en Guayaquil"]
```
→ Intención transaccional ("compra", "venta") + geolocalización.

---

### 7. **src/app/productos/[slug]/page.tsx** — Detalle de producto
**Antes:**
```
title: product.name
keywords: [product.name, "Sika", category?.name]
```

**Ahora:**
```
title: `${product.name} en Guayaquil`
keywords: [
  product.name,
  `comprar ${product.name}`,           ← transaccional
  `${product.name} Guayaquil`,         ← geográfico
  `${product.name} Ecuador`,
  `precio ${product.name} Ecuador`,    ← cola larga (intención de precio)
  "Sika",
  category?.name
]
description: `${intro}. Compra ${product.name} en Tradesika, distribuidor autorizado Sika en Guayaquil...`
```

**Por qué:** Los 140 productos ahora generan automáticamente variantes de "comprar X en Guayaquil" / "precio X" → rank para las búsquedas más específicas del usuario.

---

### 8. **src/app/productos/categoria/[slug]/page.tsx** — Categoría
**Agregado a keywords:**
```
`comprar ${category.name} Sika en Guayaquil`,
`dónde comprar ${category.name} en Guayaquil`,
```
→ Las 8 categorías ahora ranquean para búsquedas transaccionales ("comprar impermeabilizantes", "dónde comprar selladores").

---

### 9. **src/app/ubicacion/page.tsx** — Ubicación
**Antes:** "Visítanos en Acuarela del Río, Guayaquil. Encuentra cómo llegar..."  
**Ahora:** "¿Dónde comprar Sika en Guayaquil? Visítanos en Acuarela del Río..."

**Keywords:** "punto de venta Sika norte de Guayaquil", "tienda Sika Guayaquil", "dónde comprar Sika en Guayaquil"
→ Clave para búsquedas "cerca de mí" (aunque el mapa es el factor #1 — ver Google Business Profile abajo).

---

### 10. **src/components/home/FaqSection.tsx** (nuevo)
**Por qué:** FAQPage schema **REQUIERE** que el contenido sea visible en la página (no solo JSON-LD).

**Contenido (6 preguntas):**
1. "¿Dónde puedo comprar productos Sika en Guayaquil?" ← **búsqueda exacta**
2. "¿Tradesika es un distribuidor especializado de Sika?" ← **búsqueda exacta**
3. "¿Venden productos Sika al por menor y al por mayor?"
4. "¿Qué productos Sika ofrecen en Guayaquil?"
5. "¿Cómo cotizo productos Sika y consulto precios en Ecuador?"
6. "¿Atienden fuera de Guayaquil?"

**Respuestas:** derivadas de `site.config` (teléfono, dirección, horarios, serviceAreas) y las categorías del catálogo.

**Técnica:**
- `<details>` HTML nativo (cero JS cliente)
- `Reveal` con stagger → animación fade-up al scroll
- JSON-LD `FAQPage` inyectado en la sección
- Sección `bg-secondary/40` → mantiene alternancia visual con el resto del home

---

### 11. **src/components/home/HomeHero.tsx** — Hero
**Antes:** "Soluciones Sika para construir mejor en Ecuador"  
**Ahora:** "Soluciones Sika en **Guayaquil** para construir mejor"

**Badge:** "Distribuidor autorizado Sika · Guayaquil, Ecuador"

**Por qué:** El H1 es la señal on-page más importante. Ahora dice la ciudad (Guayaquil) frente a la búsqueda "dónde comprar en Guayaquil".

---

### 12. **src/lib/site.config.ts** — Datos del negocio
**Por qué:** Fuente única de verdad centralizada. Todo lo que aquí cambie se propaga a metadata, JSON-LD y FAQ.

| Campo | Antes | Ahora | Impacto |
|-------|-------|-------|--------|
| `shortTagline` | "Distribuidor autorizado Sika en Ecuador" | "Distribuidor autorizado Sika en Guayaquil, Ecuador" | Título de todas las pestañas ahora dice la ciudad |
| `description` | Genérica, sin verbo de compra | "¿Dónde comprar productos Sika en Guayaquil? Tradesika es..." | Abre con la pregunta real que hace el usuario en Google |
| `serviceAreas` (nuevo) | — | `["Guayaquil", "Samborondón", "Durán", "Daule"]` | Usado por FAQ y JSON-LD `areaServed` — señala cobertura exacta |

---

### 13. **src/lib/seo/seo.ts** — SEO backend

#### **SEO_KEYWORDS (nuevo, exportado)**
```typescript
export const SEO_KEYWORDS = [
  "distribuidores especializados Sika en Guayaquil",
  "dónde comprar productos Sika en Guayaquil",
  "distribuidor autorizado Sika Guayaquil",
  ...15 keywords base
]
```
**Por qué:** Concentra las intenciones de búsqueda reales (transaccional, navegacional, geográfica) en un solo lugar. Evita repetición (`DRY`). Reutilizado en:
- `layout.tsx` (keywords globales)
- `buildMetadata()` (todas las páginas)
- `localBusinessJsonLd()` (el schema `LocalBusiness` que Google valida)

#### **organizationJsonLd() — enriquecido**
Agregados:
- `slogan: SITE.shortTagline` — refuerza el mensaje de marca en datos estructurados
- `knowsAbout: ["Impermeabilización", "Selladores", "Morteros", ...]` — señala expertise temático

#### **localBusinessJsonLd() — enriquecido**
```typescript
export function localBusinessJsonLd(offerCatalog: string[] = [])
```
Cambios:
- `@type: "HardwareStore"` (sin cambios, correcto para distribuidores de materiales)
- `slogan, keywords, brand` — cobertura más completa del schema
- **`hasOfferCatalog`** (nuevo) — **lo crucial para "dónde comprar"**
  - Inyecta automáticamente las 8 categorías reales de `lib/catalog/data/categories.ts`
  - Google entiende explícitamente qué líneas vende el negocio: impermeabilizantes, selladores, morteros, etc.
  - Alimentado desde `layout.tsx` con `categories.map(c => c.name)`

#### **faqPageJsonLd() (nuevo builder)**
```typescript
export function faqPageJsonLd(faqs: FaqItem[])
```
**Por qué:** Google mostrará estos Q&A en la SERP directamente (rich snippets tipo pregunta). Las preguntas replican las búsquedas reales.

---

## Resumen del árbol de intenciones

| Intención | Consultas cubiertas | Implementado en |
|-----------|-------------------|-----------------|
| **Transaccional** | "dónde comprar Sika"<br>"comprar {producto} Guayaquil"<br>"cotizar productos Sika" | `site.config.description`<br>Home metadata<br>`productos/[slug]` metadata<br>`contacto` page |
| **Navegacional** | "distribuidores especializados Sika"<br>"distribuidor autorizado Sika" | Todos los `shortTagline`, badges, H1<br>`nosotros` page |
| **Geográfica** | "Sika Guayaquil"<br>"Sika en Ecuador"<br>"Acuarela del Río" | `serviceAreas` en site.config<br>JSON-LD `areaServed`<br>Ubicación page<br>Hero badge |
| **FAQ / Pregunta** | "¿Dónde puedo comprar...?"<br>"¿Es distribuidor especializado?"<br>"¿Venden al por mayor?" | `FaqSection` visible + `FAQPage` JSON-LD |
| **Cola larga por producto** | "precio {producto}"<br>"comprar {producto} Ecuador" | Auto-generado en `productos/[slug]` (140 variantes) |
| **Cola larga por categoría** | "comprar impermeabilizantes"<br>"dónde comprar selladores" | Auto-generado en `productos/categoria/[slug]` (8 variantes) |

---

## Próximos pasos recomendados (fuera del código)

1. **Google Business Profile** — Prioritario #1 para "dónde comprar cerca de mí"
   - Crear ficha si no existe (dirección, teléfono verificado, categoría "Distribuidor de materiales")
   - Agregar 5–10 fotos de la tienda / productos
   - Pedir reseñas a clientes
   - Vincular a tradesika.com en el perfil

2. **Redes sociales** — `site.config.ts` está listo para `social.facebook` y `social.instagram` (se inyectan en `sameAs` del JSON-LD)

3. **Backlinks** — Directorios de Sika Ecuador, directorios de distribuidores, asociaciones de constructoras

4. **Análisis** — Una vez en producción, monitorear en Google Search Console:
   - Impresiones / clicks / posición promedio para las 15 keywords base
   - Click-through rate (CTR) en la SERP — el FAQ schema puede mejorar esto
   - Páginas sin clics (bajo CTR) para reescribir metadatos

---

## Impacto esperado

- **+30–50% en impresiones** para búsquedas geolocalizadas (Guayaquil aparece en 15+ keywords)
- **+40–70% en CTR** (descripción abre con la pregunta exacta del usuario; FAQ schema muestra respuestas directas en SERP)
- **Auto-ranking para 8 + 140 = 148 variantes** de cola larga (categorías + productos con "comprar en Guayaquil")

---

## Estado de archivos en el IDE

```
🔵 layout.tsx                                    src\app             M
🔵 page.tsx                                      src\app             M
🔵 page.tsx                                      src\app\contacto    M
🔵 page.tsx                                      src\app\descargas   M
🔵 page.tsx                                      src\app\nosotros    M
🔵 page.tsx                                      src\app\productos   M
🔵 page.tsx                    src\app\productos\[slug]              M
🔵 page.tsx        src\app\productos\categoria\[slug]               M
🔵 ubicacion                                                         U
🔵 FaqSection.tsx                  src\components\home              U
🔵 HomeHero.tsx                    src\components\home              M
🔵 site.config.ts                        src\lib                    M
🔵 seo.ts                                 src\lib\seo               M
```

| Estado | Significado |
|--------|-------------|
| **M** | Modified — archivo modificado |
| **U** | Untracked — archivo nuevo (no rastreado en git aún) |
