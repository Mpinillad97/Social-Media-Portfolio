// Tilted blush pill that labels each content section (e.g. "Sobre mí").
function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="inline-flex -rotate-3 items-center rounded-full border-[1.4px] border-(--ink) bg-(--marquee-bg) px-4 py-1.5 text-xs tracking-[0.2em] uppercase">
      {children}
    </p>
  )
}

export default SectionEyebrow
