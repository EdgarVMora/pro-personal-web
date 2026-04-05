# Projects Page — Decisiones de Arquitectura

> Resumen de los cambios estructurales más relevantes de la sesión.
> Rama: `feature/projects_animations`

---

## 1. Esferas 3D con Three.js — `AlienSphere.jsx`

**Problema anterior:** Las esferas eran divs CSS con `border-radius: 50%` y líneas SVG simulando latitud. GSAP rotaba el div completo con `rotateY`, que no produce perspectiva real de esfera.

**Solución:** Componente React que monta una escena Three.js completa dentro de un canvas.

```
AlienSphere
├── WebGLRenderer (alpha: true, antialias: true)
├── PerspectiveCamera (FOV 60, ratio 1:1, z = 2.5)
├── DirectionalLight (0xffffff, intensidad 1.6) — crea sombras en el relieve
├── AmbientLight (0x2a0a4a) — luz ambiente morada coherente con la página
├── SphereGeometry (radio 1, 64×64 segmentos)
└── MeshStandardMaterial
    ├── color / emissive — recibidos como props (permite colores distintos por esfera)
    ├── roughness: 0.55 — suficiente para que la luz especular resalte el relieve
    ├── bumpMap: planet_Bog1200.png (1200×600px)
    └── bumpScale: 0.45 — valor calibrado para que los cráteres sean visibles
```

**Rotación:** La hace Three.js en el render loop (`sphere.rotation.y += angularSpeed`), no GSAP. `rotationSpeed` es el número de segundos por vuelta completa, convertido a radianes/frame asumiendo 60fps.

**Textura:** Importada como módulo Vite (`import bumpMapUrl from '...'`) para que el build genere la URL con hash correcta. No usa ruta absoluta `/assets/...` porque `src/assets/` no es `public/`.

**Cleanup:** `cancelAnimationFrame` + `renderer.dispose()` + remoción del canvas del DOM, todo en el return del `useEffect`.

**Props de color:** Cada instancia recibe `color` y `emissive` como números hex, permitiendo que las tres esferas tengan personalidad distinta sin duplicar el componente.

| Esfera | Color base | Tono |
|--------|-----------|------|
| Grande (240px) | `0x8b3a28` | Rojo ladrillo |
| Pequeña (120px) | `0x2d6b3a` | Verde musgo |
| Mediana (180px) | `0xa07840` | Café arena |

---

## 2. Scroll horizontal pinned — `ProjectsGrid.jsx`

**Problema anterior:** Grid vertical estándar con animación `y: 30 → 0` al entrar al viewport. No aprovechaba el espacio visual de la página.

**Patrón implementado:** GSAP ScrollTrigger con `pin: true` — la sección se clava al viewport mientras el usuario hace scroll vertical, traduciendo ese scroll en movimiento horizontal del track.

```
<section ref={sectionRef}>            ← se pina al viewport
  <div ref={trackRef} width=300vw>    ← se mueve en X conforme avanza el scroll
    <div class="h-slide" width=100vw> ← slide 1
    <div class="h-slide" width=100vw> ← slide 2
    <div class="h-slide" width=100vw> ← slide 3
```

**Cálculo del recorrido:**
```js
x: () => -(trackRef.current.scrollWidth - window.innerWidth)
end: () => `+=${trackRef.current.scrollWidth - window.innerWidth}`
```
Ambos usan funciones (no valores fijos) + `invalidateOnRefresh: true` para que recalculen si el viewport cambia de tamaño.

**Animaciones de entrada por slide:** Usan `containerAnimation: tween` en `ScrollTrigger.create`. Esto le dice a ScrollTrigger que el progreso de activación no es el scroll de la página sino el avance del tween horizontal. Cuando el borde izquierdo de un slide pasa el 65% del ancho de pantalla, dispara `gsap.to` sobre sus elementos `.from-left` y `.from-right`.

```
Slide entra desde la derecha
  → borde izquierdo cruza 65% del viewport
    → .from-left: x -50 → 0, opacity 0 → 1 (stagger 0.1s)
    → .from-right: x 50 → 0, opacity 0 → 1 (delay 0.15s)
```

**Layout de cada slide:**

```
[      Lado izquierdo — texto      ] [  Lado derecho — card  ]
  contador 01/03 (mono, morado)
  h2 título (2.5rem, 700)
  p descripción (1rem, text-secondary)
                                       ProjectCard (420px fija)
```

---

## 3. Rediseño de `ProjectCard.jsx`

**Antes:** Card de ancho flexible en un grid de 2 columnas. Sin icono. Status en color variable con clases Tailwind.

**Ahora:** Ancho fijo 420px (`flexShrink: 0, flexGrow: 0`) diseñada para el contexto horizontal. Recibe `IconComponent` (componente React ya resuelto, no string) para evitar imports dinámicos.

```
┌──────────────────────────────┐
│  [Icono 48px + glow morado]  │
│  Título (700, 1.25rem)       │
│  ─────────────────────────   │
│  Descripción (muted, 1.7lh)  │
│  [tag] [tag] [tag]           │
│  Status ········ repo → live │
└──────────────────────────────┘
```

El glow del icono es `filter: drop-shadow(0 0 12px rgba(140,80,255,0.5))` — funciona con SVG, a diferencia de `box-shadow` que solo aplica al bounding box rectangular.

---

## 4. Resolución de iconos — ICON_MAP

Para evitar imports dinámicos (que complican el tree-shaking de Vite), los iconos se importan estáticamente y se mapean por string:

```js
// En ProjectsGrid.jsx
import { LayoutDashboard, FlaskConical, Layers } from 'lucide-react'

const ICON_MAP = { LayoutDashboard, FlaskConical, Layers }

// En render:
const IconComponent = ICON_MAP[icon]  // icon viene del data como string
<ProjectCard IconComponent={IconComponent} />
```

El campo `icon` en `projects.data.js` es un string con el nombre exacto del componente de lucide-react. ProjectCard no sabe nada de lucide — solo recibe un componente React genérico.

---

## 5. Dependencias añadidas

| Paquete | Motivo |
|---------|--------|
| `three` | Renderizado WebGL de las esferas con geometría real y bump map |
| `lucide-react` | Iconos SVG para las project cards |
