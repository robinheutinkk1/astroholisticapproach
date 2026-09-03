/**
 * The article editor's content model.
 *
 * The database still stores markdown — the public site, the renderer and every
 * published post are untouched — but the CMS no longer asks anyone to write it.
 * A post is edited as a list of blocks, each one a labelled box, and the two
 * functions here convert between that list and the markdown column.
 *
 * The rule that matters: fromMarkdown(toMarkdown(blocks)) must give the blocks
 * back, and nothing the author wrote may ever be dropped. Anything this model
 * does not recognise — a table, an embed, hand-written HTML — survives as a
 * `markdown` block rather than being thrown away.
 */

export type Block =
  | { id: string; type: "heading"; text: string }
  | { id: string; type: "subheading"; text: string }
  | { id: string; type: "text"; text: string }
  | { id: string; type: "bullets"; items: string[] }
  | { id: string; type: "numbers"; items: string[] }
  | { id: string; type: "quote"; text: string }
  | { id: string; type: "image"; url: string; alt: string }
  | { id: string; type: "video"; url: string }
  | { id: string; type: "markdown"; text: string };

export type BlockType = Block["type"];

export const BLOCK_LABELS: Record<BlockType, string> = {
  heading: "Heading",
  subheading: "Smaller heading",
  text: "Text",
  bullets: "Bullet list",
  numbers: "Numbered list",
  quote: "Quote",
  image: "Image",
  video: "Video",
  markdown: "Advanced",
};

/** The blocks offered on the "add" row, in the order they are offered. */
export const ADDABLE: BlockType[] = [
  "text",
  "heading",
  "subheading",
  "bullets",
  "numbers",
  "quote",
  "image",
  "video",
];

let counter = 0;
/** Ids exist only to key React rows; they are never stored. */
export function newId(): string {
  counter += 1;
  return `b${counter}-${Math.random().toString(36).slice(2, 8)}`;
}

export function emptyBlock(type: BlockType): Block {
  switch (type) {
    case "bullets":
    case "numbers":
      return { id: newId(), type, items: [""] };
    case "image":
      return { id: newId(), type, url: "", alt: "" };
    case "video":
      return { id: newId(), type, url: "" };
    default:
      return { id: newId(), type, text: "" };
  }
}

// ---------------------------------------------------------------------------
// Blocks → markdown
// ---------------------------------------------------------------------------

export function toMarkdown(blocks: Block[]): string {
  const chunks = blocks.map(blockToMarkdown).filter((chunk) => chunk !== "");
  return chunks.join("\n\n") + (chunks.length ? "\n" : "");
}

function blockToMarkdown(block: Block): string {
  switch (block.type) {
    case "heading":
      return block.text.trim() ? `## ${block.text.trim()}` : "";
    case "subheading":
      return block.text.trim() ? `### ${block.text.trim()}` : "";
    case "text":
    case "markdown":
      return block.text.trim();
    case "quote":
      // A quote spanning several lines needs the marker on each of them.
      return block.text.trim()
        ? block.text.trim().split("\n").map((line) => `> ${line.trim()}`).join("\n")
        : "";
    case "bullets":
      return listToMarkdown(block.items, () => "-");
    case "numbers":
      return listToMarkdown(block.items, (index) => `${index + 1}.`);
    case "image":
      return block.url.trim() ? `![${block.alt.trim()}](${block.url.trim()})` : "";
    case "video":
      // Alone in its own paragraph, which is what renderMarkdown turns into a
      // player. See embedVideos() in lib/markdown.ts.
      return block.url.trim();
  }
}

function listToMarkdown(items: string[], marker: (index: number) => string): string {
  const kept = items.map((item) => item.trim()).filter(Boolean);
  return kept.map((item, index) => `${marker(index)} ${item}`).join("\n");
}

// ---------------------------------------------------------------------------
// Markdown → blocks
// ---------------------------------------------------------------------------

const VIDEO_URL =
  /^https?:\/\/(?:(?:www\.|m\.)?(?:youtube\.com|youtube-nocookie\.com)\/\S*|youtu\.be\/\S+|(?:www\.|player\.)?vimeo\.com\/\S+)$/i;

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;

/**
 * Splits markdown on blank lines and classifies each paragraph. A paragraph
 * that does not match one of the shapes this editor writes becomes an
 * `markdown` block, so hand-written HTML, tables and code survive editing
 * even though the editor has no box for them.
 */
export function fromMarkdown(source: string): Block[] {
  const text = (source ?? "").replace(/\r\n/g, "\n").trim();
  if (!text) return [];

  return splitParagraphs(text).map(classify);
}

/**
 * Blank lines separate paragraphs, except inside a fenced code block — a blank
 * line there is part of the code, not a break between blocks.
 */
function splitParagraphs(text: string): string[] {
  const paragraphs: string[] = [];
  let current: string[] = [];
  let fenced = false;

  const flush = () => {
    const joined = current.join("\n").trim();
    if (joined) paragraphs.push(joined);
    current = [];
  };

  for (const line of text.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    if (!fenced && line.trim() === "") flush();
    else current.push(line);
  }
  flush();

  return paragraphs;
}

function classify(paragraph: string): Block {
  const lines = paragraph.split("\n");
  const first = lines[0];

  const heading = /^(#{1,6})\s+(.*)$/.exec(first);
  if (heading && lines.length === 1) {
    // One box for the big heading and one for the small; anything deeper is
    // rare enough that folding it into the smaller one is the kinder answer.
    return heading[1].length <= 2
      ? { id: newId(), type: "heading", text: heading[2].trim() }
      : { id: newId(), type: "subheading", text: heading[2].trim() };
  }

  if (lines.every((line) => /^\s*[-*+]\s+/.test(line))) {
    return { id: newId(), type: "bullets", items: lines.map((line) => line.replace(/^\s*[-*+]\s+/, "")) };
  }

  if (lines.every((line) => /^\s*\d+[.)]\s+/.test(line))) {
    return { id: newId(), type: "numbers", items: lines.map((line) => line.replace(/^\s*\d+[.)]\s+/, "")) };
  }

  if (lines.every((line) => /^\s*>\s?/.test(line))) {
    return { id: newId(), type: "quote", text: lines.map((line) => line.replace(/^\s*>\s?/, "")).join("\n") };
  }

  const image = IMAGE_LINE.exec(paragraph);
  if (image) return { id: newId(), type: "image", url: image[2], alt: image[1] };

  if (VIDEO_URL.test(paragraph)) return { id: newId(), type: "video", url: paragraph };

  // Markup or syntax with no box of its own: keep it verbatim.
  if (isAdvanced(paragraph)) return { id: newId(), type: "markdown", text: paragraph };

  return { id: newId(), type: "text", text: paragraph };
}

function isAdvanced(paragraph: string): boolean {
  return (
    /^\s*(```|~~~)/.test(paragraph) || // a code block
    /^\s*</.test(paragraph) || // raw HTML
    /^\s*\|/.test(paragraph) || // a table
    /^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(paragraph) // a horizontal rule
  );
}
