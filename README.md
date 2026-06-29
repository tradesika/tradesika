# Tradesika

Sitio corporativo de **catálogo estático** para Tradesika, distribuidor autorizado de **Sika en Ecuador**. Sin base de datos, sin API, sin auth: el contenido vive como datos tipados en el repo y todo convierte a contacto por **WhatsApp / teléfono**.

---

## 🚀 Ver localmente

**Requisitos:** Node 24.

```bash
npm install                  # instalar dependencias
npm run dev                  # → http://localhost:3000
npm run check-types-errors   # tsc --noEmit (correr tras cada cambio)
```

Edita los archivos en `src/`; Next.js recarga en caliente.

---

## 🏗️ Build

```bash
npm run build         # standalone (.next/standalone) → Docker / Coolify
npm start             # sirve el build en el puerto 80
npm run build:pages   # export estático (BUILD_TARGET=export) → out/
```

**Dual-output:** `next.config.ts` lee `BUILD_TARGET` en build:

| `BUILD_TARGET` | `output`     | Salida              | Para            |
| -------------- | ------------ | ------------------- | --------------- |
| (vacío)        | `standalone` | `.next/standalone`  | Docker / Coolify (servidor Node, headers de caché) |
| `export`       | `export`     | `out/`              | GitHub Pages (HTML estático, sin servidor) |

> ⚠️ **No corras `build` ni `build:pages` con `npm run dev` abierto.** Los hooks `pre/postbuild:pages` borran `.next` y ambos compiten por ese directorio → builds parciales / chunks rotos.
> ⚠️ `npm start` usa el **puerto 80** (no el 3000). Docker en cambio expone el 3000 (`ENV PORT=3000`, `node server.js`).

---

## ☁️ Despliegue

### Coolify (Docker) — actual

Build multi-stage sobre `node:24-alpine`, output `standalone`, usuario no-root `nextjs` (uid 1001), `CMD node server.js` en el **puerto 3000**.

- Pasa el build-arg `NEXT_PUBLIC_SITE_URL` (se inyecta en build para el dominio canónico / sitemap / Open Graph).
- Env del runner: `NODE_ENV=production`, `NEXT_TELEMETRY_DISABLED=1`, `PORT=3000`, `HOSTNAME=0.0.0.0`.

### GitHub Pages (`docs/`) — automático con GitHub Actions

> ## ⚡ Tú solo haces `git push`
>
> El build y la publicación son **automáticos**: GitHub Actions construye, regenera `docs/` y lo commitea solo.
> **No** corras `build:pages` ni edites `docs/` a mano.

```bash
git add .
git commit -m "mis cambios"
git push
```

```text
   git push   ─▶   🤖 GitHub Actions   ─▶   🏗️ build + docs/   ─▶   🌐 GitHub Pages
     (TÚ)              (automático)             (automático)            (publicado)
```

**Detalle del workflow** (`.github/workflows/deploy-pages.yml`):

- **Trigger:** push a `main` (con `paths-ignore: docs/**`) o `workflow_dispatch` manual.
- Node 24 → `npm ci` → `npm run build:pages` con `NEXT_PUBLIC_SITE_URL=https://www.tradesika.com`.
- Ensambla `docs/` (mueve `out/`, crea `.nojekyll` y `CNAME` = `www.tradesika.com`).
- **Commit solo si `docs/` cambió**, con mensaje `... [skip ci]`.
- **Anti-bucle:** `paths-ignore: docs/**` + `[skip ci]` evitan que el commit del bot dispare otro run; `concurrency` cancela runs en curso.

**Pasos manuales en GitHub (una vez):**

1. **Permisos de escritura:** Settings → Actions → General → Workflow permissions = *Read and write permissions*.
2. **Pages:** Settings → Pages → Source = *Deploy from a branch*, branch = `main`, folder = `/docs`.
3. **DNS:** apuntar `www.tradesika.com` a GitHub Pages (CNAME a `{usuario}.github.io` o registros A a las IPs de Pages).

---

## 🧱 Arquitectura del frontend

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · lucide-react.

**Capas (Clean Architecture, dependencias hacia adentro):**

| Ruta                                    | Rol                                                                 |
| --------------------------------------- | ------------------------------------------------------------------- |
| `src/domain/catalog/catalog.types.ts`   | **Dominio** — tipos puros (`Product`, `Category`, `SiteDocument`). Sin I/O. |
| `src/lib/catalog/catalog.repository.ts` | **Repositorio** — única frontera de datos. Funciones `async` (futura BD). |
| `src/lib/catalog/data/*.ts`             | **Datos estáticos** — 8 categorías, 61 productos, 1 documento.       |
| `src/lib/catalog/format.ts`             | **Formatters puros** — `parseLines()`, `parseTechSpecs()`.          |
| `src/lib/site.config.ts`                | **Fuente única de negocio** — `SITE`, `NAV_LINKS`, helpers WhatsApp/maps. |
| `src/lib/seo/seo.ts`                    | **SEO** — `buildMetadata()` + builders JSON-LD (Schema.org).        |
| `src/app/**`                            | **Presentación** — páginas (Server Components), layout, sitemap.    |
| `src/components/**`                     | **UI reutilizable** — `ui/` (shadcn), `common/`, `layout/`, `home/`, `catalog/`. |

**Flujo de datos:**

```
Página (Server Component) → repositorio (async) → datos estáticos (PRODUCTS/CATEGORIES/DOCUMENTS) → tipos de dominio → UI
```

La UI solo conoce los tipos de dominio. Si cambia la fuente (BD/API) solo se reescribe el repositorio; las páginas no cambian.

**Convenciones clave:**

- **Server Components por defecto.** `"use client"` solo donde hay interacción: `SiteHeader`, `CatalogBrowser`, `WhatsAppFloat`, `Reveal`.
- **SSG:** `generateStaticParams()` en rutas `[slug]` (productos y categorías); `sitemap.ts` y `robots.ts` se generan en build (`force-static`).
- **`site.config.ts` = única verdad** de config de negocio y navegación (header + footer + SEO la comparten).
- **SEO data-driven:** `buildMetadata()` y JSON-LD en cada página; keywords geolocalizadas (Ecuador, Guayaquil).
- **Imágenes:** `<img loading="lazy">` (no `next/image`); fuentes con `next/font` (`display: "swap"`).
- **Listas en datos** separadas por `\n` (`applications`, `benefits`) y specs `clave: valor`, parseadas en `format.ts`.
- **Búsqueda/filtro** solo en cliente (`CatalogBrowser`) con deep-linking vía `?categoria=` y `?buscar=`.
- **Todas las rutas son públicas** (sin middleware ni auth).

**Rutas principales:**

```
/                            Home (8 secciones)
/nosotros                    Nosotros
/productos                   Catálogo (búsqueda + filtro por categoría, cliente)
/productos/[slug]            Detalle de producto (+ relacionados)
/productos/categoria/[slug]  Landing de categoría
/descargas                   Documentos descargables
/ubicacion                   Mapa y cómo llegar
/contacto                    WhatsApp / teléfono / mapa (sin formulario)
/privacy-policy · /terms-of-service
/sitemap.xml · /robots.txt   Generados en build
```

---

## 📜 Scripts npm

| Script                       | Qué hace                                                        |
| ---------------------------- | -------------------------------------------------------------- |
| `npm run dev`                | Servidor de desarrollo (`http://localhost:3000`).              |
| `npm run build`              | Build `standalone` → `.next/standalone` (Docker / Coolify).    |
| `npm run build:pages`        | Export estático (`BUILD_TARGET=export`) → `out/` (GitHub Pages). |
| `npm start`                  | Sirve el build de producción en el **puerto 80**.              |
| `npm run check-types-errors` | `tsc --noEmit --skipLibCheck` (correr tras cada cambio).       |
