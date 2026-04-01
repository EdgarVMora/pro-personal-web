# CLAUDE.md — Portfolio Personal

> Este archivo es el contexto persistente del proyecto. Léelo completamente antes de cualquier acción.
> Actualízalo cuando se tomen decisiones de arquitectura importantes.

---

## 1. Identidad del Proyecto

- **Tipo:** Portfolio personal — multi-página
- **Objetivo:** Presentar proyectos, habilidades y contacto
- **Regla #1:** No se toca código manualmente. Todo cambio lo ejecuta Claude Code.

---

## 2. Stack Técnico

| Herramienta       | Versión objetivo | Notas                                      |
|-------------------|------------------|--------------------------------------------|
| Vite              | ^8.x             | Bundler principal                          |
| React             | ^19.x            | Framework UI                               |
| React Router DOM  | ^7.x             | Navegación multi-página (SPA)              |
| TailwindCSS       | ^4.x             | Plugin Vite: @tailwindcss/vite — sin postcss.config ni tailwind.config.js |
| GSAP              | ^3.x             | Animaciones y timelines                    |
| @gsap/ScrollTrigger | ^3.x           | Plugin oficial — siempre importar desde gsap/ScrollTrigger |

### Dependencias que NO están en este proyecto
- ❌ Lenis (no usar — genera conflictos con ScrollTrigger sin configuración avanzada)
- ❌ Framer Motion (no mezclar con GSAP — duplica responsabilidad)
- ❌ Redux / Zustand (sin estado global necesario en un portfolio)
- ❌ Axios (sin backend — no hay llamadas HTTP)

---

## 3. Estructura de Carpetas

```
src/
├── assets/           # Imágenes, fuentes, SVGs estáticos
├── components/       # Componentes reutilizables
│   ├── ui/           # Elementos base: Button, Card, Badge, etc.
│   └── layout/       # Navbar, Footer, PageWrapper
├── pages/            # Una carpeta por página/ruta
│   ├── Home/
│   │   ├── index.jsx
│   │   └── sections/   # Hero, About, etc. son secciones de Home
│   └── Projects/
│       └── index.jsx
├── hooks/            # Custom hooks — ej: useGSAP, useScrollTrigger
├── animations/       # Configuración centralizada de GSAP
│   ├── gsap.config.js    # Registro de plugins y defaults globales
│   └── variants.js       # Reutilizable: fade, slide, stagger, etc.
├── styles/
│   └── globals.css   # Solo @tailwind directives + variables CSS
├── router/
│   └── index.jsx     # Definición centralizada de rutas
└── main.jsx          # Entry point — aquí va el RouterProvider
```

### Reglas de estructura
- Cada página vive en `pages/[NombrePagina]/index.jsx`
- Las secciones largas de una página van en `pages/[NombrePagina]/sections/`
- Los componentes reutilizables entre páginas van en `components/`
- **Nunca** crear componentes directamente en `src/` sin carpeta

---

## 4. Convenciones de Código

### Componentes
- **Nombre:** PascalCase → `HeroSection.jsx`, `ProjectCard.jsx`
- **Export:** siempre `export default` al final del archivo
- **Props:** desestructuradas en la firma — `function HeroSection({ title, subtitle })`
- **Sin TypeScript** — este proyecto usa JavaScript puro

### Archivos
- Componentes: `PascalCase.jsx`
- Hooks: `camelCase.js` con prefijo `use` → `useScrollTrigger.js`
- Utilidades: `camelCase.js` → `formatDate.js`
- Configs: `camelCase.config.js` → `gsap.config.js`

### Estilos
- **Solo Tailwind** para estilos — sin CSS modules, sin styled-components
- Variables de diseño viven en `src/styles/globals.css` bajo `@theme` (Tailwind v4 — sin tailwind.config.js)
- No usar `style={{}}` inline excepto para valores dinámicos que Tailwind no puede generar

---

## 5. Design Tokens

Tailwind v4 usa configuración CSS-first. Los tokens viven en `src/styles/globals.css`:

```css
/* src/styles/globals.css */
@import "tailwindcss";

@theme {
  --color-background: #0a0a0a;   /* Negro suave — fondo base */
  --color-surface: #111111;      /* Cards, panels */
  --color-border: #1f1f1f;       /* Bordes sutiles */
  --color-text-primary: #f5f5f5; /* Texto principal */
  --color-text-secondary: #a0a0a0; /* Texto secundario / subtítulos */
  --color-text-muted: #555555;   /* Labels, metadatos */
  --color-accent: #e2e2e2;       /* CTA, highlights — PLACEHOLDER */

  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;
}
```

Uso en clases: `bg-background`, `text-text-primary`, `border-border`, `font-mono`, etc.

> ⚠️ `accent` es un placeholder. No implementar componentes dependientes de color de acento hasta que se defina.

---

## 6. Páginas y Rutas

| Ruta        | Componente          | Secciones                          |
|-------------|---------------------|------------------------------------|
| `/`         | `pages/Home`        | Hero, About, Projects (preview)    |
| `/projects` | `pages/Projects`    | Grid completo de proyectos         |

### Configuración de Router

```jsx
// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Projects from '../pages/Projects'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/projects', element: <Projects /> },
])
```

---

## 7. GSAP — Reglas Críticas

> Esta sección existe porque GSAP mal integrado fue la causa del fallo anterior. Seguir al pie de la letra.

### 7.1 Registro de plugins (una sola vez)

```js
// src/animations/gsap.config.js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
```

**Regla:** Solo importar `gsap` y `ScrollTrigger` desde `src/animations/gsap.config.js`, nunca directamente desde el paquete. Esto evita que ScrollTrigger se registre múltiples veces.

### 7.2 GSAP dentro de React

```jsx
// Patrón correcto con useGSAP hook
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../animations/gsap.config'

function HeroSection() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.from('.hero-title', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
  }, { scope: containerRef })

  return <section ref={containerRef}>...</section>
}
```

**Reglas:**
- Siempre usar `useGSAP` de `@gsap/react` — nunca `useEffect` para animaciones GSAP
- Siempre pasar `scope: ref` al contenedor — evita selectores globales que rompen otras secciones
- El cleanup lo maneja `useGSAP` automáticamente — no añadir cleanup manual
- No usar `document.querySelector` dentro de animaciones GSAP

### 7.3 ScrollTrigger

```js
// Patrón correcto
ScrollTrigger.create({
  trigger: element,         // Referencia DOM, no string selector global
  start: 'top 80%',
  end: 'bottom 20%',
  onEnter: () => { /* animación */ },
})
```

**Reglas:**
- `trigger` siempre recibe una referencia de `useRef`, no un string como `'.clase'`
- Llamar `ScrollTrigger.refresh()` después de que el layout cambie (lazy images, accordions)
- Si una animación no funciona en producción: verificar que `ScrollTrigger.refresh()` se llama después del render

### 7.4 Dependencias necesarias para GSAP en React

```bash
npm install gsap @gsap/react
```

---

## 8. Git Flow

```
main          → Solo código de producción. Tag en cada release.
develop       → Rama de integración. PRs se mergean aquí primero.
feature/*     → Una rama por feature. Usar worktrees para trabajar en paralelo.
fix/*         → Ramas de corrección de bugs.
```

### Convención de commits

```
feat: descripción corta
fix: descripción corta
style: cambios visuales sin lógica
refactor: restructura sin cambio de comportamiento
chore: dependencias, configs
```

### Worktrees — cómo usarlos

```bash
# Crear worktree para trabajar en animaciones sin tocar main/develop
git worktree add ../portfolio-animations feature/gsap-hero

# Trabajar en ese directorio de forma independiente
cd ../portfolio-animations

# Cuando termina, mergear a develop y eliminar worktree
git worktree remove ../portfolio-animations
```

---

## 9. Qué NO hacer (reglas para Claude Code)

- ❌ No instalar dependencias no listadas sin preguntar
- ❌ No usar `any` o forzar tipos (aunque es JS, no usar patrones ambiguos)
- ❌ No crear archivos CSS personalizados para cosas que Tailwind puede hacer
- ❌ No registrar `ScrollTrigger` fuera de `gsap.config.js`
- ❌ No usar `useEffect` para inicializar animaciones GSAP — usar `useGSAP`
- ❌ No modificar `main.jsx` a menos que sea estrictamente necesario
- ❌ No hacer commits directamente a `main`
- ❌ No mezclar lógica de datos con lógica de UI en el mismo componente

---

## 10. Estado actual del proyecto

- [ ] Proyecto inicializado con Vite + React
- [ ] TailwindCSS configurado
- [ ] React Router DOM configurado
- [ ] GSAP + @gsap/react instalados
- [ ] `gsap.config.js` creado y plugins registrados
- [ ] Design tokens en `tailwind.config.js`
- [ ] Estructura de carpetas creada
- [ ] Componente Navbar funcional
- [ ] Sección Hero con animación de entrada
- [ ] Sección About
- [ ] Sección/Página Projects
- [ ] Formulario de Contacto

> Actualizar este checklist después de cada feature mergeada a `develop`.
