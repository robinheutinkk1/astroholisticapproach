import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/**
 * Renders admin-authored markdown. Content comes only from the CMS, which is
 * behind auth, so raw HTML is allowed through deliberately — it lets the
 * author embed an iframe or a custom block when a post needs one.
 */
export function renderMarkdown(source: string): string {
  return wrapTables(marked.parse(source ?? "", { async: false }));
}

/**
 * A table is the one thing markdown can produce that has no sensible narrow
 * form — it cannot reflow the way a paragraph does. Wrapping each one in its
 * own scroll container lets a phone swipe the table sideways instead of
 * dragging the whole page with it. Tables cannot nest, so a non-greedy match
 * per table is safe.
 */
function wrapTables(html: string): string {
  return html.replace(
    /<table[\s\S]*?<\/table>/g,
    (table) => `<div class="table-scroll">${table}</div>`,
  );
}
