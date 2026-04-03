# Cambios pendientes — Methodology Page

> Registro de decisiones de diseño e implementación para actualizar agentes.
> Fecha: 2026-04-03

---

## 1. Centrado de elementos

**Secciones afectadas:** `IntroSection`, `TimelineSection`

**Cambio:** Centrar el contenido horizontalmente en la página.
- Layout: `flex flex-col items-center text-center` en el wrapper principal
- Contenedor de contenido: `margin: 0 auto` para centrarlo dentro del flex
- Label de sección: `justify-center` para centrar la línea decorativa + texto

---

## 2. Animación del título con SplitText

**Sección afectada:** `IntroSection` — `<h1>`

**Plugin:** `SplitText` (GSAP 3.12+ — libre, ya incluido en gsap ^3.14.2)

**Registro:** Agregar `SplitText` a `gsap.config.js` junto a los plugins existentes.

**Implementación:**
- `SplitText.create(titleRef.current, { type: 'chars', onSplit })`
- Animación por char: `from { opacity: 0, y: 30, rotateX: -60 }` → natural
- `stagger: 0.03`, `duration: 0.6`, `ease: 'power3.out'`
- Disparado por `ScrollTrigger start: 'top 75%'`
- `transformPerspective: 400` en el contenedor para que el rotateX se vea bien

**Por qué esta animación:** Los chars que "rotan hacia el plano" desde abajo refuerzan la sensación de profundidad espacial del fondo. Coherente con el tema visual.

---

## 3. Animación individual de cards del timeline

**Sección afectada:** `TimelineSection`

**Cambio:** En lugar de animar todo el bloque `.timeline-anim` como una unidad,
animar cada `TimelineStep` individualmente con stagger para que entren uno a uno.

**Implementación:**
- Agregar clase `.step-anim` a cada wrapper de `TimelineStep` en el map
- `gsap.from('.step-anim', { opacity: 0, y: 30, stagger: 0.12, duration: 0.7 })`
- Disparado con el mismo `ScrollTrigger` de la sección

---

## Estado

| Cambio                        | Estado       |
|-------------------------------|--------------|
| Centrado de elementos         | ✅ Aplicado  |
| SplitText en título           | ✅ Aplicado  |
| Animación individual de cards | ✅ Aplicado  |
