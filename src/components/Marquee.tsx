import type { CSSProperties, ReactNode } from 'react'

type MarqueeProps = {
  items: string[]
  /** Separator shown after every item. */
  separator: ReactNode
  /** Times the items repeat inside one group, so a group is wider than large screens. */
  repeat?: number
  /** Seconds per loop. */
  duration?: number
  /** Scroll left to right instead of right to left. */
  reverse?: boolean
  /** Optional custom rendering for each item. */
  renderItem?: (label: string, index: number) => ReactNode
}

/*
 * Continuous text marquee. The track holds two identical groups and slides by exactly
 * one group, so the loop is seamless. It is decorative (aria-hidden): callers provide
 * the same content once for screen readers.
 */
function Marquee({
  items,
  separator,
  repeat = 1,
  duration = 70,
  reverse = false,
  renderItem,
}: MarqueeProps) {
  const group = Array.from({ length: repeat }, () => items).flat()

  return (
    <div
      aria-hidden="true"
      className={`marquee__track${reverse ? ' marquee__track--reverse' : ''}`}
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="marquee__group">
          {group.map((label, index) => (
            <span key={index} className="marquee__item">
              {renderItem ? renderItem(label, index) : label}
              {separator}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Marquee
