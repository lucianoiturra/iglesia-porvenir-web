# Proyecto Nuevas Generaciones — Iglesia Porvenir

> Sitio web de campaña de recaudación de fondos para la renovación del espacio de niños y jóvenes de la Iglesia Adventista del Séptimo Día Comunidad Porvenir, Santiago de Chile.

---

## Qué hace

El sitio presenta el proyecto de renovación de una bodega abandonada en 7 salas dedicadas para personas de 0 a 25 años. Incluye visualización de renders arquitectónicos, planos interactivos por planta, galería filtrable con lightbox, desglose de presupuesto y pasos para donar. Integra también transmisiones en vivo vía YouTube.

Meta de recaudación: **CLP 49.365.960** · Recaudado a la fecha: CLP 12.000.000 (24 %)

---

## Instalación / Requisitos

- Node.js >= 22.12.0
- npm

```bash
npm install
npm run dev     # desarrollo en localhost:4321
npm run build   # build de producción en /dist
npm run preview # previsualizar el build
```

**Variables de entorno opcionales** (YouTube API):

```env
PUBLIC_YOUTUBE_API_KEY=...
PUBLIC_YOUTUBE_CHANNEL_ID=...
```

Sin estas variables el embed de YouTube funciona igual, pero sin la grilla de videos recientes.

---

## Cómo funciona

Sitio estático generado con Astro (SSG). Las páginas se renderizan en el servidor y los componentes React interactivos se hidratan en el cliente con `client:load`.

```
Usuario → Astro page (SSR/SSG)
             └── React components (client:load)
                  ├── RoomCards     → modales de sala
                  ├── FloorPlan     → planos SVG interactivos
                  └── ImageGallery  → galería con lightbox
```

Los datos del proyecto (salas, presupuesto, banco) están centralizados en `src/data/salas.ts`.

---

## Uso

### Desarrollo

```bash
npm run dev
```

### Actualizar datos del proyecto

Editar `src/data/salas.ts`:
- `SALAS` — array con las 7 salas (nombre, capacidad, área, piso, color, descripción)
- `PROYECTO` — meta, monto recaudado y desglose de costos
- `BANCO` — datos bancarios para donaciones

### Agregar imágenes

Colocar en `public/images/renders/`. Los nombres de archivo se referencian en `salas.ts` y en las páginas de galería.

---

## Páginas

| Ruta | Archivo | Contenido |
|------|---------|-----------|
| `/` | `index.astro` | Landing principal con hero, salas, galería, presupuesto y donación |
| `/galeria` | `galeria.astro` | Galería completa con filtros por categoría |
| `/nosotros` | `nosotros.astro` | Historia, misión, valores y horarios de la iglesia |
| `/contacto` | `contacto.astro` | Datos de contacto, redes sociales y botón de donación |
| `/transmisiones` | `transmisiones.astro` | Canal de YouTube con grilla de videos recientes |

---

## Estructura de Carpetas y Archivos

```text
/
├── public/
│   ├── favicon.svg             # Favicon del sitio web (logo negro)
│   ├── logo-blanco.svg         # Logo usado en la barra de navegación (header)
│   └── images/
│       ├── renders/            # Imágenes 3D del proyecto arquitectónico final
│       └── salas_actuales/     # Fotos reales de la situación actual, separadas por:
│           ├── 01-bebes-y-principiantes/
│           ├── 02-infante/
│           ├── 03-primarios/
│           ├── 04-intermediarios/
│           ├── 05-gteen/
│           └── 06-jovenes/
│
├── src/
│   ├── components/             # Componentes de UI reusables
│   │   ├── sections/           # Secciones modulares de la página principal
│   │   │   ├── DonarSection.astro
│   │   │   ├── HeroSection.astro
│   │   │   ├── HistoriaSection.astro
│   │   │   └── PresupuestoSection.astro
│   │   ├── FloorPlan.tsx       # Planos SVG interactivos (React)
│   │   ├── Footer.astro        # Pie de página global
│   │   ├── ImageGallery.tsx    # Galería con filtros y Lightbox (React)
│   │   ├── Nav.astro           # Barra de navegación principal
│   │   ├── RoomCards.tsx       # Tarjetas de salas y modal (React)
│   │   └── YouTubeEmbed.astro  # Componente para embeber streams
│   │
│   ├── data/
│   │   └── salas.ts            # Datos centralizados: salas, presupuesto y banco
│   │
│   ├── layouts/
│   │   └── Layout.astro        # Layout principal (SEO, estructura HTML base)
│   │
│   ├── pages/                  # Rutas de Astro (Páginas del sitio)
│   │   ├── contacto.astro
│   │   ├── galeria.astro
│   │   ├── index.astro         # Landing page (Home)
│   │   ├── nosotros.astro      # Página corporativa e historia
│   │   └── transmisiones.astro # Visualización de streams de YouTube
│   │
│   └── styles/
│       └── global.css          # Estilos globales y utilidades de diseño
```

---

## Stack

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Astro | 6.2.1 | Framework SSG principal |
| React | 19.2.5 | Componentes interactivos |
| Tailwind CSS | 4.2.0 | Sistema de diseño |
| TypeScript | — | Tipado de datos |
| yet-another-react-lightbox | 3.31.0 | Galería con zoom |
| lucide-react | 1.14.0 | Iconos |

---

## Notas

- El diseño usa la fuente **Prompt** (Google Fonts) con fallback a Calibri.
- El color institucional primario es `#003366` (azul marino).
- La meta de donación y el monto recaudado se actualizan manualmente en `PROYECTO` dentro de `salas.ts`.
- Los datos bancarios actuales: BCI · Cta 35418532 · RUT 65.002.737-K · Iglesia de Porvenir.
