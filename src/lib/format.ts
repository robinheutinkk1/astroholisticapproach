export function formatPrice(cents: number, currency = "eur"): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export function formatDate(value: string | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

/**
 * "Today", "3 days ago", then the plain date. Used in the admin's activity
 * list, where how recent something is matters more than the exact day.
 */
export function timeAgo(value: string | null): string {
  if (!value) return "";
  const days = Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 14) return `${days} days ago`;
  return formatDate(value);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
