/**
 * Renders a short piece of authored markup — the `<span class="accent">`
 * fragments inside headings and the `<strong>`/`<a>` inside body copy that the
 * original site used. The strings come from this repository, never from user
 * input.
 */
export function Rich({ html, as: Tag = "span", className }: { html: string; as?: React.ElementType; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
