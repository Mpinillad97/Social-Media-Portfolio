// Photo by insung yoon on Unsplash (Unsplash License): https://unsplash.com/photos/cHZ17cXZZkM
import heroVisual from '../assets/hero-visual.webp'
import Marquee from './Marquee.tsx'
import Sparkle from './Sparkle.tsx'

// Provisional copy for evaluating the composition; not approved final text.
const ROLE = 'Comunicadora social y periodista'
const HEADLINE = ['Ideas que conectan.', 'Historias que comunican.']

const SERVICES = [
  'Community Manager',
  'Social Media Manager',
  'Content Creator',
  'Estrategia Digital',
  'Creación de Contenido',
  'Comunicación Digital',
]

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero relative isolate overflow-hidden"
    >
      <div aria-hidden="true" className="hero-bg">
        <div className="hero-shape hero-shape--blush" />
        <div className="hero-shape hero-shape--sand" />
        <div className="hero-shape hero-shape--petal" />
        <div className="hero-shape hero-shape--taupe" />
      </div>

      <div className="hero-content relative mx-auto flex max-w-[1280px] flex-col justify-center px-5 pt-28 pb-12 md:px-10 md:pt-32 md:pb-20">
        {/* Central decorative photo, contained in the hero content area above the marquee. */}
        <img src={heroVisual} alt="" decoding="async" className="hero-visual" />

        <div className="hero-composition">
          <p className="hero-role text-xs tracking-[0.2em] uppercase md:text-sm">
            {ROLE}
          </p>

          <h1 id="hero-title" className="hero-title relative z-10 font-serif">
            <span className="block">Luciana</span>
            <span className="hero-title__second block text-right italic">
              Rodríguez
            </span>
          </h1>

          {/* Keeps the central gap in the mobile layout, where the photo shows through. */}
          <div aria-hidden="true" className="hero-image" />

          <p className="hero-headline font-serif text-xl leading-snug md:text-2xl">
            {HEADLINE.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Services marquee: the bottom edge of the hero. */}
      <div className="hero-marquee text-xs tracking-[0.18em] uppercase md:text-sm">
        <p className="sr-only">Servicios: {SERVICES.join(', ')}.</p>
        <Marquee items={SERVICES} repeat={3} separator={<Sparkle />} />
      </div>
    </section>
  )
}

export default Hero
