# ANIMATION.md — Referencia técnica de animaciones

> Este archivo es la fuente de verdad sobre cómo funcionan las animaciones en este proyecto.
> Actualizar cuando se agreguen plugins, cambie la secuencia del Hero, o se tomen decisiones de arquitectura.

---

## 1. Stack de animaciones

### Instalado y activo

| Paquete | Versión | Rol |
|---|---|---|
| `gsap` | ^3.x | Motor principal de animaciones y timelines |
| `@gsap/react` | ^2.x | Hook `useGSAP` para integración correcta con React |
| `gsap/ScrollTrigger` | incluido en gsap | Disparo de animaciones por scroll |
| `gsap/ScrambleTextPlugin` | incluido en gsap 3.12+ | Efecto de texto scramble (máquina de escribir con ruido) |

**Todos los plugins se registran una sola vez en `src/animations/gsap.config.js`.** Ningún componente importa gsap directamente del paquete — solo desde ese archivo.

### Por qué no está Framer Motion

Framer Motion y GSAP resuelven el mismo problema pero de formas incompatibles. Mezclarlos implica duplicar la responsabilidad de animaciones, aumentar el bundle, y generar conflictos cuando ambas librerías intentan manipular el mismo nodo del DOM. En este proyecto, GSAP es la única fuente de verdad para animaciones.

### Por qué no está Lenis

Lenis (smooth scroll) requiere configuración avanzada para coexistir con ScrollTrigger: hay que sincronizar el RAF (requestAnimationFrame) de Lenis con el ticker de GSAP, y actualizar ScrollTrigger.scrollerProxy manualmente. Sin esa sincronización, los triggers se disparan en posiciones incorrectas. Se descartó para evitar complejidad innecesaria.

---

## 2. Reglas de integración GSAP + React

### Por qué `useGSAP` en lugar de `useEffect`

`useEffect` no entiende el ciclo de vida de GSAP. Si se crean animaciones dentro de un `useEffect`, el cleanup manual (`gsap.killTweensOf`, `ScrollTrigger.kill`) es propenso a errores y memory leaks — especialmente con ScrollTrigger, que crea observadores internos.

`useGSAP` de `@gsap/react` está diseñado específicamente para esto: captura todas las animaciones y ScrollTriggers creados dentro de su callback, y los destruye automáticamente cuando el componente se desmonta o las dependencias cambian. No hay cleanup manual que escribir.

### El parámetro `scope`

`scope` recibe una ref al contenedor del componente. Su función es restringir los selectores de string (`.clase`) para que solo busquen dentro de ese contenedor, no en el DOM global.

```js
useGSAP(() => {
  gsap.from('.hero-title', { y: 60, opacity: 0 }) // busca solo dentro de containerRef
}, { scope: containerRef })
```

**Es obligatorio siempre que se use un selector de string.** Sin scope, `.hero-title` matchearía el primer elemento con esa clase en toda la página, lo que puede animar el componente equivocado cuando hay múltiples instancias montadas.

Si la animación usa referencias directas de `useRef` (no strings), scope sigue siendo buena práctica pero no es estrictamente necesario.

### Cleanup

No se escribe cleanup manual. `useGSAP` revierte y destruye automáticamente todo lo creado dentro de su callback. Esto incluye tweens, timelines y ScrollTriggers.

### Qué pasa si ScrollTrigger se registra más de una vez

GSAP emite una advertencia en consola y el plugin puede comportarse de forma impredecible: los triggers pueden duplicarse, los cálculos de posición pueden desfasarse, o los callbacks `onEnter`/`onLeave` pueden dispararse dos veces. Por eso el registro está centralizado en `gsap.config.js` y ningún componente llama `gsap.registerPlugin` por su cuenta.

---

## 3. Secuencia de animación planeada para el Hero

El Hero es la primera impresión. La secuencia está diseñada para que el fondo aparezca primero y el contenido textual lo haga después, dando sensación de que el espacio "se activa" antes de presentar al usuario.

### Orden temporal

**0ms — Canvas de estrellas**
El campo de estrellas aparece inmediatamente al montar el componente. Cada estrella tiene su propio tween de `opacity` con duración aleatoria entre 0.5s y 2s (efecto twinkle continuo). El canvas se inicializa en `useGSAP` sin ScrollTrigger — es una animación de loop que corre siempre.

**200ms — Nebulosa**
Los blobs de gradiente (nebulosa) hacen fade-in con `opacity: 0 → 0.6` y un drift lento en X/Y con `repeat: -1, yoyo: true`. El movimiento es muy lento (20–40s por ciclo) para no distraer.

**600ms — Aparición del Torus**
El anillo orbital entra con una combinación de `scaleX: 0 → 1` y `opacity: 0 → 1` sobre el arco frontal. El arco trasero aparece con menor opacity desde el inicio. Una vez visible, el torus comienza su rotación continua en el eje Y (animada con GSAP, ver sección 4).

**1000ms — Contenido textual**
Después de que el torus está visible, el texto del Hero hace stagger fadeUp con `y: 60 → 0` y `opacity: 0 → 1`, con un stagger de 120ms entre elementos. El orden es: label "Hola, soy" → nombre → tagline → bio → links.

### Coordinación

La secuencia se gestiona con un único timeline de GSAP en el componente HeroSection:

```js
const tl = gsap.timeline()
tl.add(animarEstrellas(), 0)
  .add(animarNebulosa(), 0.2)
  .add(animarTorus(), 0.6)
  .add(animarTexto(), 1.0)
```

Esto garantiza que los tiempos sean relativos al inicio del timeline y no dependan de `setTimeout`.

---

## 4. Concepto visual del Torus

### Por qué `border-radius: 50%` no funciona

Un `div` circular con `border-radius: 50%` y `border` es geométricamente correcto pero visualmente plano: el anillo tiene el mismo grosor y brillo en todos sus puntos. Un toro real en perspectiva tiene la parte que viene hacia el espectador más brillante y cercana, y la parte que va hacia atrás más tenue y lejana. El CSS puro no puede simular eso.

### La solución: SVG con dos arcos

El torus se construye con un SVG que contiene dos arcos independientes dibujados con `<path>`:

- **Arco trasero (behind):** va de 180° a 360° (la mitad inferior/posterior). Se dibuja primero, con `stroke-opacity` baja (~0.3) y color grisáceo. Representa la parte del anillo que está detrás del centro visual.
- **Arco frontal (front):** va de 0° a 180° (la mitad superior/anterior). Se dibuja encima, con `stroke-opacity` alta (~0.9) y color más claro o con gradiente. Representa la parte que viene hacia el espectador.

El resultado es un anillo que parece tener profundidad: el frente brilla, el fondo se desvanece.

### El `perspective` del contenedor padre

El contenedor del Hero tiene `perspective: 800px` en CSS. Esto hace que las transformaciones 3D de los hijos (como `rotateY`) se vean con perspectiva real en lugar de proyección ortogonal. Sin `perspective`, una rotación en Y se vería como un escalado en X — sin sensación de profundidad.

### Qué eje anima GSAP y por qué

GSAP anima `rotationY` del SVG contenedor (o del grupo SVG si el SVG es estático). Rotar en Y simula que el anillo gira sobre su eje vertical, como un planeta visto desde el lado. La rotación es continua: `repeat: -1, duration: 8, ease: 'none'`.

Se usa Y y no X porque Y produce la ilusión de órbita más reconocible visualmente. X rotaría el anillo como una rueda de bicicleta, lo cual no conecta con la metáfora de órbita.

---

## 5. Performance y consideraciones

### Por qué el canvas usa `devicePixelRatio`

En pantallas retina (DPR > 1), un canvas con `width: 800` y `style.width: 800px` se ve borroso porque tiene menos píxeles que los que la pantalla puede mostrar. Al multiplicar las dimensiones del canvas por `devicePixelRatio` y escalar el contexto 2D con `ctx.scale(dpr, dpr)`, se dibuja en la resolución nativa de la pantalla. Costo: más píxeles a renderizar. Beneficio: las estrellas se ven nítidas.

### Cuándo llamar `ScrollTrigger.refresh()`

ScrollTrigger calcula las posiciones de los triggers en el momento de creación. Si después del primer render cambia la altura del documento (imágenes lazy que cargan, acordeones que se abren, fuentes que producen reflow), los triggers quedan desfasados. Se debe llamar `ScrollTrigger.refresh()` después de:

- Que todas las imágenes del viewport hayan cargado
- Que se abra o cierre cualquier elemento que cambie el layout
- Después de un cambio de ruta (React Router) si el layout nuevo tiene altura diferente

### Qué devuelve el cleanup de `useGSAP` y por qué es suficiente

`useGSAP` internamente llama `gsap.context()`, que registra todos los tweens, timelines y ScrollTriggers creados en su scope. Al desmontar el componente, llama `context.revert()`, que mata todos esos objetos y revierte los estilos a su estado original. No hay que escribir `return () => { ... }` manualmente — el hook lo hace por nosotros.

---

## 6. Estado actual

### Design System (`src/styles/globals.css`)
- [x] Google Fonts importadas: Space Grotesk, Inter, JetBrains Mono
- [x] Tokens de fuente: `--font-display`, `--font-sans`, `--font-mono`
- [x] Tokens de color: `background`, `surface`, `border`, `foreground`, `muted`, `dim`, `accent`
- [x] Resets: box-sizing, html, body, ::selection, scrollbar custom
- [x] Utilidades: `.text-gradient-amber`, `.glow-amber`, `.glow-amber-text`, `.text-hero`, `.text-title`

### gsap.config.js
- [x] ScrollTrigger registrado
- [x] ScrambleTextPlugin registrado
- [x] Defaults globales: `ease: 'power3.out'`, `duration: 0.8`
- [x] `ScrollTrigger.config({ ignoreMobileResize: true })`

### Animaciones del Hero
- [x] Canvas de estrellas con twinkle individual (200 estrellas, proxy object, devicePixelRatio)
- [x] Nebulosa con 4 blobs de gradiente y drift lento (yoyo, sine.inOut, 12–20s)
- [x] Torus SVG — 3 anillos con clipPath frente/trasero, glow SVG filter, gradiente ámbar
- [x] Rotaciones independientes: wrap 30s, exterior 45s anti-horario, interior 60s horario
- [x] Entrada de anillos: scale 0.88→1 + opacity 0→1, stagger 0.25s, 2.8s
- [x] Timeline del contenido textual con `delay: 1` (el torus aparece primero)
- [x] ScrambleText en h1: chars caóticos, revealDelay 0.3, speed 0.4, newClass `text-dim`
- [x] Tagline, bio, badges (stagger 0.07s), CTAs (stagger 0.1s) — todos con `fromTo` explícito
- [x] Overlaps negativos en timeline para secuencia fluida

### Animaciones por sección (scroll-triggered)
- [ ] HeroSection — entrada de texto
- [ ] AboutSection — fadeUp en bio y skills
- [ ] ProjectsSection — stagger en ProjectCards
- [ ] JourneySection — slideInLeft en TimelineSteps
- [ ] ContactSection — fadeUp en contenido

### Páginas adicionales
- [ ] Projects — stagger en grid completo
- [ ] Methodology — slideInLeft en timeline completo
