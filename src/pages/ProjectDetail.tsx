import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import SectionEyebrow from '../components/SectionEyebrow.tsx'
import SocialPost from '../components/SocialPost.tsx'
import Sparkle from '../components/Sparkle.tsx'
import { findProject } from '../data/projects.ts'

// Provisional copy; easy to replace later.
const COPY = {
  eyebrow: 'Caso de estudio',
  back: 'Volver al portafolio',
  pendingCase: 'El caso de estudio completo se publicará próximamente.',
  notFoundTitle: 'Proyecto no encontrado',
  notFoundText: 'Este proyecto no existe o ya no está disponible.',
  site: 'Luciana Rodríguez',
}

// Project detail template: one layout for every project, fed by projects.ts.
function ProjectDetail() {
  const { slug } = useParams()
  const project = findProject(slug)

  useEffect(() => {
    const previous = document.title
    document.title = `${project ? project.name : COPY.notFoundTitle} · ${COPY.site}`
    return () => {
      document.title = previous
    }
  }, [project])

  return (
    <main className="project-page">
      <div className="content-panel">
        <div className="project-detail">
          <Link to="/#portafolio" className="project-detail__back">
            <span aria-hidden="true">←</span> {COPY.back}
          </Link>

          {project ? (
            <div className="project-detail__grid">
              <div className="project-detail__info">
                <SectionEyebrow>{COPY.eyebrow}</SectionEyebrow>
                <h1 className="mt-6 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.02em]">
                  {project.name}
                </h1>
                <p className="mt-5 text-xs tracking-[0.2em] text-(--ink)/70 uppercase">
                  {project.category}
                </p>
                {project.description && (
                  <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-(--ink)/80">
                    {project.description}
                  </p>
                )}
                <p className="project-detail__pending">
                  <Sparkle />
                  {COPY.pendingCase}
                </p>
              </div>

              <div className="project-detail__posts">
                {project.posts.map((post) => (
                  <SocialPost
                    key={post.id}
                    post={post}
                    label={`Publicación destacada de ${project.name}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="project-detail__info">
              <h1 className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-tight">
                {COPY.notFoundTitle}
              </h1>
              <p className="mt-4 text-(--ink)/80">{COPY.notFoundText}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ProjectDetail
