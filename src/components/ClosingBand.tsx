import Marquee from './Marquee.tsx'

// Provisional copy; easy to replace later.
const CLOSING_BAND = {
  statement: ['Las buenas ideas', 'conectan personas.'],
  complement:
    'Y toda gran conversación puede ser el comienzo de algo interesante.',
  words: ['Ideas', 'Historias', 'Estrategia', 'Conexiones', 'Creatividad'],
}

// Opens the closing stage: a statement and a slow word band that bridges into FAQ and contact.
function ClosingBand() {
  return (
    <div className="closing-band">
      <div className="closing-band__statement">
        <p className="font-serif text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.02em]">
          {CLOSING_BAND.statement[0]}{' '}
          <span className="italic">{CLOSING_BAND.statement[1]}</span>
        </p>
        <p className="mx-auto mt-5 max-w-[30rem] text-base leading-relaxed text-(--ink)/75 md:text-lg">
          {CLOSING_BAND.complement}
        </p>
      </div>

      <div className="closing-band__marquee">
        <p className="sr-only">{CLOSING_BAND.words.join(', ')}.</p>
        <Marquee
          items={CLOSING_BAND.words}
          repeat={4}
          duration={60}
          reverse
          separator={<span className="closing-band__dot" />}
          renderItem={(word, index) => (
            <span className={index % 2 ? 'italic' : undefined}>{word}</span>
          )}
        />
      </div>
    </div>
  )
}

export default ClosingBand
