import type { CSSProperties } from 'react'
import portrait from '../assets/luciana-portrait.jpg'
import BrandIcon, { type Platform } from './BrandIcon.tsx'
import SectionEyebrow from './SectionEyebrow.tsx'
import Sparkle from './Sparkle.tsx'

// Provisional copy; replace once Luciana's biography is final.
const ABOUT = {
  eyebrow: 'Sobre mí',
  heading: ['Creatividad con intención.', 'Comunicación con propósito.'],
  paragraphs: [
    '¡Hola! Soy Luciana, comunicadora social y apasionada por transformar ideas en historias que conectan con las personas. Me interesa combinar creatividad, estrategia y contenido digital para construir marcas con una voz propia.',
    'Exploro nuevas formas de comunicar, crear contenido y desarrollar experiencias digitales que conecten con las audiencias.',
  ],
  portraitAlt: 'Retrato de Luciana Rodríguez',
}

const PLATFORMS: Platform[] = ['instagram', 'tiktok', 'youtube', 'linkedin']

function About() {
  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="about">
      <div className="about-visual">
        <div className="about-orbit">
          <div aria-hidden="true" className="about-orbit__line" />
          <img
            src={portrait}
            alt={ABOUT.portraitAlt}
            width={400}
            height={400}
            loading="lazy"
            decoding="async"
            className="about-portrait"
          />
          {/* Platforms travel along the orbit; each icon counter-rotates to stay upright. */}
          <ul aria-label="Plataformas" className="about-orbit__icons">
            {PLATFORMS.map((platform, index) => (
              <li
                key={platform}
                className="about-orbit__slot"
                style={{ '--angle': `${45 + index * 90}deg` } as CSSProperties}
              >
                <span className="about-orbit__icon">
                  <BrandIcon name={platform} className="size-[45%]" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="about-text">
        <SectionEyebrow>{ABOUT.eyebrow}</SectionEyebrow>

        <h2
          id="about-title"
          className="mt-6 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.02em]"
        >
          <span className="block">{ABOUT.heading[0]}</span>
          <span className="block italic">{ABOUT.heading[1]}</span>
        </h2>

        <div aria-hidden="true" className="mt-8 flex items-center gap-3">
          <span className="h-[1.4px] w-12 bg-(--ink)" />
          <Sparkle />
        </div>

        <div className="mt-6 max-w-[34rem] space-y-4 text-base leading-relaxed text-(--ink)/80 md:text-lg">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
