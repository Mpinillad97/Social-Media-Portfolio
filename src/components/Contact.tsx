import { CONTACT_CHANNELS, PRIMARY_CONTACT_HREF } from '../data/contact.ts'
import SectionEyebrow from './SectionEyebrow.tsx'

// Provisional copy; easy to replace later.
const CONTACT_COPY = {
  eyebrow: 'El próximo capítulo empieza aquí',
  heading: ['Las buenas conexiones', 'empiezan con una', 'conversación.'],
  text: 'Si tienes una oportunidad, una idea o un proyecto que quieras compartir, me encantará conocerte.',
  cta: 'Hablemos',
  ctaTopics: 'Oportunidades · Colaboraciones · Proyectos',
  channelsLabel: 'Canales de contacto',
  pending: 'Próximamente',
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 16"
      className="contact__arrow"
      fill="none"
    >
      <path d="M0 8h61M54 1l7 7-7 7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function Contact() {
  // Until a channel is configured, the call to action points to the channel list.
  const ctaHref = PRIMARY_CONTACT_HREF ?? '#contacto-canales'
  const ctaExternal = ctaHref.startsWith('http')

  return (
    <section id="contacto" aria-labelledby="contact-title" className="contact">
      <div className="contact__head">
        <SectionEyebrow>{CONTACT_COPY.eyebrow}</SectionEyebrow>
        <h2 id="contact-title" className="contact__title mt-7 font-serif">
          <span className="block">{CONTACT_COPY.heading[0]}</span>{' '}
          <span className="block">{CONTACT_COPY.heading[1]}</span>{' '}
          <span className="contact__title-accent block italic">
            {CONTACT_COPY.heading[2]}
          </span>
        </h2>
      </div>

      <div className="contact__details">
        <p className="max-w-[26rem] text-base leading-relaxed text-(--ink)/80 md:text-lg">
          {CONTACT_COPY.text}
        </p>

        <ul
          id="contacto-canales"
          aria-label={CONTACT_COPY.channelsLabel}
          className="contact__channels"
        >
          {CONTACT_CHANNELS.map((channel) => (
            <li key={channel.id}>
              {channel.href ? (
                <a
                  href={channel.href}
                  className="contact__channel"
                  {...(channel.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span className="contact__channel-label">
                    {channel.label}
                  </span>
                  <span className="contact__channel-value">
                    {channel.display}
                  </span>
                  <Arrow />
                </a>
              ) : (
                <div className="contact__channel" data-pending="">
                  <span className="contact__channel-label">
                    {channel.label}
                  </span>
                  <span className="contact__channel-value">
                    {CONTACT_COPY.pending}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Call to action set in a blush arch: the visual close of the page content. */}
      <div className="contact__cta-wrap">
        <a
          href={ctaHref}
          className="contact__cta"
          {...(ctaExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          <span className="contact__cta-main font-serif">
            {CONTACT_COPY.cta}
            <Arrow />
          </span>
          <span className="contact__cta-topics">{CONTACT_COPY.ctaTopics}</span>
        </a>
      </div>
    </section>
  )
}

export default Contact
