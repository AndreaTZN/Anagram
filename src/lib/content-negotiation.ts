export type Representation = "html" | "markdown";

export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";

// Internal target of the proxy rewrite for Markdown-preferring requests.
export const MARKDOWN_ROUTE = "/api/markdown";

type MediaRange = { type: string; subtype: string; q: number; index: number };

const OFFERS: Record<Representation, { type: string; subtype: string }> = {
  html: { type: "text", subtype: "html" },
  markdown: { type: "text", subtype: "markdown" },
};

function parseQuality(params: string[]) {
  for (const param of params) {
    const [key, value] = param.split("=").map((part) => part.trim());
    if (key !== "q") continue;
    const q = Number(value);
    return Number.isFinite(q) ? Math.min(Math.max(q, 0), 1) : 1;
  }
  return 1;
}

function parseAccept(header: string): MediaRange[] {
  return header.split(",").flatMap((part, index) => {
    const [range, ...params] = part.trim().toLowerCase().split(";");
    const [type, subtype] = range.trim().split("/");
    if (!type || !subtype) return [];
    return [{ type, subtype, q: parseQuality(params), index }];
  });
}

// RFC 9110 §12.5.1: the most specific matching range sets an offer's quality.
function bestMatch(ranges: MediaRange[], offer: Representation) {
  const { type, subtype } = OFFERS[offer];
  let match: MediaRange | undefined;
  let matchSpecificity = 0;

  for (const range of ranges) {
    const specificity =
      range.type === type && range.subtype === subtype
        ? 3
        : range.type === type && range.subtype === "*"
          ? 2
          : range.type === "*" && range.subtype === "*"
            ? 1
            : 0;
    if (specificity > matchSpecificity) {
      match = range;
      matchSpecificity = specificity;
    }
  }
  return match;
}

/**
 * Picks the representation to serve for an `Accept` header, following
 * acceptmarkdown.com: highest q wins, ties go to the client's order, and
 * `null` means both offers are rejected (respond 406).
 */
export function negotiateRepresentation(
  accept: string | null,
): Representation | null {
  const ranges = accept ? parseAccept(accept) : [];
  // No (or unparseable) Accept header means "no constraint": serve the default.
  if (ranges.length === 0) return "html";

  const html = bestMatch(ranges, "html");
  const markdown = bestMatch(ranges, "markdown");
  const htmlQ = html?.q ?? 0;
  const markdownQ = markdown?.q ?? 0;

  if (htmlQ === 0 && markdownQ === 0) return null;
  if (markdownQ !== htmlQ) return markdownQ > htmlQ ? "markdown" : "html";
  // Both matched by the same range (e.g. */*): HTML stays the default.
  return markdown!.index < html!.index ? "markdown" : "html";
}
