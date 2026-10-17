import SectionEyebrow from './SectionEyebrow.tsx'
import Sparkle from './Sparkle.tsx'

// Provisional copy, based on Luciana's CV; easy to replace later.
const WHAT_I_DO = {
  eyebrow: 'Lo que hago',
  heading:
    'Comunicación, creatividad y estrategia para contar historias que conectan.',
  intro:
    'Cada marca tiene algo que contar. Mi enfoque combina planificación, creación de contenido y comunicación digital para construir mensajes coherentes y conectar con las audiencias.',
  areas: [
    {
      title: 'Estrategia digital y planificación de contenidos',
      description:
        'Construir una presencia digital coherente empieza por entender qué comunicar, a quién dirigirse y cómo organizar las ideas para conectar con una audiencia.',
      capabilities: [
        'Estrategia de contenidos.',
        'Pilares de comunicación.',
        'Calendarios editoriales.',
        'Planificación de parrillas de contenido.',
      ],
    },
    {
      title: 'Creación de contenido y copywriting',
      description:
        'Transformar ideas en contenido atractivo, combinando redacción, creatividad y recursos visuales para comunicar mensajes con claridad y personalidad.',
      capabilities: [
        'Redacción creativa y captions.',
        'Conceptualización de publicaciones.',
        'Creación de piezas para redes sociales.',
        'Edición y desarrollo de piezas con Canva y CapCut.',
      ],
    },
    {
      title: 'Gestión de redes sociales y comunidad',
      description:
        'Mantener una presencia digital activa y consistente, cuidando tanto la planificación de las publicaciones como la relación con las personas que forman parte de cada comunidad.',
      capabilities: [
        'Gestión de redes sociales.',
        'Organización y programación de publicaciones.',
        'Community management.',
        'Auditorías de redes sociales.',
        'Análisis de métricas e informes mensuales de rendimiento.',
      ],
    },
    {
      title: 'Comunicación de marca y campañas',
      description:
        'Desarrollar mensajes y acciones de comunicación que ayuden a las marcas y organizaciones a expresar sus ideas de forma clara, coherente y relevante para sus públicos.',
      capabilities: [
        'Comunicación institucional.',
        'Redacción de artículos y contenidos informativos.',
        'Apoyo en campañas de comunicación digital.',
        'Estrategias de ventas impulsadas por influencers.',
      ],
    },
  ],
}

function WhatIDo() {
  return (
    <section
      id="lo-que-hago"
      aria-labelledby="what-i-do-title"
      className="what-i-do"
    >
      <div className="what-i-do__intro">
        <div>
          <SectionEyebrow>{WHAT_I_DO.eyebrow}</SectionEyebrow>
          <h2
            id="what-i-do-title"
            className="mt-6 font-serif text-[clamp(2rem,3.6vw,2.875rem)] leading-[1.08] tracking-[-0.02em]"
          >
            {WHAT_I_DO.heading}
          </h2>
        </div>
        <p className="text-base leading-relaxed text-(--ink)/80 md:text-lg">
          {WHAT_I_DO.intro}
        </p>
      </div>

      <ol className="what-i-do__areas">
        {WHAT_I_DO.areas.map((area, index) => (
          <li key={area.title} className="what-i-do__area">
            <span aria-hidden="true" className="what-i-do__number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-5 font-serif text-[1.625rem] leading-tight tracking-[-0.01em]">
              {area.title}
            </h3>
            <p className="mt-3 leading-relaxed text-(--ink)/80">
              {area.description}
            </p>
            <ul className="mt-5 space-y-2.5">
              {area.capabilities.map((capability) => (
                <li key={capability} className="flex items-baseline gap-3">
                  <Sparkle className="size-2 translate-y-[-0.1em]" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default WhatIDo
