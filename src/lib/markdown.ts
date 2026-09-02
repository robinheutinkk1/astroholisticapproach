import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/**
 * Renders admin-authored markdown. Content comes only from the CMS, which is
 * behind auth, so raw HTML is allowed through deliberately — it lets the
 * author embed an iframe or a custom block when a post needs one.
 */
export function renderMarkdown(source: string): string {
  return marked.parse(source ?? "", { async: false });
}
