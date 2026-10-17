// Small four-point star used as an editorial separator.
function Sparkle({ className = 'size-2.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className={`shrink-0 ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5 0c.4 2.6 2.4 4.6 5 5-2.6.4-4.6 2.4-5 5-.4-2.6-2.4-4.6-5-5 2.6-.4 4.6-2.4 5-5Z" />
    </svg>
  )
}

export default Sparkle
