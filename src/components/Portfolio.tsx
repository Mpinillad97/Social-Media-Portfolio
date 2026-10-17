import { useState } from 'react'
import { PROJECTS, type Project } from '../data/projects.ts'
import SectionEyebrow from './SectionEyebrow.tsx'

// Provisional copy; can be refined later.
const PORTFOLIO = {
  eyebrow: 'Portafolio',
  heading: 'Ideas que se convierten en historias.',
  intro:
    'Una selección de proyectos en los que la creatividad, la comunicación y la estrategia digital se encuentran.',
}

// Folder artwork: back with tab, two preview sheets, and the front with the project name.
function FolderArt({ project }: { project: Project }) {
  return (
    <>
      <span aria-hidden="true" className="folder__tab" />
      <span aria-hidden="true" className="folder__back" />
      {project.previews.map((preview, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={`folder__sheet folder__sheet--${index + 1}`}
        >
          <img src={preview.src} alt="" loading="lazy" decoding="async" />
        </span>
      ))}
      <span className="folder__front">
        <span className="folder__label">{project.name}</span>
      </span>
    </>
  )
}

function Portfolio() {
  // Touch and keyboard users open one folder at a time; desktop also opens on hover.
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  return (
    <section
      id="portafolio"
      aria-labelledby="portfolio-title"
      className="portfolio"
    >
      <div className="mx-auto max-w-[40rem] text-center">
        <SectionEyebrow>{PORTFOLIO.eyebrow}</SectionEyebrow>
        <h2
          id="portfolio-title"
          className="mt-6 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]"
        >
          {PORTFOLIO.heading}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-(--ink)/80 md:text-lg">
          {PORTFOLIO.intro}
        </p>
      </div>

      <ul className="portfolio-grid">
        {PROJECTS.map((project) => (
          <li key={project.slug} className="portfolio-item">
            {project.href ? (
              <a href={project.href} className="folder">
                <FolderArt project={project} />
              </a>
            ) : (
              // No detail page yet: the folder opens its preview instead of linking.
              <button
                type="button"
                className="folder"
                aria-pressed={openSlug === project.slug}
                onClick={() =>
                  setOpenSlug((open) =>
                    open === project.slug ? null : project.slug,
                  )
                }
              >
                <FolderArt project={project} />
                <span className="sr-only">: mostrar vista previa</span>
              </button>
            )}
            <p className="mt-5 text-center text-xs tracking-[0.18em] text-(--ink)/65 uppercase">
              {project.category}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Portfolio
