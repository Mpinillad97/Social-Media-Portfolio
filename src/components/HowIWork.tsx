import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useRef } from 'react'
import SectionEyebrow from './SectionEyebrow.tsx'
import Sparkle from './Sparkle.tsx'

// Provisional copy; easy to replace later.
const HOW_I_WORK = {
  eyebrow: 'Mi forma de trabajar',
  heading: ['De la idea a la', 'conexión.'],
  intro:
    'Cada proyecto tiene su propio camino. Mi proceso combina estrategia, creatividad y organización para transformar ideas en comunicación con intención.',
  stages: [
    {
      phase: 'Comprender',
      title: 'Primero, escuchar.',
      description:
        'Conocer la marca, sus objetivos y las personas con las que quiere conectar antes de definir qué comunicar.',
    },
    {
      phase: 'Planificar',
      title: 'Después, dar dirección.',
      description:
        'Organizar ideas, definir mensajes y construir un calendario de contenidos coherente con los objetivos de comunicación.',
    },
    {
      phase: 'Crear',
      title: 'Convertir ideas en historias.',
      description:
        'Dar forma a la estrategia mediante escritura creativa, copywriting y contenido para plataformas digitales.',
    },
    {
      phase: 'Evolucionar',
      title: 'Medir para mejorar.',
      description:
        'Revisar métricas, analizar el desempeño e identificar oportunidades para mejorar la comunicación.',
    },
  ],
  closing: 'Conexión',
}

function HowIWork() {
  const reduceMotion = useReducedMotion() ?? false
  const timelineRef = useRef<HTMLDivElement>(null)

  // The spine draws itself as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    // Completes when the timeline's end reaches the bottom of the screen; this is
    // near the end of the page, so a higher end point would never be reached.
    offset: ['start 80%', 'end end'],
  })

  // Written straight to the DOM (like the navbar), so scrolling doesn't re-render React.
  const setProgress = (value: number) =>
    timelineRef.current?.style.setProperty('--progress', String(value))

  useMotionValueEvent(scrollYProgress, 'change', setProgress)

  useEffect(() => {
    setProgress(scrollYProgress.get())
  })

  // Each stage fades in once, the first time it enters the viewport.
  useEffect(() => {
    if (reduceMotion) return
    const stages = timelineRef.current?.querySelectorAll('.process__stage')
    if (!stages) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-visible', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.2 },
    )
    stages.forEach((stage) => observer.observe(stage))
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <section
      id="mi-forma-de-trabajar"
      aria-labelledby="how-i-work-title"
      className="process"
      data-animate={reduceMotion ? undefined : ''}
    >
      <header className="process__header">
        <SectionEyebrow>{HOW_I_WORK.eyebrow}</SectionEyebrow>
        <h2
          id="how-i-work-title"
          className="mt-6 font-serif text-[clamp(2.5rem,6vw,4.25rem)] leading-[1] tracking-[-0.02em]"
        >
          {HOW_I_WORK.heading[0]}{' '}
          <span className="italic">{HOW_I_WORK.heading[1]}</span>
        </h2>
        <p className="mt-6 max-w-[30rem] text-base leading-relaxed text-(--ink)/80 md:text-lg">
          {HOW_I_WORK.intro}
        </p>
      </header>

      <div ref={timelineRef} className="process__timeline">
        <div aria-hidden="true" className="process__spine">
          <span className="process__spine-progress" />
        </div>

        <ol className="process__stages">
          {HOW_I_WORK.stages.map((stage, index) => (
            <li
              key={stage.phase}
              className={`process__stage process__stage--${index + 1}`}
            >
              <span aria-hidden="true" className="process__node" />
              <span aria-hidden="true" className="process__number font-serif">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="process__body">
                <p className="process__phase">
                  <span className="sr-only">Etapa {index + 1}: </span>
                  {stage.phase}
                </p>
                <h3 className="process__title font-serif">{stage.title}</h3>
                <p className="process__text">{stage.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* The spine ends in a disc: the connection the whole process leads to. */}
        <div aria-hidden="true" className="process__end">
          <span className="process__end-disc">
            <Sparkle className="size-3" />
          </span>
          <span className="process__end-label">{HOW_I_WORK.closing}</span>
        </div>
      </div>
    </section>
  )
}

export default HowIWork
