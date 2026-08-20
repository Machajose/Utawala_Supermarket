export function StampBadge({ children, className = '' }) {
  return (
    <span
      className={`stamp inline-block bg-marigold text-market-green font-display font-700 text-sm px-3 py-1 rounded-full border-2 border-market-green shadow-sm ${className}`}
    >
      {children}
    </span>
  )
}

export function SectionEyebrow({ children }) {
  return (
    <p className="uppercase tracking-[0.2em] text-xs font-semibold text-clay mb-3">
      {children}
    </p>
  )
}