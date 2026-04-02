/** @type {import('../CLAUDE.md').Project[]} */
export const projects = [
  {
    id: 'devflow-dashboard',
    title: 'DevFlow Dashboard',
    description: '[FAKE] Panel de métricas para equipos de desarrollo que centraliza PRs, deploys y alertas. Reduce el tiempo de context-switching entre herramientas.',
    tags: ['React', 'Vite', 'TailwindCSS', 'GSAP'],
    featured: true,
    status: 'completed',
    links: {
      repo: 'https://github.com/edgar/devflow-dashboard',
      live: 'https://devflow.edgar.dev',
    },
    builtWith: 'claude-code',
  },
  {
    id: 'promptlab',
    title: 'PromptLab',
    description: '[FAKE] Herramienta de experimentación para prompt engineering con historial de versiones y comparación de outputs. Pensada para uso personal y en equipo.',
    tags: ['React', 'Node.js', 'SQLite', 'TailwindCSS'],
    featured: false,
    status: 'in-progress',
    links: {
      repo: 'https://github.com/edgar/promptlab',
      live: '',
    },
    builtWith: 'cursor',
  },
  {
    id: 'landing-forge',
    title: 'Landing Forge',
    description: '[FAKE] Generador de landing pages estáticas a partir de un JSON de configuración. Exporta HTML/CSS listo para deploy sin dependencias de runtime.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
    featured: false,
    status: 'archived',
    links: {
      repo: 'https://github.com/edgar/landing-forge',
      live: '',
    },
    builtWith: 'manual',
  },
]
