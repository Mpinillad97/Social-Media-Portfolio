import { useState, type UIEvent } from 'react'
import type {
  SocialPost as SocialPostData,
  SocialPostFormat,
} from '../data/projects.ts'
import Sparkle from './Sparkle.tsx'

const FORMAT_LABEL: Record<SocialPostFormat, string> = {
  image: 'Publicación',
  reel: 'Reel',
  carousel: 'Carrusel',
}

const COPY = {
  pending: 'Vista previa pendiente',
  pendingAccount: 'Cuenta de la marca',
  provisional: 'Provisional',
  verified: 'Cuenta verificada',
}

// Line icons suggesting the kind of content that will arrive.
function FormatIcon({ format }: { format: SocialPostFormat }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    className: 'post__format-icon',
    'aria-hidden': true,
  } as const
  if (format === 'reel') {
    return (
      <svg {...common}>
        <rect x="13" y="4" width="22" height="40" rx="4" />
        <path d="M21 18v12l10-6-10-6Z" />
      </svg>
    )
  }
  if (format === 'carousel') {
    return (
      <svg {...common}>
        <rect x="6" y="10" width="28" height="28" rx="3" />
        <path d="M38 14v24a4 4 0 0 1-4 4H14" />
        <path d="M43 18v20a8 8 0 0 1-8 8H18" opacity="0.5" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <rect x="6" y="8" width="36" height="32" rx="3" />
      <circle cx="17" cy="19" r="3.5" />
      <path d="m6 34 11-10 9 8 6-5 10 9" />
    </svg>
  )
}

// Pending state: keeps the future content's proportions, clearly marked as provisional.
function PendingMedia({ format }: { format: SocialPostFormat }) {
  return (
    <div className="post__pending">
      <FormatIcon format={format} />
      <span className="post__pending-label">
        <Sparkle className="size-2" />
        {COPY.pending}
      </span>
      <span className="post__pending-format font-serif">
        {FORMAT_LABEL[format]}
      </span>
    </div>
  )
}

function VerifiedBadge() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="post__verified"
      role="img"
      aria-label={COPY.verified}
    >
      <path
        d="M8 0.8 9.9 2.3l2.4-.2.7 2.3 2 1.4-.8 2.2.8 2.2-2 1.4-.7 2.3-2.4-.2L8 15.2l-1.9-1.5-2.4.2-.7-2.3-2-1.4.8-2.2-.8-2.2 2-1.4.7-2.3 2.4.2Z"
        fill="#3897f0"
      />
      <path
        d="m5.2 8.2 1.9 1.9 3.8-3.8"
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
      />
    </svg>
  )
}

// Decorative action row; no counts, likes or dates are shown.
function Actions() {
  const icon = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    className: 'size-6',
  } as const
  return (
    <>
      <svg {...icon}>
        <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
      </svg>
      <svg {...icon}>
        <path d="M20 12a8 8 0 1 1-3.2-6.4A8 8 0 0 1 20 12Zm0 0v8l-3-2.5" />
      </svg>
      <svg {...icon}>
        <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
      </svg>
    </>
  )
}

type SocialPostProps = {
  post: SocialPostData
  /** Accessible name for the whole post, e.g. "Publicación destacada de …". */
  label: string
}

function SocialPost({ post, label }: SocialPostProps) {
  const [slide, setSlide] = useState(0)
  const pending = post.media.length === 0
  const slides = post.format === 'carousel' ? post.media.length : 0

  function handleCarouselScroll(event: UIEvent<HTMLDivElement>) {
    const track = event.currentTarget
    setSlide(Math.round(track.scrollLeft / track.clientWidth))
  }

  return (
    <figure aria-label={label} className={`post post--${post.format}`}>
      <div className="post__header">
        {post.account?.avatar ? (
          <img src={post.account.avatar} alt="" className="post__avatar" />
        ) : (
          <span
            aria-hidden="true"
            className="post__avatar post__avatar--pending"
          >
            <Sparkle className="size-2.5" />
          </span>
        )}
        {post.account ? (
          <span className="post__account">
            {post.account.name}
            {post.account.verified && <VerifiedBadge />}
          </span>
        ) : (
          <span className="post__account post__account--pending">
            {COPY.pendingAccount}
            <span className="post__tag">{COPY.provisional}</span>
          </span>
        )}
        <span aria-hidden="true" className="post__more">
          ···
        </span>
      </div>

      <div className="post__media">
        {pending ? (
          <PendingMedia format={post.format} />
        ) : post.format === 'reel' ? (
          <video
            src={post.media[0].src}
            poster={post.media[0].poster}
            aria-label={post.media[0].alt}
            controls
            playsInline
            preload="metadata"
          />
        ) : post.format === 'carousel' ? (
          <>
            <div
              className="post__carousel"
              tabIndex={0}
              aria-label={`${FORMAT_LABEL.carousel}: ${slides} imágenes`}
              onScroll={handleCarouselScroll}
            >
              {post.media.map((item, index) => (
                <img
                  key={item.src}
                  src={item.src}
                  alt={`${item.alt} (${index + 1} de ${slides})`}
                  loading="lazy"
                />
              ))}
            </div>
            <span aria-hidden="true" className="post__counter">
              {slide + 1}/{slides}
            </span>
          </>
        ) : (
          <img src={post.media[0].src} alt={post.media[0].alt} loading="lazy" />
        )}
      </div>

      <div aria-hidden="true" className="post__footer">
        <span className="post__actions">
          <Actions />
        </span>
        {slides > 1 && (
          <span className="post__dots">
            {post.media.map((item, index) => (
              <span key={item.src} data-active={index === slide || undefined} />
            ))}
          </span>
        )}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          className="post__save size-6"
        >
          <path d="M6 3h12v18l-6-4.5L6 21V3Z" />
        </svg>
      </div>

      {post.caption && (
        <figcaption className="post__caption">
          {post.account && <strong>{post.account.name} </strong>}
          {post.caption}
        </figcaption>
      )}
    </figure>
  )
}

export default SocialPost
