import Link from "next/link";

export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</section>;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">{eyebrow}</p>
      )}
      <h1 className="mt-3 font-display text-4xl leading-tight text-mist-100 sm:text-5xl">{title}</h1>
      {intro && <p className="mt-5 text-base leading-relaxed text-mist-300">{intro}</p>}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-gold-400 text-night-950 hover:bg-gold-300"
      : "border border-white/20 text-mist-200 hover:border-gold-400 hover:text-gold-300";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-night-900/50 p-6 transition-colors hover:border-gold-500/40 ${className}`}
    >
      {children}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center">
      <p className="text-mist-200">{title}</p>
      {hint && <p className="mt-2 text-sm text-mist-500">{hint}</p>}
    </div>
  );
}
