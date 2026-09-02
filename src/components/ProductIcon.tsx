/**
 * The drawn marks the original site used in place of product photography.
 * A product with an `image_url` shows that instead; anything else falls back
 * to the mark named by its `icon` column.
 */
const icons: Record<string, React.ReactNode> = {
  chart: (
    <>
      <circle cx="50" cy="50" r="35" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="20" stroke="#D4AF37" strokeWidth="0.6" opacity="0.6" />
      <circle cx="50" cy="50" r="9" fill="#D4AF37" opacity="0.4" />
      <circle cx="50" cy="15" r="2" fill="#D4AF37" />
    </>
  ),
  star: (
    <path
      d="M50 20 L60 45 L85 50 L66 67 L72 90 L50 78 L28 90 L34 67 L15 50 L40 45 Z"
      fill="#D4AF37"
      opacity="0.3"
      stroke="#D4AF37"
      strokeWidth="0.8"
    />
  ),
  book: (
    <>
      <rect x="22" y="15" width="56" height="70" rx="3" stroke="#D4AF37" strokeWidth="0.8" />
      <line x1="32" y1="32" x2="68" y2="32" stroke="#D4AF37" strokeWidth="0.6" />
      <line x1="32" y1="42" x2="68" y2="42" stroke="#D4AF37" strokeWidth="0.6" />
    </>
  ),
  circle: (
    <>
      <circle cx="50" cy="50" r="30" fill="#D4AF37" opacity="0.3" />
      <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="14" fill="#D4AF37" opacity="0.5" />
    </>
  ),
  heart: (
    <>
      <circle cx="50" cy="50" r="35" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="50" cy="40" r="6" fill="#D4AF37" />
      <path d="M44 50 L56 50 L50 65 Z" fill="#D4AF37" opacity="0.6" />
    </>
  ),
  beads: (
    <>
      <circle cx="35" cy="50" r="6" fill="#D4AF37" />
      <circle cx="50" cy="50" r="8" fill="#D4AF37" opacity="0.7" />
      <circle cx="65" cy="50" r="5" fill="#D4AF37" opacity="0.5" />
    </>
  ),
  gem: (
    <polygon points="50,15 75,40 50,85 25,40" stroke="#D4AF37" strokeWidth="0.8" fill="#D4AF37" fillOpacity="0.25" />
  ),
  triple: (
    <>
      <polygon points="30,30 50,15 70,30 50,55" fill="#D4AF37" opacity="0.4" stroke="#D4AF37" strokeWidth="0.6" />
      <polygon points="20,55 40,40 40,75 20,80" stroke="#D4AF37" strokeWidth="0.6" fill="#D4AF37" fillOpacity="0.2" />
      <polygon points="60,40 80,55 80,80 60,75" stroke="#D4AF37" strokeWidth="0.6" fill="#D4AF37" fillOpacity="0.2" />
    </>
  ),
  leaf: (
    <>
      <path
        d="M50 15 C30 30 30 60 50 85 C70 60 70 30 50 15 Z"
        stroke="#D4AF37"
        strokeWidth="0.8"
        fill="#D4AF37"
        fillOpacity="0.2"
      />
      <line x1="50" y1="20" x2="50" y2="80" stroke="#D4AF37" strokeWidth="0.5" />
    </>
  ),
};

export function ProductIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {icons[name] ?? icons.star}
    </svg>
  );
}
