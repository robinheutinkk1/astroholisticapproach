import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/**
 * Renders admin-authored markdown. Content comes only from the CMS, which is
 * behind auth, so raw HTML is allowed through deliberately — it lets the
 * author embed an iframe or a custom block when a post needs one.
 */
export function renderMarkdown(source: string): string {
  return embedVideos(wrapTables(marked.parse(source ?? "", { async: false })));
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

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const VIDEO_SOURCES: { match: RegExp; embed: (id: string) => string }[] = [
  {
    // youtube.com/watch?v=ID, youtu.be/ID, and the /embed/ and /shorts/ forms.
    match: /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:[\w=&;-]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,20})/,
    embed: (id) => `https://www.youtube-nocookie.com/embed/${id}`,
  },
  {
    match: /^https?:\/\/(?:www\.|player\.)?vimeo\.com\/(?:video\/)?(\d{6,12})/,
    embed: (id) => `https://player.vimeo.com/video/${id}`,
  },
];

/**
 * Turns a video link that sits alone in its own paragraph into a player.
 *
 * Without this the author has to hand-write an <iframe> and know that the
 * link YouTube gives you (youtube.com/watch?v=…) is not the one an iframe
 * accepts (/embed/…) — a trap that silently yields an empty box. Pasting the
 * ordinary link on its own line is what someone will try first, so that is
 * what should work. A link inside a sentence is left alone: there it is meant
 * to read as a link.
 */
function embedVideos(html: string): string {
  return html.replace(/<p><a href="([^"]+)"[^>]*>([^<]*)<\/a><\/p>/g, (whole, href: string, text: string) => {
    // marked autolinks a bare URL into a link whose text is the URL itself.
    // Anything else is a deliberately worded link, so leave it as written.
    // The text is HTML-escaped and the href is not, so a link carrying a query
    // string ("&t=42s", the form YouTube hands you for a timestamp) only
    // matches once the entities are put back.
    if (decodeEntities(text).trim() !== href.trim()) return whole;

    for (const source of VIDEO_SOURCES) {
      const found = source.match.exec(href);
      if (found) {
        return `<iframe src="${source.embed(found[1])}" title="Video" loading="lazy" allowfullscreen allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
      }
    }
    return whole;
  });
}
