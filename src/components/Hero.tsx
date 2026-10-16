// Photo by Julia Zolotova on Unsplash (Unsplash License): https://unsplash.com/photos/amLWcqMq3mU
import heroVisual from '../assets/hero-visual.webp'

// Provisional copy for evaluating the composition; not approved final text.
const ROLE = 'Comunicadora social y periodista'
const HEADLINE = ['Ideas que conectan.', 'Historias que comunican.']

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

      <div className="relative mx-auto flex min-h-svh max-w-[1280px] flex-col justify-center px-5 pt-28 pb-12 md:px-10 md:pt-32 md:pb-20">
        {/* Central decorative photo, contained in the hero content area above the checkerboard fade. */}
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
    </section>
  )
}

export default Hero
