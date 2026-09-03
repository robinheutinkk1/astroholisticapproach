/**
 * Selection helpers for the small formatting toolbar above a text box.
 *
 * Bold, italic and links are the three things that still have to live inside a
 * sentence rather than in a block of their own, so they are the three the
 * toolbar covers. It writes the markdown; the author only ever sees a button.
 */

export type Edit = { value: string; selectionStart: number; selectionEnd: number };

/**
 * Wraps the selection in a marker, or drops in a placeholder and selects it
 * when nothing is selected, so the button always leaves something to type over.
 * Pressing the same button on already-wrapped text unwraps it again.
 */
export function toggleWrap(
  value: string,
  start: number,
  end: number,
  marker: string,
  placeholder: string,
): Edit {
  const selected = value.slice(start, end);

  // Already wrapped, either inside the selection or just outside it.
  if (selected.length > marker.length * 2 && selected.startsWith(marker) && selected.endsWith(marker)) {
    const bare = selected.slice(marker.length, -marker.length);
    return {
      value: value.slice(0, start) + bare + value.slice(end),
      selectionStart: start,
      selectionEnd: start + bare.length,
    };
  }
  if (value.slice(start - marker.length, start) === marker && value.slice(end, end + marker.length) === marker) {
    return {
      value: value.slice(0, start - marker.length) + selected + value.slice(end + marker.length),
      selectionStart: start - marker.length,
      selectionEnd: start - marker.length + selected.length,
    };
  }

  const body = selected || placeholder;
  return {
    value: value.slice(0, start) + marker + body + marker + value.slice(end),
    selectionStart: start + marker.length,
    selectionEnd: start + marker.length + body.length,
  };
}

const LINK_PLACEHOLDER = "https://";

/**
 * Turns the selection into a link and leaves the address selected, so the next
 * thing typed or pasted replaces it. That is the order people work in: pick the
 * words first, then paste where they should go.
 */
export function makeLink(value: string, start: number, end: number): Edit {
  const label = value.slice(start, end) || "link text";
  const inserted = `[${label}](${LINK_PLACEHOLDER})`;
  const addressStart = start + label.length + 3; // "[" + label + "]("

  return {
    value: value.slice(0, start) + inserted + value.slice(end),
    selectionStart: addressStart,
    selectionEnd: addressStart + LINK_PLACEHOLDER.length,
  };
}
