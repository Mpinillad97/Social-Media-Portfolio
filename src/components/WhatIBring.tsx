import Sparkle from './Sparkle.tsx'

// Provisional copy; easy to replace later.
const WHAT_I_BRING = {
  label: 'Lo que aporto',
  // Headline lines; the last one is set large and italic.
  headline: ['No se trata solo', 'de comunicar.', 'Se trata de', 'conectar.'],
  featuredWord: 'Creatividad',
  strengths: [
    {
      title: 'Creatividad con intención',
      description:
        'Transformar ideas en contenidos y mensajes creativos que respondan a un propósito de comunicación.',
    },
    {
      title: 'Comunicación que conecta',
      description:
        'Encontrar las palabras y los formatos adecuados para transmitir ideas de manera clara, cercana y coherente con cada marca.',
    },
    {
      title: 'Pensamiento estratégico',
      description:
        'Entender que detrás de cada contenido debe existir una intención, una audiencia y un objetivo de comunicación.',
    },
    {
      title: 'Organización y colaboración',
      description:
        'Planificar contenidos, organizar tareas y trabajar en equipo para llevar las ideas de la planificación a la ejecución.',
    },
  ],
}

// Decorative fine-line rings with a blush disc, echoing the About orbit.
function Rings() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="contribution__rings"
      fill="none"
    >
      <circle
        cx="100"
        cy="100"
        r="98"
        stroke="currentColor"
        strokeOpacity="0.18"
      />
      <circle
        cx="100"
        cy="100"
        r="70"
        stroke="currentColor"
        strokeOpacity="0.18"
      />
      <circle
        cx="100"
        cy="100"
        r="40"
        fill="var(--marquee-bg)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M100 88c.9 6 5.2 10.3 11.2 11.2-6 .9-10.3 5.2-11.2 11.2-.9-6-5.2-10.3-11.2-11.2 6-.9 10.3-5.2 11.2-11.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WhatIBring() {
  const [line1, line2, line3, line4] = WHAT_I_BRING.headline

  return (
    <section
      id="lo-que-aporto"
      aria-labelledby="what-i-bring-title"
      className="contribution"
    >
      <div className="contribution__label">
        <p className="text-xs tracking-[0.24em] uppercase">
          {WHAT_I_BRING.label}
        </p>
        <span aria-hidden="true" className="contribution__label-line" />
        <Sparkle />
      </div>

      <div className="contribution__body">
        <h2
          id="what-i-bring-title"
          className="contribution__headline font-serif"
        >
          {/* Spaces between the lines keep the heading readable as one sentence. */}
          <span className="block">{line1}</span>{' '}
          <span className="block">{line2}</span>{' '}
          <span className="contribution__headline-indent block">{line3}</span>{' '}
          <span className="contribution__headline-accent block italic">
            {line4}
          </span>
        </h2>

        <Rings />

        {/* Featured word, drawn as outlined type that always fits its column. */}
        <svg
          aria-hidden="true"
          viewBox="0 14 1000 104"
          className="contribution__word"
        >
          {/* Slightly smaller type than the box, so fitting adds letter spacing. */}
          <text
            x="0"
            y="108"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-serif"
            fontSize="116"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          >
            {WHAT_I_BRING.featuredWord.toUpperCase()}
          </text>
        </svg>

        <ol className="contribution__strengths">
          {WHAT_I_BRING.strengths.map((strength, index) => (
            <li
              key={strength.title}
              className={`contribution__strength contribution__strength--${index + 1}`}
            >
              <span aria-hidden="true" className="contribution__number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="contribution__title font-serif">
                {strength.title}
              </h3>
              <p className="mt-3 leading-relaxed text-(--ink)/80">
                {strength.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default WhatIBring
