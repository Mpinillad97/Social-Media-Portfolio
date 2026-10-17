import { useReducedMotion } from 'motion/react'
import { FOOTER_LINKS } from '../data/contact.ts'

// Provisional copy; easy to replace later.
const FOOTER = {
  farewell: 'Gracias por llegar hasta aquí.',
  name: ['Luciana', 'Rodríguez.'],
  tagline: 'Historias que conectan. Ideas que comunican.',
  linksLabel: 'Encuéntrame en',
  pending: 'Próximamente',
  owner: 'Luciana Rodríguez',
  signature: 'Hecho con intención',
  backToTop: 'Volver arriba',
}

function UpArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none">
      <path
        d="M8 14V2M2.5 7.5 8 2l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function Footer() {
  const reduceMotion = useReducedMotion() ?? false

  // Scroll to the top, then move keyboard focus to the main heading so it follows along.
  function backToTop() {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    // The page's main heading: the hero title at home, the project name on detail pages.
    const heading = document.querySelector('main h1')
    if (heading instanceof HTMLElement) {
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    }
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <p className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-tight italic">
            {FOOTER.farewell}
          </p>
          <button
            type="button"
            className="site-footer__top-link"
            onClick={backToTop}
          >
            <span className="site-footer__top-icon">
              <UpArrow />
            </span>
            {FOOTER.backToTop}
          </button>
        </div>

        <p className="site-footer__name font-serif">
          <span>{FOOTER.name[0]}</span>{' '}
          <span className="site-footer__name-last italic">
            {FOOTER.name[1]}
          </span>
        </p>

        <div className="site-footer__bottom">
          <p className="site-footer__tagline font-serif">{FOOTER.tagline}</p>

          <nav
            aria-labelledby="footer-links-label"
            className="site-footer__links"
          >
            <p id="footer-links-label" className="site-footer__label">
              {FOOTER.linksLabel}
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      className="site-footer__link"
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  ) : (
                    // Not configured yet: shown, but never as a link.
                    <span className="site-footer__link-pending">
                      {link.label}
                      <span className="site-footer__pending">
                        {FOOTER.pending}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__legal">
            <p>
              © {new Date().getFullYear()} {FOOTER.owner}
            </p>
            <p className="mt-1.5">
              {FOOTER.signature}{' '}
              <span aria-hidden="true" className="site-footer__heart">
                ♡
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
