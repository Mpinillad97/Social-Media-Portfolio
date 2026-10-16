import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type FocusEvent,
} from 'react'

// Provisional labels for visual evaluation only; these pages do not exist yet.
const PLACEHOLDER_LABELS = ['Proyectos', 'Sobre mí', 'Contacto']

// Scroll distance (px) over which the navbar morphs from the hero layout into the floating pill.
const MORPH_DISTANCE = 140
// Progress at which the editorial links are swapped for the menu button.
const COMPACT_AT = 0.5

const desktopQuery = '(width >= 48rem)'

function subscribeToDesktop(onChange: () => void) {
  const query = window.matchMedia(desktopQuery)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function getIsDesktop() {
  return window.matchMedia(desktopQuery).matches
}

function getProgress(scrollY: number, reduceMotion: boolean) {
  const progress = Math.min(Math.max(scrollY / MORPH_DISTANCE, 0), 1)
  // With reduced motion, switch states at the threshold instead of interpolating.
  if (reduceMotion) return progress >= COMPACT_AT ? 1 : 0
  return progress
}

function Navbar() {
  const reduceMotion = useReducedMotion() ?? false
  const isDesktop = useSyncExternalStore(subscribeToDesktop, getIsDesktop)
  const { scrollY } = useScroll()
  const [initialProgress] = useState(() =>
    getProgress(window.scrollY, reduceMotion),
  )
  const [compact, setCompact] = useState(initialProgress >= COMPACT_AT)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Scroll updates write the progress straight to the DOM, so React only re-renders when
  // the navbar crosses the compact threshold.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = getProgress(y, reduceMotion)
    headerRef.current?.style.setProperty('--nav-progress', String(next))
    const nextCompact = next >= COMPACT_AT
    if (nextCompact !== compact) {
      setCompact(nextCompact)
      if (!nextCompact) setMenuOpen(false)
    }
  })

  // On mobile the menu button is always available; on desktop only in the pill state.
  const linksAvailable = isDesktop && !compact
  const menuAvailable = !isDesktop || compact
  const showMenu = menuOpen && menuAvailable

  useEffect(() => {
    if (!showMenu) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        buttonRef.current?.focus()
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [showMenu])

  // Close the menu when keyboard focus moves outside the navigation.
  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false)
  }

  const linkClass =
    'rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ink)'

  return (
    <header
      ref={headerRef}
      className="site-nav pointer-events-none fixed inset-x-0 top-0 z-20"
      style={{ '--nav-progress': initialProgress } as CSSProperties}
    >
      <nav
        ref={navRef}
        aria-label="Principal"
        onBlur={handleBlur}
        className="site-nav__bar pointer-events-auto relative flex items-center justify-between gap-6"
      >
        <a
          href="/"
          className={`font-serif text-xl tracking-tight whitespace-nowrap md:text-2xl ${linkClass}`}
        >
          Luciana Rodríguez
        </a>

        <div className="relative flex items-center">
          <ul
            inert={!linksAvailable}
            className="site-nav__links hidden items-center gap-8 text-sm tracking-wide uppercase md:flex"
          >
            <li>
              <a href="/" aria-current="page" className={linkClass}>
                Inicio
              </a>
            </li>
            {PLACEHOLDER_LABELS.map((label) => (
              <li key={label}>
                <a>{label}</a>
              </li>
            ))}
          </ul>

          <button
            ref={buttonRef}
            type="button"
            inert={!menuAvailable}
            aria-expanded={showMenu}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
            className="site-nav__menu-button min-h-11 cursor-pointer rounded-full border-[1.4px] border-(--ink) px-5 text-sm font-medium tracking-wide uppercase hover:bg-(--checker-pink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ink) aria-expanded:bg-(--ink) aria-expanded:text-white motion-safe:transition-colors md:absolute md:right-0"
          >
            Menú
          </button>
        </div>

        <div
          id={menuId}
          hidden={!showMenu}
          className="absolute inset-x-0 top-full mt-2 rounded-3xl border-[1.4px] border-(--ink) bg-white p-2 sm:left-auto sm:w-72"
        >
          <ul>
            <li>
              <a
                href="/"
                aria-current="page"
                className="block rounded-2xl px-4 py-3 font-medium hover:bg-(--checker-pink) focus-visible:outline-2 focus-visible:outline-(--ink)"
              >
                Inicio
              </a>
            </li>
            {PLACEHOLDER_LABELS.map((label) => (
              <li key={label}>
                <a className="block px-4 py-3 opacity-60">{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
