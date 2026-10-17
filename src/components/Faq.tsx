import { useId, useState } from 'react'
import SectionEyebrow from './SectionEyebrow.tsx'
import Sparkle from './Sparkle.tsx'

// Provisional copy; easy to replace later.
const FAQ = {
  eyebrow: 'Preguntas frecuentes',
  heading: ['Unas cuantas cosas que', 'quizás quieras saber.'],
  intro: 'Antes de empezar, resolvamos algunas dudas.',
  questions: [
    {
      question: '¿Qué tipo de proyectos puedo encontrar en tu portafolio?',
      answer:
        'Una selección de proyectos relacionados con gestión de redes sociales, creación de contenido y comunicación digital. Cada proyecto muestra el trabajo y el contexto que se pueden documentar.',
    },
    {
      question: '¿Qué servicios ofreces?',
      answer:
        'Gestión de redes sociales, planificación de contenidos, copywriting, creación de contenido digital, auditorías, análisis de métricas y elaboración de informes de desempeño.',
    },
    {
      question: '¿Con qué herramientas trabajas?',
      answer:
        'Utilizo herramientas como Canva y CapCut para apoyar la creación de contenido, además de las plataformas y herramientas de gestión de redes sociales que requiere cada proyecto.',
    },
    {
      question: '¿Estás abierta a nuevas oportunidades?',
      answer:
        'Sí. Estoy abierta a conversar sobre oportunidades laborales, colaboraciones y proyectos relacionados con comunicación, contenido y estrategia digital.',
    },
  ],
}

// An editorial "archive": index-card entries with tabs; one answer open at a time.
function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="faq-title"
      className="faq"
    >
      <div className="faq__intro">
        <SectionEyebrow>{FAQ.eyebrow}</SectionEyebrow>
        <h2
          id="faq-title"
          className="mt-6 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.04] tracking-[-0.02em]"
        >
          {FAQ.heading[0]} <span className="italic">{FAQ.heading[1]}</span>
        </h2>
        <p className="mt-5 max-w-[24rem] text-base leading-relaxed text-(--ink)/80 md:text-lg">
          {FAQ.intro}
        </p>
        <p aria-hidden="true" className="faq__count">
          <Sparkle />
          Archivo · {String(FAQ.questions.length).padStart(2, '0')} preguntas
        </p>
      </div>

      <div className="faq__list">
        {FAQ.questions.map((item, index) => {
          const open = openIndex === index
          const questionId = `${baseId}-q${index}`
          const answerId = `${baseId}-a${index}`
          return (
            <div
              key={item.question}
              className="faq__item"
              data-open={open || undefined}
            >
              <h3>
                <button
                  id={questionId}
                  type="button"
                  className="faq__question"
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span aria-hidden="true" className="faq__tab">
                    Nº {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="faq__text font-serif">{item.question}</span>
                  <span aria-hidden="true" className="faq__icon" />
                </button>
              </h3>
              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                className="faq__answer"
                inert={!open}
              >
                <div className="faq__answer-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Faq
