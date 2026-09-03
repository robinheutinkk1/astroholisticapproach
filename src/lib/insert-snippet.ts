/**
 * Splices a markdown snippet into a textarea's text at the cursor.
 *
 * An image or an embed only becomes its own block when a blank line sits on
 * either side of it; dropped straight after a sentence, markdown folds it into
 * that paragraph instead. So this adds exactly the blank lines that are
 * missing, and no more — pressing the button twice in a row should not leave a
 * growing gap.
 */
export function spliceSnippet(
  value: string,
  start: number,
  end: number,
  snippet: string,
): { value: string; caret: number } {
  const before = value.slice(0, start);
  const after = value.slice(end);

  const lead = before === "" || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
  const tail =
    after === ""
      ? "\n"
      : /^\n*$/.test(after) // nothing but blank lines follow; adding more only grows a gap
        ? ""
        : after.startsWith("\n\n")
          ? ""
          : after.startsWith("\n")
            ? "\n"
            : "\n\n";

  return {
    value: `${before}${lead}${snippet}${tail}${after}`,
    caret: start + lead.length + snippet.length,
  };
}
