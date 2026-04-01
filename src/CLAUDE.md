## Data Layer

### Ubicación y regla de acceso
- Todos los datos del sitio viven en src/data/
- Los componentes importan SOLO desde src/data/index.js, nunca directamente de un archivo individual
- Ningún componente define datos inline salvo labels de UI muy cortos (ej: texto de un botón)

### Schemas JSDoc

#### Project
/**
 * @typedef {Object} Project
 * @property {string} id - slug único kebab-case
 * @property {string} title
 * @property {string} description - máximo 2 oraciones
 * @property {string[]} tags - tecnologías usadas
 * @property {boolean} featured - si aparece en Home preview
 * @property {'completed'|'in-progress'|'archived'} status
 * @property {{repo: string, live: string}} links
 * @property {'cursor'|'claude-code'|'manual'|'mixed'} builtWith
 */

#### JourneyStep
/**
 * @typedef {Object} JourneyStep
 * @property {string} id - slug kebab-case
 * @property {string} period - ej: '2022 Q4'
 * @property {string} tool - nombre de la herramienta
 * @property {'Descubrimiento'|'Exploración'|'Dominio'|'Transición'} phase
 * @property {string} description
 * @property {string} milestone - el insight o logro clave de esa etapa
 * @property {string} next - id del siguiente step (null si es el último)
 */

#### Skill
/**
 * @typedef {Object} SkillCategory
 * @property {string} category
 * @property {string[]} items
 */

### Regla de idiomas
Rutas, nombres de archivos y variables siempre en inglés. El contenido visible (labels, descripciones, textos) en español.

### Regla de datos falsos
Mientras no haya datos reales, usar el prefijo [FAKE] en el campo description
de cada registro. Esto permite encontrarlos con un grep cuando llegue el momento de reemplazar.
