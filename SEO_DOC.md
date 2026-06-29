# SEO_DOC — Guía práctica de implementación

Pasos para que Google indexe Tradesika y la gente en Ecuador lo encuentre.
Orden recomendado. Marca cada casilla al terminar.

> **Dominio oficial:** `https://www.tradesika.com` (ajusta si usas otro).
> **NAP oficial** (debe ser IDÉNTICO en todos lados):
> ```
> Nombre:    Tradesika — Distribuidor Autorizado Sika
> Dirección: Acuarela del Río Mz. 1179 Sl. 1-25, Guayaquil, Guayas, Ecuador
> Teléfono:  099 285 5980   (+593 99 285 5980)
> Horario:   Lun–Vie 08:00–17:00 · Sáb–Dom cerrado
> Web:       https://www.tradesika.com
> ```

---

## ✅ Ya implementado en el código (no hay que hacer nada)
- Metadatos por página (`<title>`, description, canonical, Open Graph, Twitter).
- Datos estructurados JSON-LD: Organization, LocalBusiness, WebSite + buscador, Product, Breadcrumbs, ItemList.
- `sitemap.xml` y `robots.txt` automáticos (61 productos + 8 categorías + páginas fijas).
- Renderizado estático (SSG) → carga rápida e indexación eficiente.
- Etiquetas geo (Ecuador / Guayaquil) y `lang="es-EC"`.

---

## 1. Deploy correcto · 5 min
- [ ] En Coolify, define la variable de build:
      `NEXT_PUBLIC_SITE_URL = https://www.tradesika.com`
- [ ] Despliega.
- [ ] Abre `https://www.tradesika.com/sitemap.xml` → debe mostrar URLs con tu dominio.
- [ ] Abre `https://www.tradesika.com/robots.txt` → debe apuntar al sitemap.
- [ ] Elige UNA versión (con `www` o sin `www`) y redirige la otra a esa. Usa siempre la misma en todos los pasos.

---

## 2. Google Search Console · 10 min  *(indexación)*
1. [ ] Entra a https://search.google.com/search-console y agrega la propiedad (tipo **Dominio**).
2. [ ] Verifica con el registro **TXT** en tu DNS (lo da Google).
3. [ ] Menú **Sitemaps** → envía: `sitemap.xml`
4. [ ] Menú **Inspección de URL** → pega la home → **Solicitar indexación**.
5. [ ] Repite la inspección con 3–4 productos clave (los más vendidos).

> Resultado en 1–7 días: empiezan a aparecer las páginas en "Páginas → Indexadas".

---

## 3. Google Business Profile · 30 min  *(LO MÁS IMPORTANTE para Ecuador local)*
Esto es lo que hace que aparezcas en **Google Maps** y en "Sika cerca de mí".

1. [ ] Crea/reclama el perfil en https://business.google.com
2. [ ] Pega el **NAP** de arriba **exactamente igual** (carácter por carácter).
3. [ ] Ubica el pin en las coordenadas exactas: **-2.138083, -79.882417**
4. [ ] Categoría principal: **Tienda de materiales de construcción**.
       Secundarias: *Tienda de pinturas*, *Proveedor de impermeabilizantes*.
5. [ ] Horario: Lun–Vie 08:00–17:00 · Sáb–Dom cerrado.
6. [ ] Web: `https://www.tradesika.com` · Tel: `099 285 5980`.
7. [ ] Sube **fotos reales** (mínimo 8): local, fachada, productos Sika, equipo.
8. [ ] Activa mensajes / botón de WhatsApp.
9. [ ] Verifica el perfil (Google envía código por correo, llamada o video).
10. [ ] Publica 1 "Novedad" al mes (producto destacado, promoción).
11. [ ] Pide **reseñas** a clientes y responde todas.

---

## 4. Bing Webmaster · 5 min  *(opcional, fácil)*
- [ ] https://www.bing.com/webmasters → **Importar desde Google Search Console** (1 clic).
- [ ] Envía el mismo `sitemap.xml`.

---

## 5. Directorios locales (NAP idéntico) · 20 min
Más menciones consistentes = más confianza local. Usa el MISMO NAP.
- [ ] Facebook (página de empresa) → completa dirección, horario, web.
- [ ] Instagram (bio con web y dirección).
- [ ] Waze (agregar negocio).
- [ ] Páginas Amarillas Ecuador / directorios de construcción locales.

> Cuando tengas Facebook e Instagram, pásamelos y los conecto en `site.config.ts`
> (campo `social`) para que entren en los datos estructurados.

---

## 6. Contenido que ayuda a posicionar
- [ ] Verifica que cada producto tenga descripción y aplicaciones (ya cargadas).
- [ ] Consigue 2–3 **enlaces** desde sitios ecuatorianos (proveedores, cámara de comercio, blogs de construcción).
- [ ] Comparte fichas de producto en redes (genera tráfico y señales).

---

## 7. Mantenimiento mensual · 10 min
- [ ] Search Console → **Rendimiento**: revisa consultas y clics.
- [ ] Search Console → **Páginas**: revisa errores de indexación.
- [ ] Google Business Profile: responde reseñas + 1 publicación nueva.
- [ ] Tras agregar productos nuevos: el `sitemap.xml` se actualiza solo al desplegar.

---

### Prioridad si tienes poco tiempo
**1)** Deploy con dominio correcto → **2)** Search Console + sitemap → **3)** Google Business Profile.
Con esos tres ya apareces en búsquedas y en el mapa de Guayaquil.
